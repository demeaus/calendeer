from django.contrib import admin
from django.urls import path
from calendeer.views import EventView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/events/<int:user_id>/', EventView.as_view(), name='event-list'),
]
