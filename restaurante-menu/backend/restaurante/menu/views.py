from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Platillo
from .serializers import PlatilloSerializer

class PlatilloViewSet(viewsets.ModelViewSet):
    queryset = Platillo.objects.all()
    serializer_class = PlatilloSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filtro por categoría
        categoria = self.request.query_params.get('categoria', None)
        if categoria:
            queryset = queryset.filter(categoria__iexact=categoria)
        
        # Filtro por disponibilidad
        disponible = self.request.query_params.get('disponible', None)
        if disponible is not None:
            if disponible.lower() == 'true':
                queryset = queryset.filter(disponible=True)
            elif disponible.lower() == 'false':
                queryset = queryset.filter(disponible=False)
        
        # Búsqueda por nombre
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(nombre__icontains=search)
        
        # Ordenar por precio
        ordenar = self.request.query_params.get('ordenar', None)
        if ordenar == 'precio_asc':
            queryset = queryset.order_by('precio')
        elif ordenar == 'precio_desc':
            queryset = queryset.order_by('-precio')
        
        return queryset
    
    @action(detail=True, methods=['patch'])
    def toggle_disponibilidad(self, request, pk=None):
        platillo = self.get_object()
        platillo.disponible = not platillo.disponible
        platillo.save()
        serializer = self.get_serializer(platillo)
        return Response(serializer.data)