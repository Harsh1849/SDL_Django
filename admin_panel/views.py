from SDL.models import Order
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils import timezone

@login_required
def admin_panel(request):
    data = Order.objects.all()
    
    current_datetime = timezone.now()
    return render(request, 'admin_panel.html', context={'context': data, 'current_datetime': current_datetime})