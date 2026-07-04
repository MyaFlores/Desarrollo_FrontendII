import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restaurante.settings')
django.setup()

from menu.models import Platillo

# backend/menu/management/commands/seed_data.py
PLATILLOS_DATA = [
    {
        "nombre": "Ensalada César",
        "descripcion": "Lechuga romana, crutones, queso parmesano y aderezo César",
        "categoria": "Entrada",
        "precio": 85.00,
        "disponible": True,
        "imagen_url": "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?w=400&h=300&fit=crop"
    },
    {
        "nombre": "Pasta Alfredo",
        "descripcion": "Fettuccine con salsa cremosa de parmesano y mantequilla",
        "categoria": "Plato Principal",
        "precio": 165.00,
        "disponible": True,
        "imagen_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=400&h=300&fit=crop"
    },
    {
        "nombre": "Brownie con Helado",
        "descripcion": "Brownie de chocolate caliente con bola de helado de vainilla",
        "categoria": "Postre",
        "precio": 95.00,
        "disponible": True,
        "imagen_url": "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?w=400&h=300&fit=crop"
    },
    {
        "nombre": "Limonada Natural",
        "descripcion": "Limonada fresca con hierbabuena",
        "categoria": "Bebida",
        "precio": 45.00,
        "disponible": True,
        "imagen_url": "https://images.pexels.com/photos/33223927/pexels-photo-33223927.jpeg?w=400&h=300&fit=crop"
    },
    {
        "nombre": "Tacos al Pastor",
        "descripcion": "Tortilla de maíz con carne de cerdo adobada, piña y cilantro",
        "categoria": "Plato Principal",
        "precio": 120.00,
        "disponible": True,
        "imagen_url": "https://images.pexels.com/photos/9095726/pexels-photo-9095726.jpeg?w=400&h=300&fit=crop"
    },
    {
        "nombre": "Café Americano",
        "descripcion": "Café recién hecho con agua caliente",
        "categoria": "Bebida",
        "precio": 35.00,
        "disponible": True,
        "imagen_url": "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=400&h=300&fit=crop"
    }
]

def seed_platillos():
    """Función principal para sembrar datos"""
    print("Iniciando la insercion de platillos...")
    
    # Contar platillos existentes
    count = Platillo.objects.count()
    print(f"Platillos existentes: {count}")
    
    if count > 0:
        respuesta = input("¿Deseas eliminar los platillos existentes? (s/n): ")
        if respuesta.lower() == 's':
            Platillo.objects.all().delete()
            print("Platillos eliminados")
        else:
            print("Operación cancelada")
            return
    
    # Crear nuevos platillos
    creados = 0
    for data in PLATILLOS_DATA:
        platillo = Platillo.objects.create(**data)
        creados += 1
        print(f"Creado: {platillo.nombre} (${platillo.precio})")
    
    print(f"\n🎉 {creados} platillos creados exitosamente!")
    print(f"Total en base de datos: {Platillo.objects.count()}")

if __name__ == "__main__":
    seed_platillos()