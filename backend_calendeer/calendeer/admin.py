from django.contrib import admin
from .models import Event, EventsInvitees

class EventAdmin(admin.ModelAdmin):
    list_display = ('eventName', 'description', 'host', 'datetime_start', 'datetime_end')

class EventsInviteesAdmin(admin.ModelAdmin):
    list_display = ('event', 'invitee')

admin.site.register(Event, EventAdmin)
admin.site.register(EventsInvitees, EventsInviteesAdmin)
