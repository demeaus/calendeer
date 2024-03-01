from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Event, EventsInvitees

class CurrentUserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ('id', 'email')


class EventSerializer(serializers.ModelSerializer):
    # TODO: Refactor to combine host id and host email into one object
    host_email = serializers.SerializerMethodField('get_host_email')
    invitees = serializers.SerializerMethodField('get_invitees')

    def get_host_email(self, obj):
        host_email = obj.host.email
        print('host_email', host_email)
        return host_email

    def get_invitees(self, obj):
        invitees = EventsInvitees.objects.filter(event=obj.id).values_list('invitee__email', flat=True)
        print("invitees", invitees)
        return invitees

    class Meta:
        model = Event
        fields = ('id','eventName', 'description', 'host', 'datetime_start', 'datetime_end', 'invitees', 'host_email')
