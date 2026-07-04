from django.core.management.base import BaseCommand
from cars.models import Car

class Command(BaseCommand):
    help = 'Crea datos de prueba para la agencia de carros'

    def handle(self, *args, **kwargs):
        # Limpiar datos existentes
        Car.objects.all().delete()
        self.stdout.write('🗑️ Datos anteriores eliminados')

        cars_data = [
            {"brand": "Toyota", "model": "Corolla", "year": 2022, "price": 18500.00, "mileage": 32000, "color": "White", "transmission": "Automatic", "fuel_type": "Gasoline", "is_available": True},
            {"brand": "Honda", "model": "Civic", "year": 2023, "price": 22000.00, "mileage": 15000, "color": "Blue", "transmission": "CVT", "fuel_type": "Gasoline", "is_available": True},
            {"brand": "Ford", "model": "Mustang", "year": 2021, "price": 35000.00, "mileage": 25000, "color": "Red", "transmission": "Automatic", "fuel_type": "Gasoline", "is_available": False},
            {"brand": "Chevrolet", "model": "Camaro", "year": 2022, "price": 32000.00, "mileage": 18000, "color": "Yellow", "transmission": "Automatic", "fuel_type": "Gasoline", "is_available": True},
            {"brand": "Tesla", "model": "Model 3", "year": 2023, "price": 45000.00, "mileage": 8000, "color": "White", "transmission": "Automatic", "fuel_type": "Electric", "is_available": True},
            {"brand": "Toyota", "model": "Camry", "year": 2022, "price": 28000.00, "mileage": 22000, "color": "Silver", "transmission": "Automatic", "fuel_type": "Hybrid", "is_available": True},
            {"brand": "Honda", "model": "Accord", "year": 2021, "price": 25000.00, "mileage": 30000, "color": "Black", "transmission": "CVT", "fuel_type": "Gasoline", "is_available": False},
            {"brand": "Nissan", "model": "Sentra", "year": 2023, "price": 20000.00, "mileage": 12000, "color": "Gray", "transmission": "CVT", "fuel_type": "Gasoline", "is_available": True},
            {"brand": "Volkswagen", "model": "Jetta", "year": 2022, "price": 23000.00, "mileage": 19000, "color": "Red", "transmission": "Automatic", "fuel_type": "Gasoline", "is_available": True},
            {"brand": "BMW", "model": "X5", "year": 2023, "price": 58000.00, "mileage": 5000, "color": "White", "transmission": "Automatic", "fuel_type": "Hybrid", "is_available": True},
        ]

        for car_data in cars_data:
            Car.objects.create(**car_data)
            self.stdout.write(f'✅ Creado: {car_data["brand"]} {car_data["model"]}')

        self.stdout.write(self.style.SUCCESS(f'\n✅ {len(cars_data)} carros creados exitosamente'))