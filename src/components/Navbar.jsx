import { Link } from 'react-router-dom'; // 1. Importar Link
import './Navbar.css';

function Navbar() {
  const enlaces = [
    { nombre: 'Inicio', ruta: '/' },
    { nombre: 'Productos', ruta: '/productos' },
    { nombre: 'Contacto', ruta: '/contacto' }
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}><h2>Mi Logo</h2></Link>
      </div>
      <ul className="nav-links">
        {enlaces.map((enlace, index) => (
          <li key={index}>
            {/* 2. Cambiar <a> por <Link> y 'href' por 'to' */}
            <Link to={enlace.ruta}>{enlace.nombre}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;