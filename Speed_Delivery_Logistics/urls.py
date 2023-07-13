from django.contrib import admin
from django.urls import path
from SDL import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('pincode/<str:pin_number>/', views.pincode_data, name='pincode_data'),
    path('place_order/', views.place_order, name='place_order'),
    path('thank_you/', views.thank_you, name='thank_you'),
]
