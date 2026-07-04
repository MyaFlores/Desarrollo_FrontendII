import { useState, useEffect } from 'react';
import axios from 'axios';
import CarList from './components/CarList';
import Pagination from './components/Pagination';
import FilterButtons from './components/FilterButtons';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import TheoryView from './components/TheoryView';
import './App.css';

function App() {
  // Estados principales
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  
  // Estados para filtros
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  
  // Estado para mostrar teoría o lista
  const [showTheory, setShowTheory] = useState(false);

  // URL base de la API
  const API_BASE_URL = 'http://localhost:8000/api/cars/';

  // Función para obtener carros desde la API
  const fetchCars = async (url = API_BASE_URL) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(url);
      setCars(response.data.results);
      setFilteredCars(response.data.results);
      setTotalCount(response.data.count);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      
      // Extraer número de página de la URL
      const urlObj = new URL(url);
      const page = urlObj.searchParams.get('page') || '1';
      setCurrentPage(parseInt(page));
      
    } catch (err) {
      setError('Error al cargar los carros. Asegúrate de que el servidor Django esté corriendo.');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efecto para aplicar filtros y búsqueda localmente
  useEffect(() => {
    if (cars.length === 0) return;
    
    const applyFilters = () => {
      let result = [...cars];
      
      // Filtro por disponibilidad
      if (filter === 'Available') {
        result = result.filter(car => car.is_available === true);
      } else if (filter === 'Sold') {
        result = result.filter(car => car.is_available === false);
      }
      
      // Filtro por búsqueda (marca o modelo)
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase().trim();
        result = result.filter(car => 
          car.brand.toLowerCase().includes(term) ||
          car.model.toLowerCase().includes(term)
        );
      }
      
      setFilteredCars(result);
    };
    
    applyFilters();
  }, [cars, filter, searchTerm]);

  // Función para cambiar de página
  const handlePageChange = (url) => {
    if (url) {
      fetchCars(url);
    }
  };

  // Función para recargar la lista completa
  const handleRefresh = () => {
    fetchCars(API_BASE_URL);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Agencia de Carros</h1>
        <p>Encuentra el auto de tus sueños</p>
        <div className="header-buttons">
          <button 
            className={`nav-btn ${!showTheory ? 'active' : ''}`}
            onClick={() => setShowTheory(false)}
          >
            Inventario
          </button>
          <button 
            className={`nav-btn ${showTheory ? 'active' : ''}`}
            onClick={() => setShowTheory(true)}
          >
            Parte Teórica
          </button>
        </div>
      </header>

      <main className="main-content">
        {showTheory ? (
          <TheoryView />
        ) : (
          <>
            {/* Controles de filtro y búsqueda */}
            <div className="controls">
              <div className="controls-left">
                <FilterButtons filter={filter} onFilterChange={setFilter} />
              </div>
              <div className="controls-right">
                <SearchBar 
                  searchTerm={searchTerm} 
                  onSearchChange={setSearchTerm}
                  onRefresh={handleRefresh}
                />
              </div>
            </div>

            {/* Contador y estado de carga */}
            <div className="stats">
              <p className="total-cars">
                {filteredCars.length === 0 && !loading ? (
                  'No se encontraron carros'
                ) : (
                  `Mostrando ${filteredCars.length} carro${filteredCars.length !== 1 ? 's' : ''}`
                )}
              </p>
            </div>

            {/* Lista de carros */}
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Cargando carros...</p>
              </div>
            ) : error ? (
              <div className="error-message">
                <p> {error}</p>
                <button onClick={handleRefresh} className="btn btn-primary">
                  Reintentar
                </button>
              </div>
            ) : filteredCars.length === 0 ? (
              <EmptyState 
                message={searchTerm ? 'No se encontraron carros que coincidan con tu búsqueda' : 'No hay carros disponibles en este momento'}
              />
            ) : (
              <CarList cars={filteredCars} />
            )}

            {/* Paginación */}
            {!loading && cars.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                nextPage={nextPage}
                prevPage={prevPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>

     
    </div>
  );
}

export default App;