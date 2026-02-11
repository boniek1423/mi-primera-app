import { useState } from 'react';
import Card from '../components/Card';

const MIS_PRODUCTOS = [
  { id: 1, titulo: "Laptop Pro", precio: "1200", categoria: "Computación", img: "https://picsum.photos/400/300?random=1" },
  { id: 2, titulo: "Smartphone X", precio: "800", categoria: "Celulares", img: "https://picsum.photos/400/300?random=2" },
  { id: 3, titulo: "Audífonos Hi-Fi", precio: "250", categoria: "Audio", img: "https://picsum.photos/400/300?random=3" },
  { id: 4, titulo: "Monitor 4K", precio: "450", categoria: "Computación", img: "https://picsum.photos/400/300?random=4" },
  { id: 5, titulo: "Cámara DSLR", precio: "950", categoria: "Fotografía", img: "https://picsum.photos/400/300?random=5" },
];

export default function Productos() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSel, setCategoriaSel] = useState('Todos');

  // Listado de categorías únicas extraídas de los productos
  const categorias = ['Todos', ...new Set(MIS_PRODUCTOS.map(p => p.categoria))];

  // Lógica de filtrado combinada (Nombre + Categoría)
  const productosFiltrados = MIS_PRODUCTOS.filter(prod => {
    const coincideNombre = prod.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoriaSel === 'Todos' || prod.categoria === categoriaSel;
    return coincideNombre && coincideCat;
  });

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Nuestra Colección</h1>

      {/* --- SECCIÓN DE FILTROS --- */}
      <div style={{ maxWidth: '800px', margin: '0 auto 40px auto', textAlign: 'center' }}>
        <input 
          type="text" 
          placeholder="🔍 Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: '12px 20px',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '25px',
            border: '1px solid #535bf2',
            background: '#1a1a1a',
            color: 'white',
            marginBottom: '20px'
          }}
        />

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaSel(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #535bf2',
                cursor: 'pointer',
                backgroundColor: categoriaSel === cat ? '#535bf2' : 'transparent',
                color: 'white',
                transition: '0.3s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRID DE PRODUCTOS --- */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(prod => (
            <Card 
              key={prod.id} 
              titulo={prod.titulo} 
              precio={prod.precio} 
              imagen={prod.img} 
            />
          ))
        ) : (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888' }}>
            No se encontraron productos con esos filtros 😢
          </p>
        )}
      </div>
    </div>
  );
}