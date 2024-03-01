from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import User
from .models import Event
from .serializers import EventSerializer
from . import helper

class EventView(APIView):
    serializer_class = EventSerializer
    queryset = Event.objects.all()

    def get(self, request, user_id):
        user = User.objects.get(id=user_id)

        # Get all events for a user where they are either a host or an invitee
        queryset = Event.objects.filter(Q(host=user) | Q(eventsinvitees__invitee=user)).distinct()

        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

    # Update event that the user is a host of
    def put(self, request):
        if request.data:
            print('request.data: ', request.data)
            event_id = request.data.get('id')

            # TODO: Fix serializer incompatibility with invitee list
            # TODO: Refactor to optimize querysets
            try:
                event = Event.objects.get(pk=event_id)
                serializer = EventSerializer(instance=event, data=request.data)
                print('up')
                if serializer.is_valid():
                    # Get list of invitees for this event in DB
                    current_invitees_list = list(event.get_invitees())
                    print(current_invitees_list)

                    # Compare with list of invitees from request
                    update_invitees_list = request.data.get('invitees')
                    print(update_invitees_list)
                    invitees_to_add, invitees_to_remove = helper.compare_lists(current_invitees_list, update_invitees_list)

                    if len(invitees_to_add):
                        helper.add_invitees(invitees_to_add, event_id)

                    if len(invitees_to_remove):
                        helper.remove_invitees(invitees_to_remove, event_id)
                            
                    # print(serializer.data)
                    # print(serializer.errors)
                    # print("validated up: ", serializer.validated_data)
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                
            except Event.DoesNotExist:
                print('new')
                del request.data['id']
                print('request.data: ', request.data)
                event_id = request.data.get('id')
                serializer = EventSerializer(data=request.data)
                if serializer.is_valid():
                    # print(serializer.data)
                    print(serializer.errors)
                    # print("validated new: ", serializer.validated_data)
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        return Response(status=status.HTTP_400_BAD_REQUEST)
        

    # TODO: Delete the event that they are the host of
