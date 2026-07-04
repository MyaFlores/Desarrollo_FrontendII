import { useState } from 'react';

function ReservationForm({ onAddReservation }) {
  // Estados para cada campo del formulario (formulario controlado)
  const [customerName, setCustomerName] = useState('');
  const [guests, setGuests] = useState(1);
  const [time, setTime] = useState('');
  const [tableType, setTableType] = useState('Interior');
  const [status, setStatus] = useState('Pending'); // Opción 4: Estado de reservación
  const [error, setError] = useState('');

  // Opciones para el select de tipo de mesa
  const tableTypes = ['Interior', 'Exterior', 'VIP', 'Area Familiar', 'Barra', 'Terraza'];
  
  // Opciones para el estado de reservación (Opción 4)
  const statusOptions = ['Pending', 'Confirmed', 'Cancelled'];

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación: Opción 1 (implícita) - No permitir nombre vacío
    if (customerName.trim() === '') {
      setError('El nombre del cliente es obligatorio');
      return;
    }
    
    if (time === '') {
      setError('Por favor selecciona una hora');
      return;
    }

    // Crear nueva reservación como objeto
    const newReservation = {
      id: Date.now(), // Identificador único basado en timestamp
      customerName: customerName.trim(),
      guests: guests,
      time: time,
      tableType: tableType,
      status: status, // Opción 4: Incluir estado
      createdAt: new Date().toLocaleString()
    };

    // Agregar la reservación
    onAddReservation(newReservation);
    
    // Limpiar el formulario después de agregar
    setCustomerName('');
    setGuests(1);
    setTime('');
    setTableType('Interior');
    setStatus('Pending');
    setError('');
  };

  // Generar opciones de horas (cada 30 minutos desde 12:00 PM a 11:00 PM)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 12; hour <= 23; hour++) {
      const hour12 = hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? 'AM' : 'PM';
      times.push(`${hour12}:00 ${ampm}`);
      times.push(`${hour12}:30 ${ampm}`);
    }
    return times;
  };

  return (
    <div className="form-container">
      <h2>Nueva reservacion</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del cliente:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Ej: Ana García"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Numero de comensales:</label>
          <input
            type="number"
            className="form-input"
            value={guests}
            onChange={(e) => {
               const valor = e.target.value;
               if (valor === '') {
               setGuests('');
               } else {
               setGuests(Number(valor));
            }
          }}
               onBlur={() => {
               if (guests === '') {
                setGuests(1);
           }
        }}
            min="1"
            max="20"
          />
        </div>

        <div className="form-group">
          <label>Hora de reservacion:</label>
          <select 
            value={time} 
            onChange={(e) => setTime(e.target.value)}
            className="form-input"
          >
            <option value="">Seleccionar hora</option>
            {generateTimeOptions().map((timeOption) => (
              <option key={timeOption} value={timeOption}>
                {timeOption}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tipo de mesa:</label>
          <select 
            value={tableType} 
            onChange={(e) => setTableType(e.target.value)}
            className="form-input"
          >
            {tableTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Opción 4: Campo para el estado de la reservación */}
        <div className="form-group">
          <label>Estado de reservacion:</label>
          <div className="status-options">
            {statusOptions.map((option) => (
              <label key={option} className="status-label">
                <input
                  type="radio"
                  name="status"
                  value={option}
                  checked={status === option}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <span className={`status-badge status-${option.toLowerCase()}`}>
                  {option === 'Pending' ? '' : option === 'Confirmed' ? '' : ''} {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar reservacion
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;