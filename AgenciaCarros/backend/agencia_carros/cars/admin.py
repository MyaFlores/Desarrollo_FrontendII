from django.contrib import admin
from .models import Car

@admin.register(Car)
class CarAdmin(admin.ModelAdmin): 
    list_display = ('brand', 'model', 'year', 'price', 'is_available')
    list_filter = ('brand', 'fuel_type', 'transmission', 'is_available')
    search_fields = ('brans', 'model')