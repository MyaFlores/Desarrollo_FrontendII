// frontend/src/components/StatsCard.jsx
function StatsCard({ platillos }) {
  //Asegurar que platillos es un array
  const lista = platillos || [];
  
  const total = lista.length;
  const disponibles = lista.filter(p => p.disponible === true).length;
  const noDisponibles = lista.filter(p => p.disponible === false).length;
  
  //Calcular promedio con validación
  let promedio = 0;
  let masCaro = 0;
  let masEconomico = 0;
  
  if (total > 0) {
    // Convertir todos los precios a números
    const precios = lista
      .map(p => parseFloat(p.precio) || 0)
      .filter(p => p > 0); // Filtrar precios válidos
    
    if (precios.length > 0) {
      promedio = precios.reduce((a, b) => a + b, 0) / precios.length;
      masCaro = Math.max(...precios);
      masEconomico = Math.min(...precios);
    }
  }

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div>
          <p className="stat-label">Total platillos</p>
          <p className="stat-value">{total}</p>
        </div>
      </div>
      <div className="stat-card">
        <div>
          <p className="stat-label">Disponibles</p>
          <p className="stat-value">{disponibles}</p>
        </div>
      </div>
      <div className="stat-card">
        <div>
          <p className="stat-label">No disponibles</p>
          <p className="stat-value">{noDisponibles}</p>
        </div>
      </div>
      <div className="stat-card">
        <div>
          <p className="stat-label">Precio promedio</p>
          <p className="stat-value">${promedio.toFixed(2)}</p>
        </div>
      </div>
      <div className="stat-card">
        <div>
          <p className="stat-label">Más caro</p>
          <p className="stat-value">${masCaro.toFixed(2)}</p>
        </div>
      </div>
      <div className="stat-card">
        <div>
          <p className="stat-label">Más económico</p>
          <p className="stat-value">${masEconomico.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;