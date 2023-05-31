from .models import Car
from .models import Client
from .models import User
from .models import Parts
from rest_framework import viewsets, permissions
from .serializers import CarSerializer
from .serializers import ClientSerializer
from .serializers import PartSerializer


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    permission_classes =[permissions.AllowAny]
    serializer_class = ClientSerializer

class PartViewSet(viewsets.ModelViewSet):
    queryset = Parts.objects.all()
    permission_classes =[permissions.AllowAny]
    serializer_class = PartSerializer


