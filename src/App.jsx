import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; // <--- 1. Importamos useEffect
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import './App.css';

function App() {
  // 2. Modificamos el useState para que cargue lo que haya en la memoria al iniciar
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito_v1');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const [esModalAbierto, setEsModalAbierto] = useState(false);
  const [animarCarrito, setAnimarCarrito] = useState(false);

  // 3. Este useEffect guarda el carrito automáticamente cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito_v1', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    setAnimarCarrito(true);
    setTimeout(() => {
      setAnimarCarrito(false);
    }, 300);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const eliminarDelCarrito = (indiceAEliminar) => {
    const nuevoCarrito = carrito.filter((_, index) => index !== indiceAEliminar);
    setCarrito(nuevoCarrito);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const precioNum = Number(item.precio.replace('$', ''));
      return total + precioNum;
    }, 0);
  };

  const toggleModal = () => setEsModalAbierto(!esModalAbierto);

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar 
          cuenta={carrito.length} 
          alClickCarrito={toggleModal} 
          debeAnimar={animarCarrito} 
        />
        
        <main style={{ flex: 1, marginTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Inicio alClickComprar={agregarAlCarrito} />} />
            <Route path="/productos" element={<Productos alClickComprar={agregarAlCarrito} />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>

        {esModalAbierto && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>🛒 Tu Carrito</h2>
              <hr />
              
              {carrito.length === 0 ? (
                <p style={{ padding: '20px' }}>El carrito está vacío 😢</p>
              ) : (
                <>
                  <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', maxHeight: '250px', overflowY: 'auto' }}>
                    {carrito.map((item, index) => (
                      <li key={index} style={{ borderBottom: '1px solid #444', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span>{item.nombre}</span>
                          <strong style={{ marginLeft: '10px', color: '#535bf2' }}>{item.precio}</strong>
                        </div>
                        <button 
                          onClick={() => eliminarDelCarrito(index)}
                          style={{ background: 'none', border: 'none', color: '#ff4757', cursor: 'pointer', fontSize: '1.2rem' }}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: '20px', padding: '10px', borderTop: '2px solid #535bf2', textAlign: 'right' }}>
                    <h3>Total: <span style={{ color: '#535bf2' }}>${calcularTotal()}</span></h3>
                  </div>
                </>
              )}

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {carrito.length > 0 && (
                  <button className="btn-primario" onClick={() => alert('¡Compra procesada con éxito!')}>Finalizar Compra</button>
                )}
                <button className="btn-vaciar" onClick={vaciarCarrito}>Vaciar Carrito</button>
                <button className="btn-secundario" onClick={toggleModal}>Cerrar</button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;