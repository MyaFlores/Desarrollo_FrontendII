from django.db import models

class Car(models.Model): 
    #APARTADO PARA DESPLEGABLE DE OPCIONES
    TRANSMISSION_CHOICES =[
        ('Manual', 'Manual'),
        ('Automatic', 'Automatic'),
        ('CVT', 'CVT'),
        ('Dual-Clutch', 'Dual_Clutch'),
    ]

    FUEL_TYPE_CHOICES =[
        ('Gasoline', 'Gasolina'),
        ('Diesel', 'Diesel'),
        ('Electric', 'Eletrico'),
        ('Hybrid', 'Hibrido'),
    ]

    #CAMPOS PARA EL MODELO
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    mileage = models.IntegerField(help_text="Kilometraje en KM")
    color = models.CharField(max_length=30)
    transmission = models.CharField(max_length=20, choices=TRANSMISSION_CHOICES)
    fuel_type = models.CharField(max_length=20, choices=FUEL_TYPE_CHOICES)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"
    
    class Meta: 
        ordering = ['-created_at']
        verbose_name = 'Carro'
        verbose_name_plural = 'Carros'
