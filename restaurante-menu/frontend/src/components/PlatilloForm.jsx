import { useState, useEffect } from 'react';

function PlatilloForm({ platilloToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'Entrada',
    precio: '',
    disponible: true,
    imagen_url: ''
  });

  const [errors, setErrors] = useState({});

  const categorias = ['Entrada', 'Plato Principal', 'Postre', 'Bebida', 'Guarnición'];

  useEffect(() => {
    if (platilloToEdit) {
      setFormData({
        nombre: platilloToEdit.nombre,
        descripcion: platilloToEdit.descripcion,
        categoria: platilloToEdit.categoria,
        precio: platilloToEdit.precio,
        disponible: platilloToEdit.disponible,
        imagen_url: platilloToEdit.imagen_url || ''
      });
    }
  }, [platilloToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es obligatoria';
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      newErrors.precio = 'El precio debe ser mayor a 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        precio: parseFloat(formData.precio)
      });
    }
  };

  return (
    <div className="form-overlay" onClick={onCancel}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <h2>{platilloToEdit ? 'Editar Platillo' : 'Nuevo Platillo'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del platillo:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Pasta Alfredo"
            />
            {errors.nombre && <span className="error">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe el platillo..."
              rows="3"
            />
            {errors.descripcion && <span className="error">{errors.descripcion}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoría:</label>
              <select name="categoria" value={formData.categoria} onChange={handleChange}>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Precio ($):</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.precio && <span className="error">{errors.precio}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>URL de la imagen:</label>
            <input
              type="url"
              name="imagen_url"
              value={formData.imagen_url}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="disponible"
                checked={formData.disponible}
                onChange={handleChange}
              />
              Disponible
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {platilloToEdit ? 'Actualizar' : 'Agregar'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlatilloForm;