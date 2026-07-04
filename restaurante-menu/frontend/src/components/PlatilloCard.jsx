import { useState } from 'react';

function PlatilloCard({ platillo, onEdit, onDelete, onToggleAvailability }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const precioNumerico = parseFloat(platillo.precio) || 0;

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(platillo.id);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <div className={`platillo-card ${!platillo.disponible ? 'no-disponible' : ''}`}>
      <div className="platillo-imagen">
        <img 
  src={platillo.imagen_url || 'https://via.placeholder.com/300x200?text=Sin+Imagen'} 
  alt={platillo.nombre}
  onError={(e) => {
    // Si la imagen no carga, mostrar un placeholder con el nombre
    e.target.style.display = 'none';
    // Mostrar un div con el nombre como fallback
    e.target.parentElement.innerHTML = `
      <div style="
        width: 100%;
        height: 200px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        font-weight: bold;
      ">
        ${platillo.nombre}
      </div>
    `;
  }}
/>
        <span className={`estado-badge ${platillo.disponible ? 'disponible' : 'no-disponible'}`}>
          {platillo.disponible ? 'Disponible' : 'No disponible'}
        </span>
      </div>
      
      <div className="platillo-info">
        <h3>{platillo.nombre}</h3>
        <span className="categoria-tag">{platillo.categoria}</span>
        <p className="descripcion">{platillo.descripcion}</p>
        <p className="precio">${precioNumerico.toFixed(2)}</p>
      </div>
      
      <div className="platillo-acciones">
        <button className="btn btn-edit" onClick={() => onEdit(platillo)}>
          Editar
        </button>
        <button 
          className={`btn ${platillo.disponible ? 'btn-toggle-off' : 'btn-toggle-on'}`}
          onClick={() => onToggleAvailability(platillo.id)}
        >
          {platillo.disponible ? 'Desactivar' : 'Activar'}
        </button>
        <button 
          className={`btn ${confirmDelete ? 'btn-delete-confirm' : 'btn-delete'}`}
          onClick={handleDelete}
          onMouseLeave={cancelDelete}
        >
          {confirmDelete ? '¿Seguro?' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}

export default PlatilloCard;