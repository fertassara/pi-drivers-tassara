import axios from 'axios';  // Importa la biblioteca axios para hacer solicitudes HTTP
import { useEffect, useState } from 'react';  // Importa useEffect y useState de React
import { useParams, Link } from 'react-router-dom';  // Importa useParams y Link de react-router-dom para manejar parámetros de la URL y crear enlaces
import './Detail.css';  // Importa el archivo CSS para aplicar estilos al componente

const Detail = () => {
  // Obtiene el parámetro 'id' de la URL utilizando useParams()
  const { id } = useParams();
  
  // Define el estado para almacenar los datos del conductor, el estado de carga y los errores
  const [driver, setDriver] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto secundario que se ejecuta cuando el componente se monta o cuando cambia 'id'
  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener los datos del conductor con el ID proporcionado
    axios
      .get(`http://localhost:3001/drivers/${id}`)
      .then((response) => {
        const data = response.data;
        if (data.id) {
          // Si se encuentra un conductor con el ID, actualiza el estado 'driver' con los datos
          setDriver(data);
        } else {
          // Si no se encuentra un conductor, establece un mensaje de error
          setError('No hay conductor con ese nombre');
        }
        setLoading(false);
      })
      .catch((error) => {
        // Si ocurre un error en la solicitud, muestra un mensaje de error
        console.error('Error fetching driver data:', error);
        setError('Hubo un error al cargar los datos del conductor');
        setLoading(false);
      });
  }, [id]);

  // Si se está cargando, muestra un mensaje de carga
  if (loading) {
    return <p>Cargando, aguarda por favor...</p>;
  }

  // Si hay un error, muestra un mensaje de error y un botón para volver a la página de inicio
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

  // Si no hay errores ni cargas, muestra los detalles del conductor
  return (
    <div className="container">
      <div className="card">
        <h1>Detalle del Conductor</h1>
        <img src={driver.image} />

        <ul>
          <li>Nombre: {driver.name ? `${driver.name.forename} ${driver.name.surname}` : `${driver.forename} ${driver.surname}`}</li>
          <li>Fecha de Nacimiento: {driver.dob}</li>
          <li>Nacionalidad: {driver.nationality}</li>
          <li>Equipos: {driver.teams ? driver.teams : driver.Teams.map(team => team.name).join(", ")}</li>
          {/* team de db array de obj .map los separa y me quedo con la prop name y el join los junta en un string */}
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
