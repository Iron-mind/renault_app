from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from . models import Car
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import CarSerializer
from .serializers import PartsSerializer

from rest_framework.authtoken.models import Token
from .models import Client
from .models import User
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response

@api_view(['POST'])
def login(request):
    username = request.data['username']
    password = request.data['password']
    user = None
    try:
        user_or_users = Client.objects.filter(username=username)
        if user_or_users.exists():
            user = user_or_users.first()
        else:
            user = user_or_users
    except Client.DoesNotExist:
        return Response("Usuario no encontrado", status=status.HTTP_204_NO_CONTENT)

    pwd_valid = check_password(password, user.password)
    if not pwd_valid:
        return Response("Contraseña incorrecta", status=status.HTTP_204_NO_CONTENT)
    
    # token, created = Token.objects.get_or_create(user=user)
    token = 'b93f32b520'+str(user.username)

    return Response(token, status=status.HTTP_200_OK)


"""
#Vista para el landing
def home(request):
    return render(request, "example3.html",{})

#Vista para el logearse
@api_view(['GET','POST'])
def logIn(request):
    if request.method == 'GET':
        return render(request, 'example.html', {})
    elif request.method == 'POST':
        serializer = PartsSerializer(data=request.data)
        #Valida que la informacion es correcta
        if serializer.is_valid():
            #Retorna el codigo de estado 201 Creado
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Vista para registrarse
@api_view(['GET','POST'])
def SignUp(request):
    if request.method == 'GET':
        return render(request, 'example2.html', {})
    if request.method == 'POST':
        serializer = PartSerializer(data=request.data)
        #Valida que la informacion es correcta
        if serializer.is_valid():
            #Guarda en la base de datos
            serializer.save()
            #Retorna el codigo de estado 201 Creado
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Vista para car
def car(request):
    return render(request, "cars/home.html", {})


#Ejemplos monitora

#car_id:None permite que se puede llamar la vista funcione cuando la petición 
#incluye un id asi como cuando no incluye ninguno.
def detail(request, car_id=None):
    if car_id:
        try:
            car = Car.objects.get(pk=car_id)
        except car.DoesNotExist:
            raise Http404("Car does not exist")
        return render(request, "cars/detail.html", {"car": car})
    else:
        return render(request, "cars/detail.html", {})
    
    

@csrf_protect
def create(request):
        print(request.FILES.get('image'))
        car_serializer = CarSerializer(data=request.POST)
        if car_serializer.is_valid():
            # Save the car instance
            car = car_serializer.save()
            # Get the uploaded image
            image = request.FILES.get('image')
            if image:
                # If an image was uploaded, save it to the car instance
                car.image = image
                car.save()
            return redirect('home')
        else:
            return render(request, "cars/detail.html", {})


@csrf_protect
def update(request, car_id):
        try:
            car = Car.objects.get(pk=car_id)
            car_serializer = CarSerializer(instance=car, data=request.POST, partial=True)
            if car_serializer.is_valid():
                # Save the car instance
                car = car_serializer.save()
                # Get the uploaded image
                image = request.FILES.get('image')
                if image:
                    # If an image was uploaded, save it to the car instance
                    car.image = image
                    car.save()
                return redirect('home')
            else:
                return render(request, "cars/detail.html", {})
        except car.DoesNotExist:
            raise Http404("Car does not exist")

"""