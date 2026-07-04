from rest_framework import serializers
from .models import Platillo

class PlatilloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platillo
        fields = ['id', 'nombre', 'descripcion', 'categoria', 
                  'precio', 'disponible', 'imagen_url', 'created_at', 'updated_at']