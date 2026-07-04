import './TheoryView.css';

function TheoryView() {
  const theoryData = [
    {
      question: "1. ¿Cuál es la responsabilidad de Django en esta práctica?",
      answer: "Django actúa como el backend de la aplicación. Es responsable de:",
      details: [
        "Proveer una API RESTful para el consumo de datos",
        "Manejar la lógica de negocio (creación, lectura, actualización de carros)",
        "Gestionar la base de datos a través de modelos y migraciones",
        "Proporcionar autenticación y seguridad",
        "Manejar la paginación de los resultados",
        "Filtrar los carros según los parámetros de la URL"
      ]
    },
    {
      question: "2. ¿Cuál es la responsabilidad de React?",
      answer: "React actúa como el frontend de la aplicación. Es responsable de:",
      details: [
        "Consumir la API REST de Django usando fetch/axios",
        "Renderizar la interfaz de usuario de forma dinámica",
        "Manejar el estado de la aplicación (carros, filtros, paginación)",
        "Mostrar los carros en tarjetas interactivas",
        "Aplicar filtros y búsqueda en la interfaz",
        "Gestionar la navegación entre páginas",
        "Proporcionar una experiencia de usuario fluida y reactiva"
      ]
    },
    {
      question: "3. ¿Qué es una API REST?",
      answer: "API REST (Representational State Transfer) es un conjunto de principios de arquitectura para diseñar servicios web. Sus características principales son:",
      details: [
        "Utiliza HTTP como protocolo de comunicación",
        "Opera sobre recursos identificados por URLs",
        "Usa métodos HTTP (GET, POST, PUT, DELETE) para operar sobre recursos",
        "Los recursos se representan en formatos como JSON o XML",
        "Es stateless (sin estado): cada petición contiene toda la información necesaria",
        "Permite la separación entre cliente y servidor",
        "En nuestra práctica, la API REST de Django expone el recurso 'carros' en /api/cars/"
      ]
    },
    {
      question: "4. ¿Qué hace un serializer en Django REST Framework?",
      answer: "Un serializer en Django REST Framework tiene las siguientes funciones:",
      details: [
        "Convierte objetos complejos (modelos Django) en formatos JSON/XML (serialización)",
        "Convierte datos JSON entrantes en objetos Python (deserialización)",
        "Valida los datos antes de guardarlos en la base de datos",
        "Permite controlar qué campos se incluyen en la respuesta",
        "Facilita la creación y actualización de registros",
        "En nuestra práctica, CarSerializer convierte los objetos Car a JSON para la API"
      ]
    },
    {
      question: "5. ¿Por qué necesitamos CORS para conectar React con Django?",
      answer: "CORS (Cross-Origin Resource Sharing) es necesario porque:",
      details: [
        "React y Django se ejecutan en diferentes puertos: localhost:5173 y localhost:8000",
        "Los navegadores bloquean peticiones entre diferentes orígenes por seguridad",
        "CORS permite que el frontend (React) pueda hacer peticiones al backend (Django)",
        "Django debe configurarse para aceptar peticiones del origen de React",
        "Sin CORS, el navegador mostraría errores de bloqueo en la consola"
      ]
    },
    {
      question: "6. ¿Qué es la paginación y por qué es útil?",
      answer: "La paginación es una técnica que divide grandes conjuntos de datos en páginas más pequeñas. Sus beneficios son:",
      details: [
        "Mejora el rendimiento al cargar solo un subconjunto de datos",
        "Reduce el tiempo de carga de la página",
        "Disminuye el consumo de recursos (memoria, ancho de banda)",
        "Mejora la experiencia de usuario con tiempos de respuesta rápidos",
        "Permite navegar entre páginas de resultados",
        "En nuestra práctica, se muestran 6 carros por página",
        "Django envía información de navegación: next, previous, count"
      ]
    },
    {
      question: "7. ¿Qué hace useEffect al consumir una API?",
      answer: "useEffect es un Hook de React que permite ejecutar efectos secundarios en componentes funcionales. Al consumir una API:",
      details: [
        "Permite realizar la petición HTTP cuando el componente se monta",
        "Se ejecuta después de que el componente se renderiza",
        "Puede ejecutarse cuando dependencias específicas cambian",
        "Permite manejar el estado de carga y errores",
        "Facilita la limpieza de peticiones para evitar memory leaks",
        "En nuestra práctica, useEffect(fetchCars, []) carga los carros al iniciar la aplicación"
      ]
    },
    {
      question: "8. ¿Qué diferencia hay entre manejar datos locales con useState y consumir datos desde un backend?",
      answer: "La diferencia principal radica en el origen y la persistencia de los datos:",
      details: [
        "DATOS LOCALES (useState):",
        "  - Datos temporales que se pierden al recargar la página",
        "  - No se comparten entre diferentes usuarios",
        "  - No requieren conexión a internet",
        "  - Son ideales para estado de UI (filtros, búsqueda)",
        "",
        "DATOS DESDE BACKEND:",
        "  - Datos persistentes que permanecen en la base de datos",
        "  - Son compartidos entre todos los usuarios",
        "  - Requieren conexión a internet y llamadas HTTP",
        "  - Son la fuente de verdad de la aplicación",
        "  - En nuestra práctica: los carros se almacenan en la base de datos de Django"
      ]
    }
  ];

  return (
    <div className="theory-container">
      <h1 className="theory-title">Parte Teórica - Agencia de Carros</h1>
      <p className="theory-subtitle">React + Django REST Framework</p>
      
      <div className="theory-grid">
        {theoryData.map((item, index) => (
          <div key={index} className="theory-card">
            <div className="theory-card-header">
              <span className="theory-number">{index + 1}</span>
              <h3 className="theory-question">{item.question}</h3>
            </div>
            <div className="theory-card-body">
              <p className="theory-answer">{item.answer}</p>
              {item.details && (
                <ul className="theory-details">
                  {item.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TheoryView;