
#Django Rest Framework
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
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

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    
    """
    @action(methods=['post'], detail=False)
    def guardar_imagen(self, request):
        # Obtener el diccionario JSON enviado en la solicitud POST
        json_data = request.data

        # Obtener la ruta del archivo y otros atributos necesarios
        file_path = json_data['image']['File path']
        image_name = json_data['image']['name']
        image_type = json_data['image']['type']

        # Cargar la imagen en Cloudinary
        cloudinary_response = upload(file_path, public_id=image_name)

        # Acceder a la URL de la imagen subida a Cloudinary
        image_url = cloudinary_response['secure_url']

        # Crear una nueva instancia del modelo Staff
        staff = Staff()
        staff.image = image_url

        # Puedes establecer otros atributos del modelo Staff según tus necesidades
        staff.jobTitle = json_data['jobTitle']
        staff.userName = json_data['username']
        staff.name = json_data['name']
        staff.email = json_data['email']
        staff.address = json_data['address']
        staff.phone = json_data['phone']
        staff.password = json_data['password']

        # Guardar el modelo Staff en la base de datos
        staff.save()

        # Devolver una respuesta JSON con la URL de la imagen
        return Response({'image_url': image_url})
    """

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