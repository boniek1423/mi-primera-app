import './Card.css';

export default function Card({ titulo, precio, imagen }) {
  return (
    <div className="card">
      <div className="card-image" style={{ backgroundImage: `url(${imagen})` }}></div>
      <div className="card-info">
        <h3>{titulo}</h3>
        <p className="price">${precio}</p>
        <button className="card-btn">Ver más</button>
      </div>
    </div>
  );
}