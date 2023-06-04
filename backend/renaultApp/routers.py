from rest_framework.routers import DefaultRouter
from .api import ClientViewSet, PartsViewSet, DemandViewSet, CarViewSet, LoginViewSet, QuotationViewSet, StaffViewSet

router = DefaultRouter()

router.register('car', CarViewSet)
router.register('client', ClientViewSet)
router.register('staff', StaffViewSet)
router.register('parts', PartsViewSet)
router.register('demand', DemandViewSet)
router.register('login', LoginViewSet, basename='login')
router.register('quotation', QuotationViewSet, basename='quotation')

urlpatterns = router.urls