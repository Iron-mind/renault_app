#Django
from django.contrib.auth import password_validation, authenticate

#Django Rest Framework
from rest_framework import serializers

#Models
from .models import Car, User, Client, Staff, Concessionaire, Parts, Demand, Quotation, Order, Payment

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['name', 'price', 'image', 'description', 'model', 'type']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'name', 'email', 'address', 'phone', 'password']

#Serializer de cliente
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['username', 'name', 'address', 'phone', 'paymentType', 'password']
        extra_kwargs = {
            'username': {'required': True},
            'name': {'required': False},
            'address': {'required': False},
            'phone': {'required': False},
            'paymentType': {'required': False},
        }

#Serializer del login del cliente

class ClientLoginSerializer(serializers.ModelSerializer):

    #Campos que vamos a utilizar
    class Meta:
        model = Client
        fields = ['username', 'password']

    # #Validamos los datos
    def validate(self, data):
        
        #authenticate recibe las credenciales, si son válidas devuelve el objeto del usuario
        user = authenticate(username=data['username'], password=data['password']) 
        if not user:
            raise serializers.ValidationError('Las credenciales no son válidas')
        
        return data


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class ConcessionaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concessionaire
        fields = '__all__'

class PartsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parts
        fields = '__all__'

class DemandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demand
        fields = '__all__'

class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


        
#HACER LOS DEMAS SERIALIZER
#read_only_fields = ("campo que no se modificara", )
