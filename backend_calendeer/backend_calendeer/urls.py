from django.contrib import admin
from django.urls import path
from calendeer.views import EventView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/<int:user_id>/events/', EventView.as_view(), name='event-list'),
    path('api/<int:user_id>/events/<int:event_id>', EventView.as_view(), name='event'),
]
