function SearchBar({ searchTerm, onSearchChange, onRefresh }) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar por marca o modelo..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-search"
            onClick={() => onSearchChange('')}
          >
            ✖
          </button>
        )}
      </div>
      <button onClick={onRefresh} className="btn btn-refresh" title="Recargar">
        🔄
      </button>
    </div>
  );
}

export default SearchBar;