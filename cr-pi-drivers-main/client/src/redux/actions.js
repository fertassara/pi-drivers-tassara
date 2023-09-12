// actions.js
const URL = "http://localhost:3001"; // Define una URL base para las solicitudes HTTP a la API
import axios from "axios"; // Importa el módulo axios para realizar solicitudes HTTP

// Define constantes para las acciones de Redux
export const GET_DRIVERS = 'GET_DRIVERS'; // Acción para obtener la lista de conductores
export const SEARCH_DRIVER_BY_NAME = 'SEARCH_DRIVER_BY_NAME'; // Acción para buscar conductores por nombre
export const SORT_DRIVERS = 'SORT_DRIVERS'; // Acción para ordenar conductores
export const GET_TEAMS = 'GET_TEAMS'; // Acción para obtener la lista de equipos
export const CREATE_DRIVER = 'CREATE_DRIVER'; // Acción para crear un nuevo conductor
export const FILTER_BY_TEAM = "FILTER_BY_TEAM"; // Acción para filtrar conductores por equipo
export const FILTER_ORIGIN = "FILTER_ORIGIN"; // Acción para filtrar conductores por origen
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"; // Acción para configurar la página actual

// Acción para obtener la lista de conductores
export const getDrivers = () => {
    return async function (dispatch) { // Retorna una función asincrónica que recibe "dispatch" como argumento
        try {
            const response = await axios.get(`${URL}/drivers`); // Realiza una solicitud GET a la API para obtener conductores
            const drivers = response.data; // Extrae los conductores de la respuesta
            dispatch({ type: GET_DRIVERS, payload: drivers }); // Despacha una acción con los conductores obtenidos
        } catch (error) {
            console.error('Error al obtener conductores:', error); // Maneja errores mostrando un mensaje de error en la consola
        }
    }
};

// Acción para buscar conductores por nombre
export const searchDriverByName = (name) => {
    return async function (dispatch) { // Retorna una función asincrónica que recibe "dispatch" como argumento
        try {
            const response = await axios.get(`${URL}/drivers/search?name=${name}`); // Realiza una solicitud GET a la API para buscar conductores por nombre
            const drivers = response.data; // Extrae los conductores encontrados de la respuesta

            // Despacha los resultados al estado de Redux
            dispatch({ type: SEARCH_DRIVER_BY_NAME, payload: drivers });
        } catch (error) {
            // Maneja errores, por ejemplo, mostrando un mensaje de error o registrándolos
            console.error('Error en la búsqueda de conductores por nombre:', error);
            alert("No se encontraron drivers con ese nombre"); // Muestra una alerta si no se encuentran conductores
        }
    };
};

// Acción para ordenar conductores
export const sortDrivers = (order, direction) => {
    return { type: SORT_DRIVERS, payload: { order, direction } }; // Retorna una acción con el tipo "SORT_DRIVERS" y los parámetros de orden y dirección
};

// Acción para obtener la lista de equipos
export const getTeams = () => {
    return async function (dispatch) { // Retorna una función asincrónica que recibe "dispatch" como argumento
        try {
            const response = await axios.get(`${URL}/teams`); // Realiza una solicitud GET a la API para obtener equipos
            const teams = response.data; // Extrae los equipos de la respuesta
            dispatch({ type: GET_TEAMS, payload: teams }); // Despacha una acción con los equipos obtenidos
        } catch (error) {
            console.error('Error al obtener equipos:', error); // Maneja errores mostrando un mensaje de error en la consola
        }
    }
};

// Acción para crear un nuevo conductor
export const createDriver = (driverData) => {
    return async function (dispatch) { // Retorna una función asincrónica que recibe "dispatch" como argumento
        try {
            const response = await axios.post(`${URL}/drivers/create`, driverData); // Realiza una solicitud POST a la API para crear un nuevo conductor
            const driver = response.data; // Extrae el conductor creado de la respuesta
            dispatch({ type: CREATE_DRIVER, payload: driver }); // Despacha una acción con el conductor creado
            alert("Has creado un driver."); // Muestra una alerta después de crear un conductor
        } catch (error) {
            console.error('Error al crear conductor:', error); // Maneja errores mostrando un mensaje de error en la consola
        }
    }
}

// Acción para filtrar conductores por equipo
export const filterByTeam = (team) => {
    return { type: FILTER_BY_TEAM, payload: team }; // Retorna una acción con el tipo "FILTER_BY_TEAM" y el equipo como carga útil
};

// Acción para filtrar conductores por origen
export const filterByOrigin = (source) => {
    return { type: FILTER_ORIGIN, payload: source }; // Retorna una acción con el tipo "FILTER_ORIGIN" y la fuente como carga útil
};

// Acción para configurar la página actual
export const setCurrentPage = (page) => {
    return { type: 'SET_CURRENT_PAGE', payload: page }; // Retorna una acción con el tipo "SET_CURRENT_PAGE" y la página como carga útil
};
