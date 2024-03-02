from django.core.mail import send_mail
from datetime import timedelta
import datetime
from .models import Event, EventsInvitees

NOTIFICATION_WARNING = 30
NOTIFICATION_DELTA = 1

def get_approaching_events():
    print("====get_approaching_events()====")
    now_minus = datetime.datetime.now() - timedelta(hours=0, minutes=NOTIFICATION_WARNING)
    now_minus_delta = datetime.datetime.now() - timedelta(hours=0, minutes=NOTIFICATION_WARNING + NOTIFICATION_DELTA)

    print("now_minus", now_minus)

    # Get list of events that have a start time 30 or 30 + delta minutes before now, to account for seconds
    events = Event.objects.filter(datetime_start__lt=now_minus, datetime_start__gt=now_minus_delta)
    print("events, ", events)

    # Get invitees and hosts to notify for each event
    users_to_notify = []
    for event in events:
        print("event.datetime_start, ", event.datetime_start)
        host_email = event.host.email
        invitee_emails = EventsInvitees.objects.filter(event=event.pk).values_list('invitee__email', flat=True)
        if len(invitee_emails):
            for email in invitee_emails:
                if email not in users_to_notify:
                    users_to_notify.append(email)

        if host_email not in users_to_notify:
            users_to_notify.append(host_email)
    print("users_to_notify", users_to_notify)

    # Send notification to each invitee/host for each event
    