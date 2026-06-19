import { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import FilterButtons from './components/FilterButtons';
import './App.css';

function App() {
  // Estado para la lista de estudiantes
  const [students, setStudents] = useState([]);
  
  // Estado para el filtro (All, Passed, Failed)
  const [filter, setFilter] = useState('All');

  // Función para agregar un nuevo estudiante
  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  // Función para eliminar un estudiante por ID
  const deleteStudent = (id) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );
    setStudents(updatedStudents);
  };

  // Calcular el promedio general
  const calculateAverage = () => {
    if (students.length === 0) return 0;
    const total = students.reduce((sum, student) => sum + student.grade, 0);
    return total / students.length;
  };

  // Filtrar estudiantes según el filtro seleccionado
  const getFilteredStudents = () => {
    if (filter === 'All') return students;
    if (filter === 'Passed') {
      return students.filter(student => student.grade >= 60);
    }
    if (filter === 'Failed') {
      return students.filter(student => student.grade < 60);
    }
    return students;
  };

  const filteredStudents = getFilteredStudents();
  const average = calculateAverage();

  return (
    <div className="app">
      <header className="header">
        <h1>Student Grade Manager</h1>
        <p>Administra las calificaciones de tus estudiantes</p>
      </header>

      <main className="main-content">
        {/* Formulario para agregar estudiantes */}
        <StudentForm onAddStudent={addStudent} />

        {/* Estadísticas */}
        <div className="stats-container">
          <div className="stat-card">
            <div>
              <p className="stat-label">Total de estudiantes</p>
              <p className="stat-value">{students.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div>
              <p className="stat-label">Promedio general</p>
              <p className="stat-value">{average.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Botones de filtro */}
        <FilterButtons filter={filter} onFilterChange={setFilter} />

        {/* Lista de estudiantes */}
        <StudentList 
          students={filteredStudents} 
          onDeleteStudent={deleteStudent}
        />
      </main>

      
    </div>
  );
}

export default App;