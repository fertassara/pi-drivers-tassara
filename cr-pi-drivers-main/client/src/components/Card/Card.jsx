import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ id, name, surname, image, teams, Teams }) => {
  let teamList = [];

  if (typeof teams === 'string') {
    // Para datos de la API
    teamList = teams.split(',').map(teamName => ({ name: teamName.trim() }));
  } else if (Array.isArray(teams)) {
    // Para datos de la base de datos
    teamList = teams;
  } else if (Array.isArray(Teams)) {
    // Para datos de la base de datos (si 'teams' no está definido)
    teamList = Teams;
  }

  // Extraer solo los nombres de los equipos y unirlos en una cadena separada por comas
  const teamNames = teamList.map(team => team.name).join(', ');

  return (
    <div className='Card'>
      <Link to={`/Detail/${id}`}>
        <h1>{name} {surname}</h1>
        <img src={image} alt={`${name} ${surname}`} />
                <p>{teamNames}</p>
      </Link>
    </div>
  );
}

export default Card;
