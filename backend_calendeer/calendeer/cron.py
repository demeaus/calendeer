from datetime import timedelta
import datetime
from django.core.mail import send_mail
from django.contrib.auth.models import User 

from .models import Event, EventsInvitees

NOTIFICATION_TIME = 30 # minutes
NOTIFICATION_DELTA = 1 # minutes
EXPIRATION_TIME = 24 # hours

def notify(event, recipients):
    now = now_minus = datetime.datetime.now()
    print('========================')
    print(f"Sent at {now} ")
    print("Email notification: ")
    print("To: ", recipients)
    print( f'Message: {event.eventName} at {event.datetime_start} begins in {NOTIFICATION_TIME} minutes.')

    # TODO: Authenticate with Google
    # send_mail(
    #     "Subject",
    #     f'{event_name} begins in {NOTIFICATION_TIME} minutes.',
    #     "from@gmail.com",
    #     recipients
    # )

def get_approaching_events():
    print("====get_approaching_events()====")
    
    now_minus = datetime.datetime.now() - timedelta(hours=0, minutes=NOTIFICATION_TIME)
    now_minus_delta = datetime.datetime.now() - timedelta(hours=0, minutes=NOTIFICATION_TIME + NOTIFICATION_DELTA)
    now_minus_expiration = datetime.datetime.now() - timedelta(hours=EXPIRATION_TIME, minutes=0)

    print("now_minus", now_minus)

    # Get list of events that have a start time x to x + delta minutes before now, to account for seconds
    events = Event.objects.filter(datetime_start__lt=now_minus, datetime_start__gt=now_minus_delta)
    print("events, ", events)

    # TODO: Refactor gathering event data
    # Get invitees and hosts to notify for each event

    # For each event, combine emails for host and invitees, get event data
    users_to_invite = {}
    for event in events:
        users_to_invite[event.id] = []
        host_email = event.host.email
        invitee_ids = EventsInvitees.objects.filter(event=event).values('invitee_id')
        invitee_emails = User.objects.filter(pk__in=invitee_ids).values_list('email', flat=True)

        # TODO: Prevent host from being invitee too
        users_to_invite[event.id] = [host_email]

        if len(invitee_emails):
            for email in invitee_emails:
                if email not in users_to_invite[event.id]:
                    users_to_invite[event.id].append(email)

    print("users_to_invite", users_to_invite)

    # Send notification to each invitee/host for each event
    for event in events:
        notify(event, users_to_invite[event.id])

    # TODO: Move to seperate cron job
    # Delete events that are more than x hours since they ended
    events = Event.objects.filter(datetime_end__lt=now_minus_expiration).delete()
    