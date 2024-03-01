from django.contrib.auth.models import User
from .models import Event, EventsInvitees


# TODO: New user creation process is simplified for prototyping
def create_new_user(email):
    user = User.objects.create_user(username=email, email=email, password="4321rewq")
    return user

def compare_lists(original_list, new_list):
    added_items = list(set(new_list) - set(original_list))
    removed_items = list(set(original_list) - set(new_list))
    return added_items, removed_items

def add_invitees(invitees, event_id):
    for invitee in invitees:
        try: 
            # Check if invitee is a user
            user = User.objects.get(email=invitee)
        except User.DoesNotExist:
            user = create_new_user(invitee)

        try:
            # Check if event exists
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist as e:
            print("Error: ", e)

        # Check if user was invited to event already
        invitee_was_invited = EventsInvitees.objects.filter(event__id=event_id, invitee__email=invitee).exists()

        # Invite the user to the meeting if they were not invited
        if not invitee_was_invited:
           EventsInvitees.objects.create(event=event, invitee=user)

def remove_invitees(invitees, event_id):
    # Remove rows from EventsInvitees for each invitee that was removed, unless they were not invited
    for invitee in invitees:
        try: 
            # Check if invitee is a user
            User.objects.get(email=invitee)
        except User.DoesNotExist as e:
            print("Error: ", e)

        invitee_was_invited = EventsInvitees.objects.filter(event__id=event_id, invitee__email=invitee).exists()

        # Remove user from event if they were invited
        if invitee_was_invited:
            EventsInvitees.objects.filter(event__id=event_id, invitee__email=invitee).delete()
