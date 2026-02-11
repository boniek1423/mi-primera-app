import Card from '../components/Card';

const MIS_PRODUCTOS = [
  { id: 1, titulo: "Laptop Pro", precio: "1200", img: "https://picsum.photos/400/300?random=1" },
  { id: 2, titulo: "Smartphone X", precio: "800", img: "https://picsum.photos/400/300?random=2" },
  { id: 3, titulo: "Audífonos Hi-Fi", precio: "250", img: "https://picsum.photos/400/300?random=3" },
  { id: 4, titulo: "Monitor 4K", precio: "450", img: "https://picsum.photos/400/300?random=4" },
];

export default function Productos() {
  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Nuestra Colección</h1>
      
      {/* Contenedor Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {MIS_PRODUCTOS.map(prod => (
          <Card 
            key={prod.id} 
            titulo={prod.titulo} 
            precio={prod.precio} 
            imagen={prod.img} 
          />
        ))}
      </div>
    </div>
  );
}