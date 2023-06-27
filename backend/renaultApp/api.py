
#Django Rest Framework
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import request
from django.db.models import Q

#Serializers
from .serializers import (
    CarSerializer, ClientSerializer, ClientLoginSerializer,StaffSerializer,
    ConcessionaireSerializer, PartsSerializer, DemandSerializer,
    QuotationSerializer, OrderSerializer, PaymentSerializer
)
from cloudinary.uploader import upload
#Models
from .models import Car, Client, Staff, Concessionaire, Parts, Demand, Quotation, Order, Payment


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('name', None)
        price = self.request.query_params.get('price', None)
        type = self.request.query_params.get('type', None)
        
        if name:
            queryset = queryset.filter(Q(name__icontains=name))
        if type:
            queryset = queryset.filter(type=type)
        if price:
            queryset = queryset.filter(price=price)
        
        return queryset

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        id = self.request.query_params.get('id', None)
        queryset = super().get_queryset()
        name = self.request.query_params.get('name', None)
        username = self.request.query_params.get('username', None)

        if name:
            queryset = queryset.filter(Q(name__icontains=name))
        if username:
            queryset = queryset.filter(username=username)
        if id != None :
            queryset = queryset.filter(id=id)
        return queryset
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    
class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        id = self.request.query_params.get('id', None)
        username = self.request.query_params.get('username', None)
        print('name')
        if id != None :
            queryset = queryset.filter(id=id)
        elif username != None:
            queryset = queryset.filter(username=username)
        return queryset

class StaffSellerViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.filter(jobTitle='VE')
    serializer_class = StaffSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        id = self.request.query_params.get('id', None)
        username = self.request.query_params.get('username', None)
        print('name')
        if id != None :
            queryset = queryset.filter(id=id)
        elif username != None:
            queryset = queryset.filter(username=username)
        return queryset

class ConcessionaireViewSet(viewsets.ModelViewSet):
    queryset = Concessionaire.objects.all()
    serializer_class = ConcessionaireSerializer

class PartsViewSet(viewsets.ModelViewSet):
    queryset = Parts.objects.all().order_by("name")
    serializer_class = PartsSerializer

class DemandViewSet(viewsets.ModelViewSet):
    queryset = Demand.objects.all()
    serializer_class = DemandSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        client = self.request.query_params.get('client', None)
        worker = self.request.query_params.get('worker', None)
        id = self.request.query_params.get('id', None)
        
        if client != None and worker != None:
            queryset = queryset.filter(client=client, worker=worker )
        if id != None :
            queryset = queryset.filter(id=id)
        return queryset
    

class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.all()
    serializer_class = QuotationSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by("-startTime")
    serializer_class = OrderSerializer


class OrderEspecificViewSet(viewsets.ModelViewSet):
    #email = request.data.get('email')
    #queryset = Order.objects.filter(email=email).order_by('startTime')
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class LoginViewSet(viewsets.ModelViewSet):
    serializer_class = ClientLoginSerializer

#     @action(detail=False, methods=['post'])
#     def login(self, request):
#     #     # log = views.obtain_auth_token(request)

#         username = request.data.get('username')
#         password = request.data.get('password')
#         user = user.objects.get(username=username)
#         token = Token.objects.get(user=user)

#         return Response({'message': 'Inicio de sesión exitoso'}, status=status.HTTP_200_OK)
#     #     # Autenticar al usuario
    #     user = {username, password}

    #     if user is not None:
    #        # login(request, user)
    #         return Response({'message': 'Login successful'})
    #     else:
    #         return Response({'message': 'Invalid credentials'}, status=401)
    #     # serializer.is_valid(raise_exception=True)

    #     # user, password = serializer.save()

    #     # data = {
    #     #     'user': ClientLoginSerializer(user).data,
    #     #     'password': password
    #     # }
    #     # return Response(data, status=status.HTTP_201_CREATED)
    
    #     # username = request.data.get('username')
    #     # password = request.data.get('password')

    #     # #Verifica las credenciales de usuario
    #     # user = authenticate(request, username=username, password=password)

    #     # if user is not None:
    #     #     # Iniciar sesión del usuario
    #     #     login(request, user)
    #     #     return Response({'message': 'Inicio de sesión exitoso'}, status=status.HTTP_200_OK)
        # else:
        #     return Response({'message': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)