import { useState } from 'react';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import './App.css';

function App() {
  const [reservations, setReservations] = useState([]);

  const addReservation = (newReservation) => {
    setReservations([...reservations, newReservation]);
  };

  const deleteReservation = (id) => {
    const updatedReservations = reservations.filter(
      (reservation) => reservation.id !== id
    );
    setReservations(updatedReservations);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Restaurante con React</h1>
        <p>Administra las reservaciones de un restaurante</p>
      </header>

      <main className="main-content">
        <ReservationForm onAddReservation={addReservation} />

        <div className="stats">
          <p className="total-reservations">
            Total de reservaciones: {reservations.length}
          </p>
        </div>

        <ReservationList 
          reservations={reservations} 
          onDeleteReservation={deleteReservation}
        />
      </main>
    </div>
  );
}

export default App;