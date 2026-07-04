function Pagination({ currentPage, totalCount, nextPage, prevPage, onPageChange }) {
  return (
    <div className="pagination">
      <div className="pagination-info">
        <p>Página {currentPage}</p>
      </div>
      <div className="pagination-buttons">
        <button
          className={`btn btn-pagination ${!prevPage ? 'disabled' : ''}`}
          onClick={() => onPageChange(prevPage)}
          disabled={!prevPage}
        >
          Anterior
        </button>
        <button
          className={`btn btn-pagination ${!nextPage ? 'disabled' : ''}`}
          onClick={() => onPageChange(nextPage)}
          disabled={!nextPage}
        >
          Siguiente 
        </button>
      </div>
    </div>
  );
}

export default Pagination;