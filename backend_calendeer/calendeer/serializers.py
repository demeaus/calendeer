from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('eventName', 'description', 'host', 'datetime_start', 'datetime_end')