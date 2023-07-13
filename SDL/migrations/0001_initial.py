# Generated by Django 4.2.3 on 2023-07-12 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.FloatField()),
                ('per_kg_charge', models.FloatField()),
                ('courier_charge', models.FloatField()),
                ('ODA_charge', models.FloatField()),
                ('is_ODA', models.BooleanField()),
                ('total_amount', models.FloatField()),
                ('pincode', models.CharField(max_length=10)),
                ('sender_fname', models.CharField(max_length=100)),
                ('sender_lname', models.CharField(max_length=100)),
                ('sender_pnumber', models.CharField(max_length=20)),
                ('sender_address', models.TextField()),
                ('receiver_fname', models.CharField(max_length=100)),
                ('receiver_lname', models.CharField(max_length=100)),
                ('receiver_pnumber', models.CharField(max_length=20)),
                ('receiver_address', models.TextField()),
            ],
        ),
    ]