function SearchBar({ searchTerm, onSearchChange, onRefresh }) {
  return (
    <div className="search-bar">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button className="clear-search" onClick={() => onSearchChange('')}>
            ✖
          </button>
        )}
      </div>
      <button className="btn btn-refresh" onClick={onRefresh} title="Actualizar">
        🔄
      </button>
    </div>
  );
}

export default SearchBar;