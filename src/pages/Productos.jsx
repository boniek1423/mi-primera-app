import { useState } from 'react';
import Card from '../components/Card';

const MIS_PRODUCTOS = [
  { id: 1, titulo: "Laptop Pro", precio: 1200, categoria: "Computación", desc: "Potente laptop para diseño y desarrollo con 16GB RAM.", img: "https://picsum.photos/400/300?random=1" },
  { id: 2, titulo: "Smartphone X", precio: 800, categoria: "Celulares", desc: "Cámara de 108MP y pantalla OLED de 120Hz.", img: "https://picsum.photos/400/300?random=2" },
  { id: 3, titulo: "Audífonos Hi-Fi", precio: 250, categoria: "Audio", desc: "Cancelación de ruido activa y sonido espacial.", img: "https://picsum.photos/400/300?random=3" },
  { id: 4, titulo: "Monitor 4K", precio: 450, categoria: "Computación", desc: "Panel IPS con colores precisos para fotografía.", img: "https://picsum.photos/400/300?random=4" },
];

export default function Productos() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSel, setCategoriaSel] = useState('Todos');
  const [precioMax, setPrecioMax] = useState(1200);
  
  // ESTADO PARA EL MODAL DE DETALLE
  const [productoEnVista, setProductoEnVista] = useState(null);

  const productosFiltrados = MIS_PRODUCTOS.filter(prod => {
    const coincideNombre = prod.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoriaSel === 'Todos' || prod.categoria === categoriaSel;
    const coincidePrecio = prod.precio <= precioMax;
    return coincideNombre && coincideCat && coincidePrecio;
  });

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ textAlign: 'center' }}>Nuestra Colección</h1>

      {/* ... (Aquí irían tus inputs de búsqueda y filtros que ya tenemos) ... */}

      <div style={gridEstilo}>
        {productosFiltrados.map(prod => (
          <div key={prod.id} onClick={() => setProductoEnVista(prod)} style={{ cursor: 'zoom-in' }}>
            <Card titulo={prod.titulo} precio={prod.precio} imagen={prod.img} />
          </div>
        ))}
      </div>

      {/* --- MODAL DE VISTA RÁPIDA --- */}
      {productoEnVista && (
        <div className="modal-overlay" onClick={() => setProductoEnVista(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={modalEstilo}>
            <button onClick={() => setProductoEnVista(null)} style={botonCerrar}>×</button>
            
            <div style={layoutModal}>
              <img src={productoEnVista.img} alt={productoEnVista.titulo} style={imgModal} />
              <div style={infoModal}>
                <span style={{ color: '#535bf2', fontWeight: 'bold' }}>{productoEnVista.categoria}</span>
                <h2>{productoEnVista.titulo}</h2>
                <p>{productoEnVista.desc}</p>
                <h3 style={{ fontSize: '2rem' }}>${productoEnVista.precio}</h3>
                <button className="btn-primario" style={{ width: '100%' }}>
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ESTILOS EN LÍNEA PARA EL MODAL
const gridEstilo = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '40px auto' };
const modalEstilo = { background: '#1a1a1a', padding: '30px', borderRadius: '15px', position: 'relative', maxWidth: '700px', width: '90%', color: 'white' };
const layoutModal = { display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' };
const imgModal = { width: '300px', borderRadius: '10px', objectFit: 'cover' };
const infoModal = { flex: 1, textAlign: 'left' };
const botonCerrar = { position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' };