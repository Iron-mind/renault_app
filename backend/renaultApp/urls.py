from . import views
from django.urls import path
from rest_framework import routers
from .api import ClientViewSet
from .api import PartViewSet


router = routers.DefaultRouter()

router.register('login', ClientViewSet, 'login')
router.register('parts', PartViewSet, 'parts')

#router.register('home', views.home, 'home')
#router.register('car', views.car, 'car')

urlpatterns = router.urls