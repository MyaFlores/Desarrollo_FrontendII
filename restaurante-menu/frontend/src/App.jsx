import { useState, useEffect } from 'react';
import axios from 'axios';
import PlatilloList from './components/PlatilloList';
import PlatilloForm from './components/PlatilloForm';
import SearchBar from './components/SearchBar';
import FilterButtons from './components/FilterButtons';
import StatsCard from './components/StatsCard';
import './App.css';

function App() {
  const [platillos, setPlatillos] = useState([]);
  const [filteredPlatillos, setFilteredPlatillos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [platilloToEdit, setPlatilloToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [message, setMessage] = useState({ text: '', type: '' });

const API_URL = 'http://localhost:8000/api/platillos/';

  // Configurar filtros
  const filters = [
    { id: 'Todos', label: 'Todos' },
    { id: 'Disponibles', label: 'Disponibles' },
    { id: 'No Disponibles', label: 'No disponibles' },
  ];

const fetchPlatillos = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get(API_URL);
    console.log('Datos recibidos:', response.data);
    
    const platillosNormalizados = response.data.map(p => ({
      ...p,
      precio: parseFloat(p.precio) || 0,
      imagen_url: p.imagen_url || ''  // Si no hay imagen, string vacío
    }));
    
    console.log('Datos normalizados:', platillosNormalizados);
    setPlatillos(platillosNormalizados);
    setFilteredPlatillos(platillosNormalizados);
  } catch (err) {
    setError('Error al cargar los platillos');
    console.error('Error:', err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchPlatillos();
  }, []);

  // Aplicar filtros y búsqueda
  useEffect(() => {
    let result = [...platillos];

    // Filtro por disponibilidad
    if (activeFilter === 'Disponibles') {
      result = result.filter(p => p.disponible === true);
    } else if (activeFilter === 'No Disponibles') {
      result = result.filter(p => p.disponible === false);
    }

    // Búsqueda por nombre
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(p => p.nombre.toLowerCase().includes(term));
    }

    setFilteredPlatillos(result);
  }, [platillos, activeFilter, searchTerm]);

  // Mostrar mensaje temporal
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  // Agregar platillo
  const handleAddPlatillo = async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      setPlatillos([...platillos, response.data]);
      setShowForm(false);
      showMessage(`"${response.data.nombre}" agregado exitosamente`);
    } catch (err) {
      showMessage('Error al agregar el platillo', 'error');
      console.error('Error:', err);
    }
  };

  // Editar platillo
  const handleEditPlatillo = async (data) => {
    try {
      const response = await axios.put(`${API_URL}${platilloToEdit.id}/`, data);
      const updated = platillos.map(p => 
        p.id === platilloToEdit.id ? response.data : p
      );
      setPlatillos(updated);
      setShowForm(false);
      setPlatilloToEdit(null);
      showMessage(`"${response.data.nombre}" actualizado exitosamente`);
    } catch (err) {
      showMessage('Error al actualizar el platillo', 'error');
      console.error('Error:', err);
    }
  };

  // Eliminar platillo
  const handleDeletePlatillo = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      const updated = platillos.filter(p => p.id !== id);
      setPlatillos(updated);
      showMessage('Platillo eliminado exitosamente');
    } catch (err) {
      showMessage('Error al eliminar el platillo', 'error');
      console.error('Error:', err);
    }
  };

  // Cambiar disponibilidad
  const handleToggleAvailability = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}${id}/toggle_disponibilidad/`);
      const updated = platillos.map(p => 
        p.id === id ? response.data : p
      );
      setPlatillos(updated);
      const estado = response.data.disponible ? 'disponible' : 'no disponible';
      showMessage(`Estado cambiado a ${estado}`);
    } catch (err) {
      showMessage('Error al cambiar disponibilidad', 'error');
      console.error('Error:', err);
    }
  };

  // Abrir formulario para editar
  const handleEditClick = (platillo) => {
    setPlatilloToEdit(platillo);
    setShowForm(true);
  };

  // Cerrar formulario
  const handleCloseForm = () => {
    setShowForm(false);
    setPlatilloToEdit(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Administración de Menú</h1>
        <p>Gestiona los platillos de un restaurante</p>
      </header>

      <main className="main-content">
        {/* Mensajes */}
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Estadísticas */}
        <StatsCard platillos={platillos} />

        {/* Controles */}
        <div className="controls">
          <div className="controls-left">
            <FilterButtons
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
          <div className="controls-right">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onRefresh={fetchPlatillos}
            />
            <button className="btn btn-add" onClick={() => setShowForm(true)}>
               Nuevo Platillo
            </button>
          </div>
        </div>

        {/* Contador */}
        <div className="count">
          <p>Mostrando {filteredPlatillos.length} platillo{filteredPlatillos.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Lista de platillos */}
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Cargando platillos...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchPlatillos}>
              Reintentar
            </button>
          </div>
        ) : (
          <PlatilloList
            platillos={filteredPlatillos}
            onEdit={handleEditClick}
            onDelete={handleDeletePlatillo}
            onToggleAvailability={handleToggleAvailability}
          />
        )}
      </main>

      {/* Formulario modal */}
      {showForm && (
        <PlatilloForm
          platilloToEdit={platilloToEdit}
          onSave={platilloToEdit ? handleEditPlatillo : handleAddPlatillo}
          onCancel={handleCloseForm}
        />
      )}

      <footer className="footer">
        <p>Sistema de Administración de Restaurantes - React + Django</p>
      </footer>
    </div>
  );
}

export default App;