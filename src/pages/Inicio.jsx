import React from 'react';

function Inicio({ alClickComprar }) {
  // 1. Creamos una lista de productos (esto podría venir de una base de datos luego)
  const productos = [
    { id: 1, nombre: "Laptop Pro", precio: "$1200", img: "https://via.placeholder.com/150" },
    { id: 2, nombre: "Smartphone X", precio: "$800", img: "https://via.placeholder.com/150" },
    { id: 3, nombre: "Audífonos Hi-Fi", precio: "$250", img: "https://via.placeholder.com/150" },
    { id: 4, nombre: "Monitor 4K", precio: "$450", img: "https://via.placeholder.com/150" }
  ];

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Nuestra Colección</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        padding: '20px' 
      }}>
        {/* 2. Usamos .map() para dibujar todos los productos automáticamente */}
        {productos.map((prod) => (
          <div key={prod.id} className="product-card" style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '15px',
            background: '#1a1a1a', // Color oscuro como tu diseño
            color: 'white'
          }}>
            <img src={prod.img} alt={prod.nombre} style={{ width: '100%', borderRadius: '8px' }} />
            <h3>{prod.nombre}</h3>
            <p style={{ color: '#535bf2', fontWeight: 'bold' }}>{prod.precio}</p>
            
            {/* 3. El botón mágico conectado al carrito */}
            <button 
              onClick={alClickComprar} 
              className="btn-ver-mas"
              style={{
                backgroundColor: '#535bf2',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inicio;