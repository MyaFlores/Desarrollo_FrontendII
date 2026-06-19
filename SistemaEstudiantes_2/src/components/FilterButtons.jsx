function FilterButtons({ filter, onFilterChange }) {
  // Opciones de filtro
  const filters = [
    { id: 'All', label: 'Todos', color: 'filter-all' },
    { id: 'Passed', label: 'Aprobados', color: 'filter-passed' },
    { id: 'Failed', label: 'Reprobados', color: 'filter-failed' }
  ];

  return (
    <div className="filter-container">
      <div className="filter-buttons">
        {filters.map(({ id, label, color }) => (
          <button
            key={id}
            className={`filter-btn ${color} ${filter === id ? 'active' : ''}`}
            onClick={() => onFilterChange(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterButtons;