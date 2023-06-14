from rest_framework.routers import DefaultRouter
from .api import ClientViewSet, PartsViewSet, DemandViewSet, CarViewSet, LoginViewSet, QuotationViewSet, StaffViewSet, ConcessionaireViewSet
from . import views 
from django.urls import path, include
router = DefaultRouter()

router.register('car', CarViewSet)
router.register('client', ClientViewSet)
router.register('staff', StaffViewSet)
router.register('parts', PartsViewSet)
router.register('demand', DemandViewSet)
router.register('quotation', QuotationViewSet, basename='quotation')
router.register('concessionarie', ConcessionaireViewSet, basename='concessionarie')
router.urls.append(path('login/',  views.login, name='logIn'))
urlpatterns = [
    # ...
    path('', include(router.urls)),
   
]

