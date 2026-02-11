import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import './App.css';

function App() {
  // 1. Ahora el carrito es una LISTA (Array)
  const [carrito, setCarrito] = useState([]);
  const [esModalAbierto, setEsModalAbierto] = useState(false);

  // 2. Función para agregar el objeto completo del producto
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // 3. Función para resetear el array
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const toggleModal = () => setEsModalAbierto(!esModalAbierto);

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Pasamos el largo del array al Navbar */}
        <Navbar cuenta={carrito.length} alClickCarrito={toggleModal} />
        
        <main style={{ flex: 1, marginTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Inicio alClickComprar={agregarAlCarrito} />} />
            <Route path="/productos" element={<Productos alClickComprar={agregarAlCarrito} />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>

        {/* --- MODAL DINÁMICO --- */}
        {esModalAbierto && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>🛒 Tu Carrito</h2>
              <hr />
              
              {carrito.length === 0 ? (
                <p>El carrito está vacío 😢</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', maxHeight: '200px', overflowY: 'auto' }}>
                  {carrito.map((item, index) => (
                    <li key={index} style={{ borderBottom: '1px solid #444', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{item.nombre}</span>
                      <strong>{item.precio}</strong>
                    </li>
                  ))}
                </ul>
              )}

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button className="btn-primario" onClick={() => alert('Compra procesada')}>Finalizar Compra</button>
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