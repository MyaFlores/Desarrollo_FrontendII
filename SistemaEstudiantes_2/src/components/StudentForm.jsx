import { useState } from 'react';

function StudentForm({ onAddStudent }) {
  // Estados para cada campo del formulario
  const [name, setName] = useState('');
  const [course, setCourse] = useState('React');
  const [grade, setGrade] = useState('');
  
  // Estados para mensajes de error
  const [errors, setErrors] = useState({});

  // Opciones para el select de cursos
  const courses = ['React', 'JavaScript', 'HTML/CSS', 'Node.js', 'Python'];

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {};

    // Validación 1: Nombre no vacío
    if (name.trim() === '') {
      newErrors.name = 'El nombre del estudiante es obligatorio';
    }

    // Validación 2: Calificación entre 0 y 100
    const gradeNumber = Number(grade);
    if (grade === '') {
      newErrors.grade = 'La calificación es obligatoria';
    } else if (isNaN(gradeNumber)) {
      newErrors.grade = 'Ingresa un número válido';
    } else if (gradeNumber < 0 || gradeNumber > 100) {
      newErrors.grade = 'La calificación debe estar entre 0 y 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar antes de agregar
    if (!validateForm()) {
      return;
    }

    // Crear nuevo estudiante
    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      course: course,
      grade: Number(grade)
    };

    // Agregar estudiante
    onAddStudent(newStudent);
    
    // Limpiar el formulario
    setName('');
    setGrade('');
    setErrors({});
  };

  return (
    <div className="form-container">
      <h2>Registrar un estudiante</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del estudiante:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Ana García"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Curso:</label>
          <select 
            value={course} 
            onChange={(e) => setCourse(e.target.value)}
            className="form-input"
          >
            {courses.map((courseOption) => (
              <option key={courseOption} value={courseOption}>
                {courseOption}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Calificación (0-100):</label>
          <input
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Ej: 95"
            min="0"
            max="100"
            className={`form-input ${errors.grade ? 'input-error' : ''}`}
          />
          {errors.grade && <span className="error-message">{errors.grade}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar Estudiante
        </button>
      </form>
    </div>
  );
}

export default StudentForm;