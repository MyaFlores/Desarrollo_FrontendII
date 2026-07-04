function ReservationCard({ reservation, onDelete }) {
  // Función para obtener el ícono según el tipo de mesa
  const getTableIcon = (tableType) => {
    const icons = {
      'Indoor': '🏠',
      'Outdoor': '🌳',
      'VIP': '👑',
      'Family Area': '👨‍👩‍👧‍👦'
    };
    return icons[tableType] || '🍽️';
  };

  // Función para obtener la clase CSS según el estado (Opción 4)
  const getStatusClass = (status) => {
    switch(status) {
      case 'Confirmed': return 'status-confirmed';
      case 'Cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  // Función para obtener el ícono según el estado
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Confirmed': return '';
      case 'Cancelled': return '';
      default: return '';
    }
  };

  return (
    <div className={`reservation-card status-border-${reservation.status.toLowerCase()}`}>
      <div className="card-header">
        <h3>{getTableIcon(reservation.tableType)} {reservation.customerName}</h3>
        <div className={`status-indicator ${getStatusClass(reservation.status)}`}>
          {getStatusIcon(reservation.status)} {reservation.status}
        </div>
      </div>
      
      <div className="card-body">
        <p>
          <span className="card-icon">👥</span>
          <strong>Comensales:</strong> {reservation.guests}
        </p>
        <p>
          <span className="card-icon">🕐</span>
          <strong>Hora:</strong> {reservation.time}
        </p>
        <p>
          <span className="card-icon">🍽️</span>
          <strong>Mesa:</strong> {reservation.tableType}
        </p>
        <p>
          <span className="card-icon">📅</span>
          <strong>Reservado el:</strong> {reservation.createdAt}
        </p>
      </div>
      
      <div className="card-footer">
        <button 
          onClick={() => onDelete(reservation.id)} 
          className="btn btn-danger"
        >
          Cancelar reservacion
        </button>
      </div>
    </div>
  );
}

export default ReservationCard;