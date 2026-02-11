import { Link } from 'react-router-dom';
import './Navbar.css';

// 1. AHORA RECIBIMOS: cuenta, alClickCarrito y debeAnimar
function Navbar({ cuenta, alClickCarrito, debeAnimar }) {
  const enlaces = [
    { nombre: 'Inicio', ruta: '/' },
    { nombre: 'Productos', ruta: '/productos' },
    { nombre: 'Contacto', ruta: '/contacto' }
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <h2>Mi Logo</h2>
        </Link>
      </div>
      
      <ul className="nav-links">
        {enlaces.map((enlace, index) => (
          <li key={index}>
            <Link to={enlace.ruta}>{enlace.nombre}</Link>
          </li>
        ))}

        {/* 2. CLASE DINÁMICA: Si debeAnimar es true, se añade 'animacion-salto' */}
        <li 
          className={`cart-container ${debeAnimar ? 'animacion-salto' : ''}`} 
          onClick={alClickCarrito} 
          style={{ cursor: 'pointer' }}
          title="Ver carrito"
        >
          <span style={{ fontSize: '1.5rem' }}>🛒</span>
          {cuenta > 0 && <span className="cart-badge">{cuenta}</span>}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;