
#Django Rest Framework
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

#Serializers
from .serializers import (
    CarSerializer, ClientSerializer, ClientLoginSerializer,StaffSerializer,
    ConcessionaireSerializer, PartsSerializer, DemandSerializer,
    QuotationSerializer, OrderSerializer, PaymentSerializer
)

#Models
from .models import Car, Client, Staff, Concessionaire, Parts, Demand, Quotation, Order, Payment


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class ConcessionaireViewSet(viewsets.ModelViewSet):
    queryset = Concessionaire.objects.all()
    serializer_class = ConcessionaireSerializer

class PartsViewSet(viewsets.ModelViewSet):
    queryset = Parts.objects.all().order_by("name")
    serializer_class = PartsSerializer

class DemandViewSet(viewsets.ModelViewSet):
    queryset = Demand.objects.all()
    serializer_class = DemandSerializer

class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.all()
    serializer_class = QuotationSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class LoginViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    #Detail define si es una peticion de detalle
    #Method añadimos que metodo permitiremos
    @action(detail=False, methods=['post'])
    def login(self,request):
        #User Sign in 
        serializer = ClientLoginSerializer
        serializer.is_valid(raise_exception=True)

        user, password = serializer.save()

        data = {
            'user': ClientLoginSerializer(user).data,
            'password': password
        }
        return Response(data, status=status.HTTP_201_CREATED)
    
        username = request.data.get('username')
        password = request.data.get('password')

        #Verifica las credenciales de usuario
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Iniciar sesión del usuario
            login(request, user)
            return Response({'message': 'Inicio de sesión exitoso'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)