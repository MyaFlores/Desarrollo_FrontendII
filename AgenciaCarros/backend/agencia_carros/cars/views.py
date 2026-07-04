from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Car
from .serializers import CarSerializer

class CarPagination(PageNumberPagination):
    page_size = 7
    page_size_query_param = 'page_size'
    max_page_size = 1

class CarViewSet(viewsets.ModelViewSet): 
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    pagination_class = CarPagination

    def get_queryset(self):
        queryset = super().get_queryset()

        #FILTRO POR MARCA
        brand = self.request.query_params.get('brand', None)
        if brand:
            queryset = queryset.filter(brand__icontains=brand)

        #FILTRO POR MODELO
        model = self.request.query_params.get('model', None)
        if model: 
            queryset = queryset.filter(model__icontains=model)

        #FILTRO POR DISPONIBILIDAD
        is_available = self.request.query_params.get('is_available', None)
        if is_available is not None: 
            if is_available.lower() == 'true':
                queryset = queryset.filter(is_available=True)
            elif is_available.lower() == 'false':
                queryset = queryset.filter(is_available=False)

        return queryset
                
