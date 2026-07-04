import PlatilloCard from './PlatilloCard';

function PlatilloList({ platillos, onEdit, onDelete, onToggleAvailability }) {
  if (platillos.length === 0) {
    return (
      <div className="empty-state">
        <h3>No hay platillos disponibles</h3>
        <p>Agrega tu primer platillo usando el formulario</p>
      </div>
    );
  }

  return (
    <div className="platillos-grid">
      {platillos.map((platillo) => (
        <PlatilloCard
          key={platillo.id}
          platillo={platillo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleAvailability={onToggleAvailability}
        />
      ))}
    </div>
  );
}

export default PlatilloList;