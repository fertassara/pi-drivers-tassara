// Importa React y los hooks necesarios
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTeam } from "../../redux/actions";

// Define el componente 'FilterByTeam'
const FilterByTeam = () => {
    // Utiliza el hook 'useDispatch' para obtener una función de despacho de Redux
    const dispatch = useDispatch();
    // Utiliza el hook 'useState' para gestionar el estado local del equipo seleccionado
    const [team, setTeam] = useState(""); 
    // Utiliza el hook 'useSelector' para obtener datos del estado de Redux (los equipos disponibles)
    const teams = useSelector((state) => state.teams || []); // Inicializa como una matriz vacía si state.teams es falsy

    // Maneja el cambio en la selección del equipo
    const handleTeamChange = (e) => {
        // Actualiza el estado local con el valor seleccionado
        setTeam(e.target.value); 
        // Despacha la acción de filtro por equipo al almacén de Redux
        dispatch(filterByTeam(e.target.value));
    };

    return (
        <div>
            {/* Renderiza un menú desplegable de equipos */}
            <select onChange={handleTeamChange}>
                <option value="">Todos los equipos</option>
                {/* Mapea y muestra las opciones de equipo disponibles */}
                {teams.map((team) => (
                    <option key={team.id}> {team.name} </option>)
                )}
            </select>
        </div>
    );
};

// Exporta el componente 'FilterByTeam' para su uso en otros lugares de la aplicación
export default FilterByTeam;
