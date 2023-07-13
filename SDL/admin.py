from django.contrib import admin
from SDL.models import Order

class OrderAdmin(admin.ModelAdmin):
    list_display = ('pincode', 'sender_full_name', 'receiver_full_name', 'sender_pnumber', 'sender_address', 'receiver_pnumber', 'receiver_address', 'weight', 'per_kg_charge', 'courier_charge', 'ODA_charge', 'is_ODA', 'total_amount')

    def sender_full_name(self, obj):
        return f"{obj.sender_fname} {obj.sender_lname}"
    sender_full_name.short_description = 'Sender Name'
    
    def receiver_full_name(self, obj):
        return f"{obj.receiver_fname} {obj.receiver_lname}"
    receiver_full_name.short_description = 'Receiver Name'



admin.site.register(Order, OrderAdmin)
