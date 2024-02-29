# Generated by Django 4.2.10 on 2024-02-28 19:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('description', models.TextField(null=True)),
                ('datetime_start', models.DateTimeField()),
                ('datetime_end', models.DateTimeField(null=True)),
                ('host', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Events_to_Attendees',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attendee', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='calendeer.event')),
            ],
        ),
    ]