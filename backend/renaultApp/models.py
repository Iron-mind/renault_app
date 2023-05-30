from django.db import models
import cloudinary
from cloudinary.models import CloudinaryField


class Car(models.Model):
    CAR_OF_TYPE = [
        ("SU","SUV"),
        ("HB","Hatchback"),
        ("CT","Convertible"),
        ("SD","Sedán"),
        ("DP","Deportivo"),
        ("CO","Coupe"),
        ("MV","Minivan"),
        ("CP","Camionetas Pickup"),
        ("SW","Station Wagon"),
    ]
    name = models.CharField(max_length=70)
    price = models.IntegerField(default=0)
    image = cloudinary.models.CloudinaryField(
        folder='media/images/', overwrite=True, resource_type='', blank=True)
    description = models.TextField(default="descripción aqui")
    model = models.CharField(max_length=20, default="modelo")
    Type = models.CharField(max_length=2, choices=CAR_OF_TYPE, default="SU")
		#Define una representación de string para los objeto carro. 
		#En el panel de django admin por ejemplo, al consultar los carros creadas
    #apareceran con la representación que defines en este metodo
    def __str__(self):
        return self.name
 
class User(models.Model):
    name = models.CharField(max_length=60)
    email = models.EmailField(max_length=50)
    address = models.CharField(max_length=50)
    phone = models.DecimalField(max_digits=10, decimal_places=0)
    id = models.CharField(max_length=10, primary_key=True)
		
    class Meta:
        abstract = True
    
class Client(User):
    PAYMENT_TYPE = [
        ("EF","Efectivo"),
        ("CA","Cuenta de ahorros"),
        ("CD","Credito"),
        ("CT","Cuotas"),
    ]
    paymentType = models.CharField(max_length=2, choices=PAYMENT_TYPE, default="EF")
    
    def __str__(self):
        return self.name

class Staff(User):
    JOB_TITTLE = [
        ("GE","Gerente"),
        ("JT","Jefe de Taller"),
        ("VE","Vendedor"),
    ]
    jobTittle = models.CharField(max_length=2, choices=JOB_TITTLE, default="VE")
    image = cloudinary.models.CloudinaryField(
        folder='media/staffImage/', overwrite=True, resource_type='', blank=True)
    
    def __str__(self):
        return self.name

class Concessionaire(models.Model):
    name = models.CharField(max_length=60)
    address = models.CharField(max_length=50)
    phone = models.DecimalField(max_digits=10, decimal_places=0)
    id = models.CharField(max_length=10, primary_key=True)
    gerente = models.ForeignKey(Staff, on_delete=models.PROTECT)

    def __str__(self):
        return self.name
    
class Parts(models.Model):
    name = models.CharField(max_length=60)
    price = models.IntegerField(default=0)
    amount = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
class Request(models.Model):
    Worker = models.ForeignKey(Staff, on_delete=models.PROTECT)
    State = models.BooleanField(default=False)
    
    class Meta:
        abstract = True

class Quotation(Request):
    price = models.IntegerField(default=0)
    carName = models.ForeignKey(Car, on_delete=models.PROTECT)
    
    def __str__(self):
        return self.name
    
class Order(Request):
    description = models.TextField(default="descripción aqui")
    startTime = models.DateField()
    endTime = models.DateField()
    
    def __str__(self):
        return self.name


class Payment(models.Model):
    register = models.IntegerField(default=0)
    time = models.TimeField()
    date = models.DateField()
    payment = models.ForeignKey(Client, on_delete=models.PROTECT)
    
    def __str__(self):
        return self.name