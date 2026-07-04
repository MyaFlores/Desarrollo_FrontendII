function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <h3>{message || 'No cars found'}</h3>
      <p>Intenta con otros filtros o busca diferentes términos</p>
    </div>
  );
}

export default EmptyState;