from rest_framework import viewsets
from .serializers import EventSerializer
from .models import Event


class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    # TODO: filter by event by user as a host or attendee
    # Get events for a user
    queryset = Event.objects.all()

    # Update event that they are the host of

    # Add a new user if a submitted new/updated event has an email not in Users

    # Delete the event that they are the host of

    # Remove themselves from the invitee list when a user deletes an even they are not the host of
