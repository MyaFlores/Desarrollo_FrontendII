function FilterButtons({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="filter-buttons">
      {filters.map(({ id, label }) => (
        <button
          key={id}
          className={`filter-btn ${activeFilter === id ? 'active' : ''}`}
          onClick={() => onFilterChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;