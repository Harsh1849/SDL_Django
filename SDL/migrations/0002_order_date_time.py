# Generated by Django 4.2.3 on 2023-07-21 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SDL', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='date_time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]