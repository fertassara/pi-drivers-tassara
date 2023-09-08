const URL = "http://localhost:3001"
import axios from "axios"
export const GET_DRIVERS = 'GET_DRIVERS'
export const SEARCH_DRIVER_BY_NAME = 'SEARCH_DRIVER_BY_NAME'
export const SORT_DRIVERS = 'SORT_DRIVERS';
export const GET_TEAMS = 'GET_TEAMS'
export const CREATE_DRIVER = 'CREATE_DRIVER';
export const FILTER_BY_TEAM = "FILTER_BY_TEAM";
export const FILTER_ORIGIN = "FILTER_ORIGIN";


export const getDrivers = () => {
    return async function (dispatch) {
        const drivers = (await axios.get(`${URL}/drivers`)).data
        dispatch({type: GET_DRIVERS, payload: drivers}) //dispatch para comunicar resultados asíncronos al store de Redux para actualizarlo
    }
};

export const searchDriverByName = (name) => {
    return async function (dispatch) {
        try {
            // Realiza una solicitud al servidor para buscar conductores por nombre
            const response = await axios.get(`${URL}/drivers/search?name=${name}`);
            const drivers = response.data;

            // Despacha los resultados al estado de Redux
            dispatch({ type: SEARCH_DRIVER_BY_NAME, payload: drivers });
        } catch (error) {
            // Maneja errores, por ejemplo, mostrando un mensaje de error o registrándolos
            console.error('Error en la búsqueda de conductores por nombre:', error);
        }
    };
};

export const sortDrivers = (order, direction) => {
    return {type: SORT_DRIVERS, payload: { order, direction }};
};

export const getTeams = () => {
    return async function (dispatch) {
        const teams = (await axios.get(`${URL}/teams`)).data
        dispatch({type: GET_TEAMS, payload: teams})
    }
};

export const createDriver = (driverData) => {
    return async function (dispatch) {
        const driver = (await axios.post(`${URL}/drivers`, driverData)).data
        dispatch({type: CREATE_DRIVER, payload: driver});
    }
}

export const filterByTeam = (team) => {
    return {type: FILTER_BY_TEAM, payload: team};
};

export const filterByOrigin = (source) => {
    return {type: FILTER_ORIGIN, payload: source};
};