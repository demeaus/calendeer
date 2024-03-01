from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import User
from .models import Event
from .serializers import EventSerializer

class EventView(APIView):
    serializer_class = EventSerializer
    queryset = Event.objects.all()

    # Get all events for a user where they are either a host or an invitee
    def get(self, request, user_id):
        user = User.objects.get(id=user_id)

        # Add invitees for each event to event data
        queryset = Event.objects.filter(Q(host=user) | Q(eventsinvitees__invitee=user)).distinct()

        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

    # Update event that the user is a host of

    # Add a new user if a submitted new/updated event has an email not in Users

    # Delete the event that they are the host of

    # Remove themselves from the invitee list when a user deletes an even they are not the host of
