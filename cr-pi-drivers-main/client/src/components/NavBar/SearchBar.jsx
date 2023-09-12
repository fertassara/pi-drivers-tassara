import { searchDriverByName, getDrivers } from '../../redux/actions'; // Importa las funciones searchDriverByName y getDrivers desde un archivo de acciones en una ubicación relativa
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom para navegar a través de enlaces
import { useDispatch } from "react-redux"; // Importa la función useDispatch desde react-redux para interactuar con Redux
import { useState } from "react"; // Importa el hook useState desde React para gestionar el estado local

const SearchBar = () => { // Define un componente funcional llamado SearchBar
  const dispatch = useDispatch(); // Obtiene la función dispatch de Redux
  const [name, setName] = useState(""); // Declara un estado llamado "name" con valor inicial vacío

  const handleChange = (e) => { // Define una función llamada handleChange que se ejecuta cuando cambia el valor del campo de entrada
    setName(e.target.value); // Actualiza el estado "name" con el nuevo valor del campo de entrada
  };

  const handleSubmit = (e) => { // Define una función llamada handleSubmit que se ejecuta cuando se hace clic en el botón "Submit"
    dispatch(searchDriverByName(name)); // Despacha una acción "searchDriverByName" con el valor actual de "name"
  };
  
  const mostrarTodos = () => { // Define una función llamada mostrarTodos que se ejecuta cuando se hace clic en el botón "Mostrar Todos"
    setName(''); // Restablece el estado "name" a una cadena vacía
    dispatch(getDrivers()); // Despacha una acción "getDrivers" para mostrar todos los conductores
  };

  return (
    <div>
        <input onChange={handleChange} value={name} placeholder="Buscar conductor" /> {/* Renderiza un campo de entrada controlado */}
        <button onClick={handleSubmit}>Submit</button> {/* Renderiza un botón "Submit" que ejecuta la función handleSubmit al hacer clic */}
        <button onClick={mostrarTodos}>Mostrar Todos</button> {/* Renderiza un botón "Mostrar Todos" que ejecuta la función mostrarTodos al hacer clic */}
    </div>
  );
}

export default SearchBar; // Exporta el componente "SearchBar" como predeterminado para su uso en otros lugares de la aplicación
