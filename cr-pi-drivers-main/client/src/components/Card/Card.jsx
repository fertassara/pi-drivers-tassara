// Importa el archivo CSS asociado a este componente Card
import './Card.css';

// Importa el componente 'Link' de la librería 'react-router-dom'
import { Link } from 'react-router-dom';

// Define un componente llamado 'Card' que recibe ciertas propiedades (id, name, surname, image, teams, Teams)
const Card = ({ id, name, surname, image, teams, Teams }) => {
  // Inicializa una variable 'teamList' como un arreglo vacío
  let teamList = [];

  // Comprueba si 'teams' es una cadena de texto
  if (typeof teams === 'string') {
    // Si 'teams' es una cadena de texto, divide la cadena en un arreglo de nombres de equipos
    // y los convierte en objetos con la propiedad 'name' y los almacena en 'teamList'
    teamList = teams.split(',').map(teamName => ({ name: teamName.trim() }));
  } else if (Array.isArray(teams)) {
    // Si 'teams' es un arreglo, asigna directamente ese arreglo a 'teamList'
    teamList = teams;
  } else if (Array.isArray(Teams)) {
    // Si 'teams' no está definido pero 'Teams' es un arreglo, asigna 'Teams' a 'teamList'
    teamList = Teams;
  }

  // Extrae los nombres de los equipos de 'teamList' y los une en una cadena separada por comas
  const teamNames = teamList.map(team => team.name).join(', ');

  // Renderiza un componente 'div' con la clase 'Card'
  return (
    <div className='Card'>
      {/* Crea un enlace ('Link') a la página de detalle del elemento con ID 'id' */}
      <Link to={`/Detail/${id}`}>
        {/* Muestra el nombre y apellido */}
        <h1>{name} {surname}</h1>
        {/* Muestra una imagen con la URL 'image' y un texto alternativo */}
        <img src={image} alt={`${name} ${surname}`} />
        {/* Muestra los nombres de los equipos */}
        <p>{teamNames}</p>
      </Link>
    </div>
  );
}

// Exporta el componente 'Card' para su uso en otros lugares de la aplicación
export default Card;
