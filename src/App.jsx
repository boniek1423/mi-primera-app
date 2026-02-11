import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import './App.css'; // Asegúrate de tener este import para los estilos del modal

function App() {
  const [carritoCount, setCarritoCount] = useState(0);
  // Nuevo estado para controlar la visibilidad del modal
  const [esModalAbierto, setEsModalAbierto] = useState(false);

  const agregarAlCarrito = () => {
    setCarritoCount(carritoCount + 1);
  };

  // Función para abrir y cerrar el modal
  const toggleModal = () => {
    setEsModalAbierto(!esModalAbierto);
  };

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Pasamos la cuenta y la función para abrir el modal al Navbar */}
        <Navbar cuenta={carritoCount} alClickCarrito={toggleModal} />
        
        <main style={{ flex: 1, marginTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Inicio alClickComprar={agregarAlCarrito} />} />
            <Route path="/productos" element={<Productos alClickComprar={agregarAlCarrito} />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>

        {/* --- LÓGICA DEL MODAL --- */}
        {esModalAbierto && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>🛒 Tu Carrito</h2>
              <hr />
              <p style={{ margin: '20px 0' }}>
                Tienes <strong>{carritoCount}</strong> productos seleccionados.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="btn-secundario" onClick={toggleModal}>Continuar comprando</button>
                <button className="btn-primario" onClick={() => alert('¡Gracias por tu compra!')}>Finalizar Compra</button>
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