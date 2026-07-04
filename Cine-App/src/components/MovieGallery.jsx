import MovieCard from './MovieCard';

function MovieGallery({ peliculas, onSeleccionarPelicula }) {
  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Caretelera</h2>
      <div className="gallery-horizontal">
        {peliculas.map((pelicula) => (
          <MovieCard 
            key={pelicula.id} 
            pelicula={pelicula} 
            onSeleccionar={onSeleccionarPelicula}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieGallery;