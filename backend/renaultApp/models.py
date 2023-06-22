from django.db import models
import cloudinary
from cloudinary.models import CloudinaryField
#Para guardar contraseñas
from django.contrib.auth.hashers import make_password

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
    image = models.TextField(default='https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210211-RENAULT-ZOE-2021-COLOMBIA-PRECIO-CARACTERISTICAS-ELECTRICO-01.jpg')
    # cloudinary.models.CloudinaryField(
    #     folder='media/images/', overwrite=True, resource_type='', blank=True)
    description = models.TextField(default="descripción aqui")
    model = models.CharField(max_length=20, default="modelo")
    type = models.CharField(max_length=3, choices=CAR_OF_TYPE)
		#Define una representación de string para los objeto carro. 
		#En el panel de django admin por ejemplo, al consultar los carros creadas
    #apareceran con la representación que defines en este metodo
    def __str__(self):
        return self.name
 
class User(models.Model):
    username = models.CharField(max_length=50)
    name = models.CharField(max_length=60)
    email = models.EmailField(max_length=50)
    address = models.CharField(max_length=50)
    phone = models.DecimalField(max_digits=10, decimal_places=0, default=111)
    password = models.CharField(max_length=128)  # Longitud suficiente para almacenar el hash

    def save(self, *args, **kwargs):
        # Generar el hash de la contraseña antes de guardarla
        self.password = make_password(self.password)
        super().save(*args, **kwargs)
		
    class Meta:
        abstract = True
    
class Client(User):
    PAYMENT_TYPE = [
        ("EF","Efectivo"),
        ("CA","Cuenta de ahorros"),
        ("CD","Credito"),
        ("CT","Cuotas"),
    ]
    paymentType = models.CharField(max_length=2, choices=PAYMENT_TYPE)
    
    def __str__(self):
        return self.name

class Staff(User):
    JOB_TITLE = [
        ("GE","Gerente"),
        ("JT","Jefe de Taller"),
        ("VE","Vendedor"),
    ]
    jobTitle = models.CharField(max_length=2, choices=JOB_TITLE)
    image = cloudinary.models.CloudinaryField(
        folder='media/staffImage/', overwrite=True, resource_type='', blank=True)
    
    def __str__(self):
        return self.name

class Concessionaire(models.Model):
    name = models.CharField(max_length=60)
    address = models.CharField(max_length=50)
    phone = models.DecimalField(max_digits=10, decimal_places=0)
    gerente = models.ForeignKey(Staff, on_delete=models.PROTECT)

    def __str__(self):
        return self.name
    
class Parts(models.Model):
    name = models.CharField(max_length=60)
    price = models.IntegerField(default=0)
    amount = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
class Demand(models.Model):
    worker = models.ForeignKey(Staff, on_delete=models.PROTECT)
    state = models.BooleanField(default=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)


class Quotation(models.Model):
    price = models.IntegerField(default=0)
    carName = models.ForeignKey(Car, on_delete=models.PROTECT)
    request = models.ForeignKey(Demand, on_delete=models.PROTECT, default=Demand)

    def __str__(self):
        return self.carName
    
class Order(models.Model):
    description = models.TextField(blank=True, default="descripción aqui")
    startTime = models.DateField()
    car = models.CharField(max_length=70, default="car")
    price = models.IntegerField(default=0)
    request = models.ForeignKey(Demand, on_delete=models.PROTECT, default=Demand)
    def __str__(self):
        return self.description

class Payment(models.Model):
    register = models.IntegerField(default=0)
    time = models.TimeField()
    date = models.DateField()
    payment = models.ForeignKey(Client, on_delete=models.PROTECT)
    
    def __str__(self):
        return self.payment