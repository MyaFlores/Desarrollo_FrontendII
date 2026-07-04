function CarCard({ car }) {
  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Formatear kilometraje
  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('es-MX').format(mileage);
  };

  return (
    <div className={`car-card ${car.is_available ? 'available' : 'sold'}`}>
      <div className="card-header">
        <h3>{car.brand} {car.model}</h3>
        <span className={`status-badge ${car.is_available ? 'available' : 'sold'}`}>
          {car.is_available ? 'Disponible' : 'Vendido'}
        </span>
      </div>
      
      <div className="card-body">
        <div className="car-detail">
          <span><strong>Año:</strong> {car.year}</span>
        </div>
        <div className="car-detail">
          <span><strong>Precio:</strong> {formatPrice(car.price)}</span>
        </div>
        <div className="car-detail">
          <span><strong>Kilometraje:</strong> {formatMileage(car.mileage)} km</span>
        </div>
        <div className="car-detail">
          <span><strong>Color:</strong> {car.color}</span>
        </div>
        <div className="car-detail">
          <span><strong>Transmisión:</strong> {car.transmission}</span>
        </div>
         <div className="car-detail">
          <span><strong>Combustible:</strong> {car.fuel_type}</span>
        </div>
        
      </div>
    </div>
  );
}

export default CarCard;