from . import views
from django.urls import path

urlpatterns = [
    path('car/', views.car, name='car'), 
	path('logIn/', views.logIn, name='logIn'),
    path('signUp/', views.SignUp, name='signUp'),	
    path('home/', views.home, name='home'),																 
]