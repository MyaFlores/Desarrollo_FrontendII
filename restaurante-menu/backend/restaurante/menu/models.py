from django.db import models

class Platillo(models.Model):
    CATEGORIAS = [
        ('Entrada', 'Entrada'),
        ('Plato Principal', 'Plato Principal'),
        ('Postre', 'Postre'),
        ('Bebida', 'Bebida'),
        ('Guarnición', 'Guarnición'),
    ]
    
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=50, choices=CATEGORIAS)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    disponible = models.BooleanField(default=True)
    imagen_url = models.URLField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = 'Platillo'
        verbose_name_plural = 'Platillos'
        ordering = ['nombre']