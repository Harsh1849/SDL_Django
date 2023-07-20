from django.contrib import admin
from django.urls import path
from SDL import views
from admin_panel import views as ap_views
from django.urls import path, include
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin_panel/', ap_views.admin_panel , name='admin_panel'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),

    path('', views.index, name='index'),
    path('pincode/<str:pin_number>/', views.pincode_data, name='pincode_data'),
    path('place_order/', views.place_order, name='place_order'),
    path('thank_you/', views.thank_you, name='thank_you'),
]
