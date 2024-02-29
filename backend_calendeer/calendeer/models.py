from django.db import models
from django.contrib.auth.models import User 

class Event(models.Model):
    eventName = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    host = models.ForeignKey(User, on_delete=models.DO_NOTHING) 
    datetime_start = models.DateTimeField()
    datetime_end = models.DateTimeField()

    def __str__(self):
        return self.eventName

class EventsInvitees(models.Model):
    event = models.ForeignKey(Event, on_delete=models.DO_NOTHING)
    invitee = models.ForeignKey(User, on_delete=models.DO_NOTHING) 