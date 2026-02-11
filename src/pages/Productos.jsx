import { useState } from 'react';
import Card from '../components/Card';

const MIS_PRODUCTOS = [
  { id: 1, titulo: "Laptop Pro", precio: 1200, categoria: "Computación", desc: "Potente laptop para diseño y desarrollo con 16GB RAM.", img: "https://picsum.photos/400/300?random=1" },
  { id: 2, titulo: "Smartphone X", precio: 800, categoria: "Celulares", desc: "Cámara de 108MP y pantalla OLED de 120Hz.", img: "https://picsum.photos/400/300?random=2" },
  { id: 3, titulo: "Audífonos Hi-Fi", precio: 250, categoria: "Audio", desc: "Cancelación de ruido activa y sonido espacial.", img: "https://picsum.photos/400/300?random=3" },
  { id: 4, titulo: "Monitor 4K", precio: 450, categoria: "Computación", desc: "Panel IPS con colores precisos para fotografía.", img: "https://picsum.photos/400/300?random=4" },
  { id: 5, titulo: "Cámara DSLR", precio: 950, categoria: "Fotografía", desc: "Sensor full frame para calidad profesional.", img: "https://picsum.photos/400/300?random=5" },
];

export default function Productos() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSel, setCategoriaSel] = useState('Todos');
  const [precioMax, setPrecioMax] = useState(1200);
  const [productoEnVista, setProductoEnVista] = useState(null);

  const categorias = ['Todos', ...new Set(MIS_PRODUCTOS.map(p => p.categoria))];

  const productosFiltrados = MIS_PRODUCTOS.filter(prod => {
    const coincideNombre = prod.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoriaSel === 'Todos' || prod.categoria === categoriaSel;
    const coincidePrecio = prod.precio <= precioMax;
    return coincideNombre && coincideCat && coincidePrecio;
  });

  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Nuestra Colección</h1>

      {/* --- PANEL DE FILTROS --- */}
      <div style={{ maxWidth: '800px', margin: '0 auto 40px auto', textAlign: 'center' }}>
        <input 
          type="text" 
          placeholder="🔍 Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={estiloInput}
        />

        <div style={{ margin: '20px 0' }}>
          <label>Precio máximo: <strong>${precioMax}</strong></label>
          <input 
            type="range" min="0" max="1200" step="50"
            value={precioMax} 
            onChange={(e) => setPrecioMax(Number(e.target.value))}
            style={{ width: '100%', display: 'block', margin: '10px auto', accentColor: '#535bf2' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaSel(cat)}
              style={{
                ...estiloBoton,
                backgroundColor: categoriaSel === cat ? '#535bf2' : 'transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRID DE PRODUCTOS --- */}
      <div style={gridEstilo}>
        {productosFiltrados.map(prod => (
          <div key={prod.id} onClick={() => setProductoEnVista(prod)} style={{ cursor: 'zoom-in' }}>
            <Card titulo={prod.titulo} precio={prod.precio} imagen={prod.img} />
          </div>
        ))}
      </div>

      {/* --- MODAL DE VISTA RÁPIDA --- */}
      {productoEnVista && (
        <div style={overlayEstilo} onClick={() => setProductoEnVista(null)}>
          <div style={modalEstilo} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setProductoEnVista(null)} style={botonCerrar}>×</button>
            
            <div style={layoutModal}>
              <img src={productoEnVista.img} alt={productoEnVista.titulo} style={imgModal} />
              <div style={infoModal}>
                <span style={{ color: '#535bf2', fontWeight: 'bold' }}>{productoEnVista.categoria}</span>
                <h2>{productoEnVista.titulo}</h2>
                <p>{productoEnVista.desc}</p>
                <h3 style={{ fontSize: '2rem' }}>${productoEnVista.precio}</h3>
                <button style={btnCompra}>Añadir al Carrito</button>
              </div>
            </div>

            {/* PRODUCTOS RELACIONADOS */}
            <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
              <h4>Relacionados:</h4>
              <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', padding: '10px 0' }}>
                {MIS_PRODUCTOS
                  .filter(p => p.categoria === productoEnVista.categoria && p.id !== productoEnVista.id)
                  .map(rel => (
                    <div key={rel.id} onClick={() => setProductoEnVista(rel)} style={cardRelStyle}>
                      <img src={rel.img} alt={rel.titulo} style={imgRelStyle} />
                      <p style={{ margin: 0, fontSize: '0.8rem' }}>{rel.titulo}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- ESTILOS ADICIONALES ---
const estiloInput = { padding: '12px 20px', width: '100%', maxWidth: '400px', borderRadius: '25px', border: '1px solid #535bf2', background: '#1a1a1a', color: 'white' };
const estiloBoton = { padding: '8px 16px', borderRadius: '20px', border: '1px solid #535bf2', cursor: 'pointer', color: 'white', transition: '0.3s' };
const overlayEstilo = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalEstilo = { background: '#1a1a1a', padding: '30px', borderRadius: '15px', position: 'relative', maxWidth: '700px', width: '90%', color: 'white', border: '1px solid #333' };
const layoutModal = { display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' };
const imgModal = { width: '280px', borderRadius: '10px', objectFit: 'cover' };
const infoModal = { flex: 1, textAlign: 'left' };
const botonCerrar = { position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' };
const btnCompra = { background: '#535bf2', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: 'bold' };
const gridEstilo = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' };
const cardRelStyle = { minWidth: '120px', textAlign: 'center', cursor: 'pointer', background: '#252525', padding: '10px', borderRadius: '8px' };
const imgRelStyle = { width: '100%', height: '70px', objectFit: 'cover', borderRadius: '5px', marginBottom: '5px' };