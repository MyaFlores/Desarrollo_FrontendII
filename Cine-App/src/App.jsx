import { useState } from 'react'
import './App.css'
import { moviesData } from './data/MovieData'
import MovieGallery from './components/MovieGallery'
import ClienteForm from './components/ClienteForm'
import Ticket from './components/Ticket'

function App() {
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [compraActual, setCompraActual] = useState(null);

  const handleSeleccionarPelicula = (pelicula) => {
    setPeliculaSeleccionada(pelicula);
    // Scroll suave al formulario
    document.querySelector('.form-container')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLimpiarSeleccion = () => {
    setPeliculaSeleccionada(null);
  };

  const handleRegistrarCompra = (datosCompra) => {
    setCompraActual(datosCompra);
    setPeliculaSeleccionada(null);
  };

  const handleCerrarTicket = () => {
    setCompraActual(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>CINEPOLIS</h1>
        <p>La magia del cine</p>
      </header>

      <main>
        {/* Galería de películas */}
        <MovieGallery 
          peliculas={moviesData} 
          onSeleccionarPelicula={handleSeleccionarPelicula}
        />

        {/* Formulario de cliente */}
        <ClienteForm 
          onRegistrarCompra={handleRegistrarCompra}
          peliculaSeleccionada={peliculaSeleccionada}
          limpiarSeleccion={handleLimpiarSeleccion}
        />

        {/* Ticket de compra */}
        {compraActual && (
          <Ticket compra={compraActual} onCerrar={handleCerrarTicket} />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 Cinepolis - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default App