from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import User
from .models import Event, EventsInvitees
from .serializers import EventSerializer
from . import helper

class EventView(APIView):
    serializer_class = EventSerializer
    queryset = Event.objects.all()

    # Get events
    def get(self, request, user_id):
        user = User.objects.get(id=user_id)

        # Get all events for a user where they are either a host or an invitee
        queryset = Event.objects.filter(Q(host=user) | Q(eventsinvitees__invitee=user)).distinct()

        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

    # Update events
    def put(self, request, user_id):
        if request.data:
            event_id = request.data.get('id')

            # TODO: Fix serializer incompatibility with invitee list
            # TODO: Refactor to optimize querysets
            # Update event
            try:
                event = Event.objects.get(pk=event_id)
                serializer = EventSerializer(instance=event, data=request.data)
                if serializer.is_valid():
                    # Get list of invitees for this event in DB
                    current_invitees_list = list(event.get_invitees())
                    print(current_invitees_list)

                    # Compare with list of invitees from request
                    update_invitees_list = request.data.get('invitees')
                    print(update_invitees_list)
                    invitees_to_add, invitees_to_remove = helper.compare_lists(current_invitees_list, update_invitees_list)

                    # Update list of invitees for event
                    if len(invitees_to_add):
                        helper.add_invitees(invitees_to_add, event_id)

                    if len(invitees_to_remove):
                        helper.remove_invitees(invitees_to_remove, event_id)

                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                
            # Create new event
            except Event.DoesNotExist:
                del request.data['id']
                print('request.data: ', request.data)
                
                serializer = EventSerializer(data=request.data)

                if serializer.is_valid():

                    # Add invitees to new event
                    new_event = serializer.save()
                    invitees_to_add = request.data.get('invitees')
                    if len(invitees_to_add):
                        helper.add_invitees(invitees_to_add, new_event.pk)

                    return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        return Response(status=status.HTTP_400_BAD_REQUEST)
        

    # Delete events or remove user from event
    def delete(self, request, user_id, event_id):
        try:
            # Check if event exists
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Check if user is host of event
        print(user_id)
        print(event.host.id)
        user_is_host = event.host.pk == user_id

        if user_is_host:
            # Delete event if user is the host
            event.delete()
        else :
            # Remove invitee from event if they are not the host
            invitee_was_invited = EventsInvitees.objects.filter(event__pk=event_id, invitee__pk=user_id).exists()

            # Remove user from event if they were invited
            if invitee_was_invited:
                EventsInvitees.objects.filter(event__pk=event_id, invitee__pk=user_id).delete()

        return Response(status=status.HTTP_200_OK)
