from django.db import models
from django.contrib.auth.models import User 

class Event(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    host = models.ForeignKey(User, on_delete=models.DO_NOTHING) 
    datetime_start = models.DateTimeField()
    datetime_end = models.DateTimeField(blank=True)

    def __str__(self):
        return self.name

class EventsAttendees(models.Model):
    event = models.ForeignKey(Event, on_delete=models.DO_NOTHING)
    attendee = models.ForeignKey(User, on_delete=models.DO_NOTHING) 