from datetime import timedelta
import datetime
from django.core.mail import send_mail
from django.contrib.auth.models import User 

from .models import Event, EventsInvitees

NOTIFICATION_TIME = 30 # minutes
NOTIFICATION_DELTA = 1 # minutes
EXPIRATION_TIME = 24 # hours

def notify(event_name, start, recipients):
    now = now_minus = datetime.datetime.now()
    print('========================')
    print(f"Sent at {now} ")
    print("Email notification: ")
    print("To: ", recipients)
    print( f'Message: {event_name} at {start} begins in {NOTIFICATION_TIME} minutes.')

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
    notifications = {}
    for event in events:
        notifications[event.id] = {}
        notifications[event.id]['name'] = event.eventName
        notifications[event.id]['start'] = event.datetime_start
        host_email = event.host.email
        invitee_ids = EventsInvitees.objects.filter(event=event).values('invitee_id')
        invitee_emails = User.objects.filter(pk__in=invitee_ids).values_list('email', flat=True)

        # TODO: Prevent host from being invitee too
        notifications[event.id]['users'] = [host_email]

        if len(invitee_emails):
            for email in invitee_emails:
                if email not in notifications[event.id]['users']:
                    notifications[event.id]['users'].append(email)

    print("notifications", notifications)

    # Send notification to each invitee/host for each event
    for event in notifications:
        print('notifying', event)
        event_name = notifications[event]['name']
        start = notifications[event]['start']
        emails = notifications[event]['users']
        notify(event_name, start, emails)

    # TODO: Move to seperate cron job
    # Delete events that are more than x hours since they ended
    events = Event.objects.filter(datetime_end__lt=now_minus_expiration).delete()
    