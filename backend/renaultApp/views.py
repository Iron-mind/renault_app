from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from . models import Car
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import CarSerializer

# Create your views here.

#Vista para el home 
def home(request):
    try:
        cars = Car.objects.all()
    except:
        raise Http404("No cars available")
    return render(request, "cars/home.html",{"cars": cars})

#Vista para el home 
def car(request):
    return render(request, "cars/home.html", {})

#Vista para el home 
def login(request):
    return render(request, "cars/home.html", {})



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