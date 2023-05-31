from rest_framework import serializers
from .models import Car
from .models import User
from .models import Parts
from .models import Client

class CarSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Car
        fields = ['name', 'price', 'image']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields= ['username', 'name', 'email', 'address', 'phone' ]
        read_only_fields = ('name', )

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['username', 'name', 'email', 'address', 'phone', 'paymentType' ]
        read_only_fields = ('name', )

class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parts
        fields = ['name', 'price', 'amount']

        
#HACER LOS DEMAS SERIALIZER
#read_only_fields = ("campo que no se modificara", )
