from django.db import models
from django.contrib.auth.models import User 

class Event(models.Model):
    eventName = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    host = models.ForeignKey(User, on_delete=models.DO_NOTHING) 
    datetime_start = models.DateTimeField()
    datetime_end = models.DateTimeField()

    def __str__(self):
        return self.eventName + " (" + str(self.pk) + ")"
    

class EventsInvitees(models.Model):
    invitee = models.ForeignKey(User, on_delete=models.DO_NOTHING) 
    event = models.ForeignKey(Event, on_delete=models.DO_NOTHING)

def get_user_email(self):
    return self.email

User.add_to_class("__str__", get_user_email)