import { useState } from 'react';
import './App.css';

function App() {
  // Variables declaradas
  const nombreCafe = "Latte";
  const precioBase = 6;
  const porcentajeImpuesto = 0.16; // 16% de impuesto
  const porcentajeDescuento = 0.10; // 10% de descuentoS

  // useState para datos dinámicos (modificar el estado de un componente y nos permita manipular la variable y se actualice en la interfaz)
  const [nombreCliente, setNombreCliente] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [mensajePedido, setMensajePedido] = useState('');

  // Cálculos dinámicos
  const impuesto = precioBase * porcentajeImpuesto;
  const descuento = precioBase * porcentajeDescuento;
  const totalUnitario = precioBase + impuesto - descuento;
  const totalFinal = totalUnitario * cantidad;

  // Manejadores de eventos
  const handleRealizarPedido = () => {
    if (nombreCliente.trim() === '') {
      setMensajePedido('Por favor, ingresa tu nombre antes de realizar el pedido');
    } else if (cantidad < 1) {
      setMensajePedido('La cantidad debe ser al menos 1');
    } else {
      setMensajePedido(`Pedido realizado con éxito ${cantidad} ${nombreCafe}(s) para ${nombreCliente}`);
    }
  };

  const handleMostrarResumen = () => {
    if (nombreCliente.trim() === '') {
      alert('Por favor, ingresa tu nombre primero');
      return;
    }
    setMostrarResumen(true);
  };

  return (
    // Requisito #10: Un solo elemento padre
    <div className="container">
      <h1 className="title">Cafetería "Bobby"</h1>
      
      {/* Sección 1: Información del cliente*/}
      <div className="section">
        <h2>Informacion del cliente</h2>
        <label>Nombre del cliente:</label>
        <input
          type="text"
          className="input-field"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
          placeholder="Ej: Juan Pérez"
        />
        <label>Cantidad de cafes:</label>
          <input
            type="number"
            className="input-field"
            value={cantidad}
            onChange={(e) => {
               const valor = e.target.value;
               if (valor === '') {
               setCantidad('');
               } else {
               setCantidad(Number(valor));
            }
          }}
               onBlur={() => {
               if (cantidad === '') {
                setCantidad(1);
           }
        }}
            min="1"
          />
      </div>

      {/* Sección 2: Información del pedido*/}
      <div className="section">
        <h2>Informacion del pedido</h2>
        {/* Mostrar variables con {} (requisito #4) */}
        <p><strong>Cafe:</strong> {nombreCafe}</p>
        <p><strong>Precio base:</strong> ${precioBase}</p>
        <p><strong>Impuesto (16%):</strong> ${impuesto.toFixed(2)}</p>
        <p><strong>Descuento (10%):</strong> ${descuento.toFixed(2)}</p>
        <p><strong>Precio unitario final:</strong> ${totalUnitario.toFixed(2)}</p>
        <p><strong>Cantidad:</strong> {cantidad}</p>
        <p><strong>Total a pagar:</strong> <span className="total">${totalFinal.toFixed(2)}</span></p>
        
        {/* Renderizado condicional */}
        {cantidad > 5 ? (
          <p className="descuento-mensaje">Descuento por compra mayorista aplicado</p>
        ) : (
          <p className="normal-mensaje">Pedido regular</p>
        )}
      </div>

      {/* Sección 3: Resumen de compra */}
      <div className="section">
        <h2>Resumen de Compra</h2>
        {mostrarResumen && nombreCliente ? (
          <div className="resumen">
            <p> Gracias por tu compra, <strong>{nombreCliente}</strong></p>
            <p>Has pedido {cantidad} {nombreCafe}(s) por un total de <strong>${totalFinal.toFixed(2)}</strong></p>
          </div>
        ) : (
          <p className="placeholder-text">Haz clic en "Mostrar resumen" para ver tu pedido</p>
        )}
      </div>

      {/* Botones */}
      <div className="button-group">
        <button className="button button-primary" onClick={handleRealizarPedido}> Realizar pedido </button>
        <button className="button button-secondary" onClick={handleMostrarResumen}> Mostrar resumen </button>
        <button className="button button-primary" onClick={() => {
          setNombreCliente('');
          setCantidad(0);
          setMostrarResumen(false);
          setMensajePedido('');
        }}>
          Reiniciar
        </button>
      </div>

      {/* Mensaje de confirmación del pedido */}
      {mensajePedido && (
        <div className="mensaje-pedido">
          {mensajePedido}
        </div>
      )}
    </div>
  );
}

export default App;