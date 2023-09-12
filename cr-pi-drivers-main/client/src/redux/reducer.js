// reducer.js
import {
    GET_DRIVERS,
    SEARCH_DRIVER_BY_NAME,
    SORT_DRIVERS,
    GET_TEAMS,
    CREATE_DRIVER,
    FILTER_BY_TEAM,
    FILTER_ORIGIN,
    SET_CURRENT_PAGE,
} from "./actions";

// Define el estado inicial del reducer
const initialState = {
    ordenados: [], // Esta propiedad parece no estar siendo utilizada en el código
    drivers: [], // Almacena la lista de conductores
    driversName: [], // Almacena una copia de la lista de conductores (parece no estar siendo utilizada en el código)
    driversTeam: [], // Almacena una copia de la lista de conductores (parece no estar siendo utilizada en el código)
    teams: [], // Almacena la lista de equipos
    originDriver: "", // Almacena el origen del conductor
    currentPage: 1, // Almacena el número de página actual
};

// Define el reducer principal que manejará las acciones de Redux
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DRIVERS:
            return {
                ...state,
                drivers: action.payload, // Actualiza la lista de conductores con los datos recibidos en la acción
                driversName: action.payload, // Actualiza la copia de la lista de conductores (parece no estar siendo utilizada)
                driversTeam: action.payload, // Actualiza la copia de la lista de conductores (parece no estar siendo utilizada)
            };

        case SEARCH_DRIVER_BY_NAME:
            return { ...state, drivers: action.payload }; // Actualiza la lista de conductores con los resultados de la búsqueda

        case SORT_DRIVERS:
            const { order, direction } = action.payload; // Desestructura el orden y dirección de la acción
            const ordenados = [...state.drivers]; // Crea una copia de la lista de conductores

            console.log(order); // Imprime el valor de "order" en la consola

            if (order === "name.forename") { // Comprueba si se ordena por nombre (forename)
                ordenados.sort((a, b) => {
                    const nameA = a.name && a.name.forename ? a.name.forename.toUpperCase() : ""; // Obtiene el nombre de conductor "A"
                    const nameB = b.name && b.name.forename ? b.name.forename.toUpperCase() : ""; // Obtiene el nombre de conductor "B"
            
                    if (direction === "asc") {
                        return nameA.localeCompare(nameB); // Compara y ordena los nombres en orden ascendente
                    } else {
                        return nameB.localeCompare(nameA); // Compara y ordena los nombres en orden descendente
                    }
                });
            } else if (order === "dob") { // Comprueba si se ordena por fecha de nacimiento (dob)
                ordenados.sort((a, b) => {
                    const dobA = new Date(a.dob); // Obtiene la fecha de nacimiento de conductor "A"
                    const dobB = new Date(b.dob); // Obtiene la fecha de nacimiento de conductor "B"

                    if (direction === "asc") {
                        return dobA - dobB; // Compara y ordena las fechas en orden ascendente
                    } else {
                        return dobB - dobA; // Compara y ordena las fechas en orden descendente
                    }
                });
            }

            return { ...state, drivers: ordenados }; // Actualiza la lista de conductores con la lista ordenada

        case GET_TEAMS:
            return { ...state, teams: action.payload }; // Actualiza la lista de equipos con los datos recibidos en la acción

        case CREATE_DRIVER:
            return { ...state, drivers: [...state.drivers, action.payload] }; // Agrega un nuevo conductor a la lista de conductores

        case FILTER_BY_TEAM:
            const filteredTeam = state.driversTeam.filter(
                (driver) =>
                    driver && driver.teams && driver.teams.includes(action.payload)
            );
            return { ...state, drivers: filteredTeam }; // Filtra la lista de conductores por equipo

        case FILTER_ORIGIN:
            return { ...state, originDriver: action.payload }; // Actualiza el origen del conductor

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload }; // Actualiza el número de página actual

        default:
            return { ...state }; // Devuelve el estado sin cambios si la acción no coincide con ninguna de las anteriores
    }
};

export default rootReducer; // Exporta el reducer principal

//Este archivo es el reducer principal de Redux que gestiona el estado de la aplicación
 //y maneja las acciones para obtener conductores, buscar conductores por nombre, ordenar
  //conductores, obtener equipos, crear conductores y aplicar filtros. 