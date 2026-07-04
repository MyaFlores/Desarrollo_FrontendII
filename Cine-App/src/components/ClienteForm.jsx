import { useState } from 'react';

function ClienteForm({ onRegistrarCompra, peliculaSeleccionada, limpiarSeleccion }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    horario: '',
    tipoSala: '',
    cantidad: 1,
    formaPago: ''
  });

  const [errores, setErrores] = useState({});

  const horariosDisponibles = peliculaSeleccionada?.horarios || [];

  const tiposSala = ['Normal', '3D', '4DX', 'IMAX', 'Dolby Atmos', 'Kids'];
  const formasPago = ['Efectivo', 'Tarjeta de débito', 'Tarjeta de crédito', 'Transferencia', 'Vale de regalo'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es requerido';
    if (!formData.correo.trim()) nuevosErrores.correo = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.correo)) nuevosErrores.correo = 'Correo inválido';
    if (!formData.horario) nuevosErrores.horario = 'Selecciona un horario';
    if (!formData.tipoSala) nuevosErrores.tipoSala = 'Selecciona un tipo de sala';
    if (formData.cantidad < 1) nuevosErrores.cantidad = 'La cantidad debe ser mayor a 0';
    if (formData.cantidad > 20) nuevosErrores.cantidad = 'Máximo 20 boletos por compra';
    if (!formData.formaPago) nuevosErrores.formaPago = 'Selecciona una forma de pago';
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario() && peliculaSeleccionada) {
      onRegistrarCompra({ ...formData, pelicula: peliculaSeleccionada });
    } else if (!peliculaSeleccionada) {
      alert('Por favor, selecciona una película primero');
    }
  };

  return (
    <div className="form-container">
      <h2>Datos del cliente</h2>
      {peliculaSeleccionada && (
        <div className="pelicula-seleccionada">
          <p>Pelicula seleccionada: <strong>{peliculaSeleccionada.titulo}</strong></p>
          <button onClick={limpiarSeleccion} className="clear-selection-btn">✖ Cambiar película</button>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
          />
          {errores.nombre && <span className="error">{errores.nombre}</span>}
        </div>

        <div className="form-group">
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />
          {errores.correo && <span className="error">{errores.correo}</span>}
        </div>

        <div className="form-group">
          <label>Horario:</label>
          <select name="horario" value={formData.horario} onChange={handleChange}>
            <option value="">Seleccionar horario</option>
            {horariosDisponibles.map(horario => (
              <option key={horario} value={horario}>{horario}</option>
            ))}
          </select>
          {errores.horario && <span className="error">{errores.horario}</span>}
        </div>

        <div className="form-group">
          <label>Tipo de sala:</label>
          <select name="tipoSala" value={formData.tipoSala} onChange={handleChange}>
            <option value="">Seleccionar tipo de sala</option>
            {tiposSala.map(sala => (
              <option key={sala} value={sala}>{sala}</option>
            ))}
          </select>
          {errores.tipoSala && <span className="error">{errores.tipoSala}</span>}
        </div>

        <div className="form-group">
          <label>Cantidad de boletos:</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            min="1"
            max="20"
          />
          {errores.cantidad && <span className="error">{errores.cantidad}</span>}
        </div>

        <div className="form-group">
          <label>Forma de pago:</label>
          <div className="pago-opciones">
            {formasPago.map(pago => (
              <label key={pago} className="pago-label">
                <input
                  type="radio"
                  name="formaPago"
                  value={pago}
                  checked={formData.formaPago === pago}
                  onChange={handleChange}
                />
                {pago}
              </label>
            ))}
          </div>
          {errores.formaPago && <span className="error">{errores.formaPago}</span>}
        </div>

        <button type="submit" className="submit-btn">Generar Ticket</button>
      </form>
    </div>
  );
}

export default ClienteForm;