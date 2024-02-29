from django.contrib import admin
from .models import Event, EventsAttendees

class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'host', 'datetime_start', 'datetime_end')

class EventsAttendeesAdmin(admin.ModelAdmin):
    list_display = ('event', 'attendee')

admin.site.register(Event, EventAdmin)
admin.site.register(EventsAttendees, EventsAttendeesAdmin)
