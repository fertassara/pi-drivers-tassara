import { useState } from "react"; // Importa el hook useState desde React
import { useDispatch } from "react-redux"; // Importa la función useDispatch desde react-redux
import { filterByOrigin } from "../../redux/actions"; // Importa la función filterByOrigin desde un archivo de acciones en una ubicación relativa

const Origin = () => { // Define un componente funcional llamado Origin
    const dispatch = useDispatch(); // Obtiene la función dispatch de Redux
    const [origin, setOrigin] = useState(""); // Declara un estado llamado "origin" con valor inicial vacío

    const handleSourceChange = (e) => { // Define una función llamada handleSourceChange que se ejecuta cuando cambia el valor del selector
        setOrigin(e.target.value); // Actualiza el estado "origin" con el nuevo valor seleccionado
        dispatch(filterByOrigin(e.target.value)); // Despacha una acción "filterByOrigin" con el nuevo valor de origen seleccionado
    };

    return (
        <div>
            <select onChange={handleSourceChange}> {/* Renderiza un elemento select con un controlador de cambio */}
                <option value="">Todos</option> {/* Renderiza una opción predeterminada para mostrar todos los elementos */}
                <option value="database">Base de Datos</option> {/* Renderiza una opción para filtrar por origen de base de datos */}
                <option value="api">API</option> {/* Renderiza una opción para filtrar por origen de API */}
            </select>
        </div>
    );
};

export default Origin; // Exporta el componente "Origin" como predeterminado para su uso en otros lugares de la aplicación
