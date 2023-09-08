import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Detail.css'; // Importa el archivo CSS

const Detail = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/drivers/${id}`)
      .then((response) => {
        const data = response.data;
        if (data.name) {
          setDriver(data);
        } else {
          setError('No hay conductor con ese nombre');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching driver data:', error);
        setError('Hubo un error al cargar los datos del conductor');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return (
      <div className="container">
        <p>Error: {error}</p>
        <Link to="/Home">
          <button>Drivers</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Detalle del Conductor</h1>
        <img
          src={driver.image && driver.image.url}
          alt={`Imagen de ${
            driver.name && driver.name.forename
          } ${driver.name && driver.name.surname}`}
        />
        <ul>
          <li>Nombre: {driver.name && `${driver.name.forename} ${driver.name.surname}`}</li>
          <li>Fecha de Nacimiento: {driver.dob}</li>
          <li>Nacionalidad: {driver.nationality}</li>
          <li>Equipos: {driver.teams}</li>
          <li>Descripción: {driver.description}</li>
          <li>
            <a href={driver.url} target="_blank" rel="noopener noreferrer">
              Enlace a Wikipedia
            </a>
          </li>
        </ul>
        <div className="button-container">
          <Link to="/Home">
            <button>Drivers</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;
