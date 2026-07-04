import ReservationCard from './ReservationCard';

function ReservationList({ reservations, onDeleteReservation }) {
  // Opción 2: Mostrar mensaje si no hay reservaciones
  if (reservations.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🍽️</div>
        <h3>No hay reservaciones a ese nombre</h3>
        <p>Agrega tu primera reservación usando el formulario</p>
      </div>
    );
  }

  // Opción 3 implícita: Mostrar mensaje si la búsqueda no encuentra resultados
  // Esto se maneja en App.jsx, pero también podemos manejarlo aquí
  return (
    <div className="reservations-grid">
      {reservations.map((reservation) => (
        <ReservationCard 
          key={reservation.id} 
          reservation={reservation} 
          onDelete={onDeleteReservation}
        />
      ))}
    </div>
  );
}

export default ReservationList;