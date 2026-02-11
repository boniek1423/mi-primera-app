import React from 'react';

function Inicio({ alClickComprar }) {
  const productos = [
    { id: 1, nombre: "Laptop Pro", precio: "$1200", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" },
    { id: 2, nombre: "Smartphone X", precio: "$800", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" },
    { id: 3, nombre: "Audífonos Hi-Fi", precio: "$250", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 4, nombre: "Monitor 4K", precio: "$450", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500" }
  ];

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: 'white', marginBottom: '30px' }}>Nuestra Colección</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        padding: '20px' 
      }}>
        {productos.map((prod) => (
          <div key={prod.id} className="product-card" style={{
            border: '1px solid #333',
            borderRadius: '12px',
            padding: '15px',
            background: '#1a1a1a',
            color: 'white',
            transition: 'transform 0.2s'
          }}>
            <img src={prod.img} alt={prod.nombre} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
            <h3 style={{ margin: '15px 0 10px' }}>{prod.nombre}</h3>
            <p style={{ color: '#535bf2', fontWeight: 'bold', fontSize: '1.2rem' }}>{prod.precio}</p>
            
            <button 
              /* AQUÍ EL CAMBIO: Usamos una función anónima para pasar 'prod' */
              onClick={() => alClickComprar(prod)} 
              className="btn-ver-mas"
              style={{
                backgroundColor: '#535bf2',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '100%',
                fontWeight: 'bold',
                marginTop: '10px'
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