from django.core.mail import send_mail
from datetime import timedelta
import datetime
from .models import Event, EventsInvitees

NOTIFICATION_TIME = 30 # minutes
NOTIFICATION_DELTA = 1 # minutes
EXPIRATION_TIME = 24 # hours


# def notify():
#     send_mail(
#         "Subject",
#         "Deer dem",
#         "hsnodgrass1234@gmail.com",
#         ["demeaus.wong@gmail.com"]
#     )

# notify()

def get_approaching_events():
    print("====get_approaching_events()====")
    now_minus = datetime.datetime.now() - timedelta(hours=0, minutes=NOTIFICATION_TIME)
    now_minus_delta = datetime.datetime.now() - timedelta(hours=0, minutes=NOTIFICATION_TIME + NOTIFICATION_DELTA)
    now_minus_expiration = datetime.datetime.now() - timedelta(hours=EXPIRATION_TIME, minutes=0)

    print("now_minus", now_minus)

    # Get list of events that have a start time x to x + delta minutes before now, to account for seconds
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
    # notify()

    # Delete events that are more than x hours since they ended
    events = Event.objects.filter(datetime_end__lt=now_minus_expiration).delete()
    