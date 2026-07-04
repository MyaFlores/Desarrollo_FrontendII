function Ticket({ compra, onCerrar }) {
  if (!compra) return null;

  const { nombre, correo, horario, tipoSala, cantidad, formaPago, pelicula } = compra;
  const subtotal = pelicula.precio * cantidad;
  const impuesto = subtotal * 0.16;
  const total = subtotal + impuesto;
  const fecha = new Date().toLocaleString();

  return (
    <div className="ticket-overlay" onClick={onCerrar}>
      <div className="ticket" onClick={(e) => e.stopPropagation()}>
        <div className="ticket-header">
          <div className="ticket-perforation"></div>
          <h2>CINEPOLIS</h2>
          <p>Ticket de compra</p>
        </div>
        
        <div className="ticket-body">
          <div className="ticket-section">
            <h3>Película</h3>
            <p className="movie-title">{pelicula.titulo}</p>
            <div className="ticket-details">
              <span>Fecha: {fecha}</span>
              <span>Hora: {horario}</span>
              <span>Sala: {tipoSala}</span>
            </div>
          </div>

          <div className="ticket-section">
            <h3>👤 Cliente</h3>
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Correo:</strong> {correo}</p>
          </div>

          <div className="ticket-section">
            <h3>Detalle de pago</h3>
            <div className="payment-details">
              <p>Boletos: {cantidad} x ${pelicula.precio}</p>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>IVA (16%): ${impuesto.toFixed(2)}</p>
              <p><strong>Total: ${total.toFixed(2)}</strong></p>
              <p><strong>Forma de pago:</strong> {formaPago}</p>
            </div>
          </div>
        </div>

        <div className="ticket-footer">
          <div className="ticket-perforation-bottom"></div>
          <p>¡Gracias por tu compra!</p>
          <button onClick={onCerrar} className="close-ticket">Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default Ticket;