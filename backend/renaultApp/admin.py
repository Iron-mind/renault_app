from django.contrib import admin
from .models import Car
from .models import Client
from .models import Staff
from .models import Concessionaire
from .models import Parts
from .models import Demand
from .models import Quotation
from .models import Payment

# Register your models here.
admin.site.register(Car)
admin.site.register(Client)
admin.site.register(Staff)
admin.site.register(Concessionaire)
admin.site.register(Parts)
admin.site.register(Demand)
admin.site.register(Quotation)
admin.site.register(Payment)