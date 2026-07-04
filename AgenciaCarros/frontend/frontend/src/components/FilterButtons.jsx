function FilterButtons({ filter, onFilterChange }) {
  const filters = [
    { id: 'All', label: 'Todos' },
    { id: 'Available', label: 'Disponibles' },
    { id: 'Sold', label: 'Vendidos' }
  ];

  return (
    <div className="filter-buttons">
      {filters.map(({ id, label }) => (
        <button
          key={id}
          className={`filter-btn ${filter === id ? 'active' : ''}`}
          onClick={() => onFilterChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;