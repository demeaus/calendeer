from django.db import models
from django.contrib.auth.models import User 

class Event(models.Model):
    eventName = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    host = models.ForeignKey(User, on_delete=models.CASCADE) 
    datetime_start = models.DateTimeField()
    datetime_end = models.DateTimeField()

    def get_invitees(self):
        invitees = EventsInvitees.objects.filter(event=self.id).values_list('invitee__email', flat=True)
        return invitees

    def __str__(self):
        return self.eventName + " (" + str(self.pk) + ")"
    

class EventsInvitees(models.Model):
    invitee = models.ForeignKey(User, on_delete=models.CASCADE) 
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

# Custom User methods
def get_user_email(self):
    return self.email

def get_user_str(self):
    return get_user_email(self) + " (" + str(self.pk) + ")"

User.add_to_class("__str__", get_user_str)