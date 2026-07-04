import CarCard from './CarCard';

function CarList({ cars }) {
  return (
    <div className="cars-grid">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default CarList;