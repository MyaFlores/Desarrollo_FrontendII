import StudentCard from './StudentCard';

function StudentList({ students, onDeleteStudent }) {
  // Validación 3: Mostrar mensaje si no hay estudiantes
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <h3>No hay estudiantes registrados</h3>
        <p>Agrega tu primer estudiante usando el formulario</p>
      </div>
    );
  }

  return (
    <div className="students-grid">
      {students.map((student) => (
        <StudentCard 
          key={student.id} 
          student={student} 
          onDelete={onDeleteStudent}
        />
      ))}
    </div>
  );
}

export default StudentList;