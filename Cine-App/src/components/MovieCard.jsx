import { useState } from 'react';

function MovieCard({ pelicula, onSeleccionar }) {
  const [mostrarInfo, setMostrarInfo] = useState(false);

  return (
    <div 
      className="movie-card"
      onMouseEnter={() => setMostrarInfo(true)}
      onMouseLeave={() => setMostrarInfo(false)}
      onClick={() => onSeleccionar(pelicula)}
    >
      {!mostrarInfo ? (
        // Mostrar imagen
        <div className="movie-image">
          <img src={pelicula.imagen} alt={pelicula.titulo} />
          <div className="movie-overlay">
            <h3>{pelicula.titulo}</h3>
          </div>
        </div>
      ) : (
        // Mostrar información al hacer hover
        <div className="movie-info-hover">
          <h3>{pelicula.titulo}</h3>
          <p><strong>Genero:</strong> {pelicula.genero}</p>
          <p><strong>Duracion:</strong> {pelicula.duracion}</p>
          <p><strong>Clasificacion:</strong> {pelicula.clasificacion}</p>
          <p><strong>Idioma:</strong> {pelicula.idioma}</p>
          <p><strong>Precio:</strong> ${pelicula.precio}</p>
          <p><strong>Horarios:</strong> {pelicula.horarios.join(' | ')}</p>
          <p className="sinopsis"><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
          <button className="select-btn">Seleccionar</button>
        </div>
      )}
    </div>
  );
}

export default MovieCard;