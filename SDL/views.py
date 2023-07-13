from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import csv, json
from SDL.models import Order


def index(request):
    return render(request, 'index.html')

def pincode_data(request, pin_number):
    csv_path = "data.csv"
    json_data = {}
    with open(csv_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            pin = row.pop("Pin")
            json_data[pin] = row

    try:
        pincode_json = json_data[pin_number]
        return JsonResponse(pincode_json)
    except:
        return HttpResponse("Invalid Pincode!!")



def place_order(request):
    return render(request, 'order.html')

def thank_you(request):
    if request.method == "POST":
        order_weight = request.POST.get("order_weight")
        order_charge = request.POST.get("order_charge")
        order_courier = request.POST.get("order_courier")
        order_ODA = request.POST.get("order_ODA")
        order_total_amount = request.POST.get("order_total_amount")
        order_pincode = request.POST.get("order_pincode")
        sender_fname = request.POST.get("sender_fname")
        sender_lname = request.POST.get("sender_lname")
        sender_pnumber = request.POST.get("sender_pnumber")
        sender_address = request.POST.get("sender_address")
        receiver_fname = request.POST.get("receiver_fname")
        receiver_lname = request.POST.get("receiver_lname")
        receiver_pnumber = request.POST.get("receiver_pnumber")
        receiver_address = request.POST.get("receiver_address")

        if int(order_ODA) > 0:
            is_ODA = True
        else:
            is_ODA = False

        print(order_weight)

        order = Order(
            weight=order_weight,
            per_kg_charge=order_charge,
            courier_charge=order_courier,
            ODA_charge=order_ODA,
            is_ODA=is_ODA,
            total_amount=order_total_amount,
            pincode=order_pincode,
            sender_fname=sender_fname,
            sender_lname=sender_lname,
            sender_pnumber=sender_pnumber,
            sender_address=sender_address,
            receiver_fname=receiver_fname,
            receiver_lname=receiver_lname,
            receiver_pnumber=receiver_pnumber,
            receiver_address=receiver_address
        )
        order.save()        
        
        return render(request, "thank_you.html")
    else:
        return HttpResponse("Only POST requests are allowed...")
