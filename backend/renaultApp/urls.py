from . import views
from django.urls import path

urlpatterns = [
    path('', views.home, name="home"), 
	path('details/', views.detail, name='detail'),
    path('details/<int:car_id>/', views.detail, name='detail_with_id'),	
    path("create/", views.create, name="create"),
    path("update/<int:car_id>", views.update, name="update"),																 
]