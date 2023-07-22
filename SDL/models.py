from django.db import models

class Order(models.Model):
    date_time = models.DateTimeField(auto_now=True)
    weight = models.FloatField()
    per_kg_charge = models.FloatField()
    courier_charge = models.FloatField()
    ODA_charge = models.FloatField()
    is_ODA = models.BooleanField()
    total_amount = models.FloatField()
    pincode = models.CharField(max_length=10)
    sender_fname = models.CharField(max_length=100)
    sender_lname = models.CharField(max_length=100)
    sender_pnumber = models.CharField(max_length=20)
    sender_address = models.TextField()
    receiver_fname = models.CharField(max_length=100)
    receiver_lname = models.CharField(max_length=100)
    receiver_pnumber = models.CharField(max_length=20)
    receiver_address = models.TextField()

    def __str__(self):
        return f"Order: {self.pk}"
