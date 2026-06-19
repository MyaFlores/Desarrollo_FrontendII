function StudentCard({ student, onDelete }) {
  // Determinar si el estudiante aprobó o reprobó (60 es la calificación mínima)
  const passed = student.grade >= 60;

  // Obtener la clase CSS según el estado
  const getStatusClass = () => {
    return passed ? 'status-passed' : 'status-failed';
  };

  // Obtener el color del borde según la calificación
  const getCardBorder = () => {
    if (student.grade >= 90) return 'border-excellent';
    if (student.grade >= 70) return 'border-good';
    if (student.grade >= 60) return 'border-passed';
    return 'border-failed';
  };

  return (
    <div className={`student-card ${getCardBorder()}`}>
      <div className="card-header">
        <div className="student-info">
         <h3 className="student-name">{student.name}</h3>
          <p className="course-tag">{student.course}</p>
        </div>
        <div className={`status-badge ${getStatusClass()}`}>
          {passed ? 'Aprobado' : 'Reprobado'}
        </div>
      </div>
      
      <div className="card-body">
        <div className="grade-display">
          <span className="grade-number">{student.grade}</span>
          <span className="grade-label">/ 100</span>
        </div>
        <div className="grade-bar">
          <div 
            className={`grade-bar-fill ${getStatusClass()}`}
            style={{ width: `${student.grade}%` }}
          ></div>
        </div>
      </div>
      
      <div className="card-footer">
        <button 
          onClick={() => onDelete(student.id)} 
          className="btn btn-danger"
        >
          Eliminar estudiante
        </button>
      </div>
    </div>
  );
}

export default StudentCard;