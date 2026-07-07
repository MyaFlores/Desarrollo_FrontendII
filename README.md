# Sistema de administracion de restaurantes

### 1. Descripcion del proyecto
Esta aplicacion web es un sistema de administración de restaurantes que nos permite
gestionar un menu digital. Para la construccion de esta aplicacion se uso 
React en la parte del frontend y Django REST Framework en la parte de backend, nosotros al usar
estas herramientas nos permite realizar operaciones CRUD (**Create, Read, Update y Delete**).

Este proyecto demuestra la integracion entre frontend moderno y backend robusto, aplicando conceptos fundamentales del desarrollo web como:
- Componentes reutilizables en React
- Comunicacion asincrona con APIs usando Axios
- Validaciones y manejo de errores
- Estilos modernos y responsivos
##

### 2. Características
**Backend (Django REST Framework)**
- El modelo **Platillo** contiene campos completos como nombre, descripcion, categoria, precio, disponibilidad y imagen URL
- Panel de administracion de Django para gestionar la informacion ingresada
- API RESTful con endpoints para gestionar CRUD completo
- Filtros para categoría, disponibilidad y búsqueda por nombre
- Ordenamiento por precio de forma ascendente a descendente
- Configuracion CORS para permitir comunicación con React

**Frontend (React)**
- Componente **PlatilloCard** reutilizable con props y eventos
- Lista de platillos en forma de tarjetas
- Formulario modeal para agregar y editar platillos
- Diseño responsivo y moderno
- Mensajes de exito y error despues de cada operacion ejecutada
- Filtros por disponibilidad, por ejemplo **Todos, Disponibles y No disponibles**

##

### 3. Tecnologías utilizadas

**Backend**
| Tecnología | Version | Descripción |
| :--- | :---: | ---: |
| Django | 5.2 | Framework web de Python |
| Django REST Framework | 3.15 | Framework para construir APIs RESTful |
| django-cors-headers | 4.3 | Manejo de CORS para comunicacion con Frontend |
| SQLite | 3 | Base de datos |


**Frontend**
| Tecnología | Version | Descripción |
| :--- | :---: | ---: |
| React | 18.3 | Biblioteca para construir interfaces de usuario |
| Vite | 5.2 | Bundler y servicios de desarrollo |
| Axios | 1.7 | Cliente HTTP para peticiones a la API |
| CSS3 |  | Estilos y diseño responsivo |

##

### 4. Estructura del proyecto
Para explicar a detalle como esta conformada la estructura del proyecto se va a dividir en **Backend** y **Frontend**

### Frontend
| Tecnología | Descripción |
| :--- | :---: | 
| frontend/ | Carpeta donde se almacena el proyecto de Frontend |
| src/ | Carpeta principal donde se almacena todo el diseño de React |
| components/ | Carpeta que almacena cada parte del proyecto | 
| PlatilloCard.jsx | Tarjeta de informacion de un platillo | 
| PlatilloList.jsx | Lista de platillos registrados |
| PlatilloForm.jsx | Formulario para agregar platillos nuevos | 
| SearchBar.jsx | Barra de busqueda |
| FilterButtons.jsx | Botones para filtrar busquedas | 
| StatsCard.jsx | Estadisticas del restaurante |
| Aps.jsx | Componente principal que ejecuta el programa | 
| App.css | Estilos globales |
| main.jsx | | 
| package.json |  |
| vite.config.js | | 


### Backend
| Tecnología | Descripción |
| :--- | :---: | 
| backend/ | Carpeta donde se almacena el pro |
| restaurante/ | |
| settings.py | |
| urls. py | |
| menu/ | App principal del proyecto |
| migrations/ | Migraciones de la base de datos |
| admin.py | |
| models.py | Modelos |
| serializers.py | Serializador para la API|
| views.py | Vistas y ViewSets|
| urls.py | Rutas de la aplicación |
| manage.py| |
| requirements.txt | |


##

### 5. Instalacion y configuracion del proyecto
**Requisitos previos**
- Python 3.8 o superior
- Node.js 18 o superior
- npm o yarn
- Git

  **Clonar el repositorio**
  ```powershell
  uv --version
  ```

##

### 6. Lista completa de endpoints

| Método | Endpoint | Descripción |
| :--- | :---: | ---: |
| GET | /api/platillos/ | Lista de todos los platillos |
| GET | /api/platillos/?categoria={categoria} | Filtrar por categoría |
| GET | /api/platillos/?disponible=true | Filtrar por disponibilidad |
| GET | /api/platillos/?search={termino} | Busqueda por nombre |
| GET | /api/platillos/?ordenar=precio_asc | Ordenar por precio ascendente |
| GET | /api/platillos/?ordenar=precio_desc | Ordenar por precio descendente |
| GET | /api/platillos/{id} | Obtener un platillo por su ID |
| POST | /api/platillos/ | Crear un nuevo platillo |
| PUT | api/platillos/{id}/ | Actualiza un platillo completo |
| PATCH | /api/platillos/{id}/ | Actualiza parcialmente un platill |
| DELETE | /api/platillos/{id}/ | Elimina un platillo |
| PATCH | /api/platillos/{id}/toggle_disponibilidad/ | Cambia la disponibilidad |

##
