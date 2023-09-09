const URL = "http://localhost:3001";
import axios from "axios";

export const GET_DRIVERS = 'GET_DRIVERS';
export const SEARCH_DRIVER_BY_NAME = 'SEARCH_DRIVER_BY_NAME';
export const SORT_DRIVERS = 'SORT_DRIVERS';
export const GET_TEAMS = 'GET_TEAMS';
export const CREATE_DRIVER = 'CREATE_DRIVER';
export const FILTER_BY_TEAM = "FILTER_BY_TEAM";
export const FILTER_ORIGIN = "FILTER_ORIGIN";

export const getDrivers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/drivers`);
            const drivers = response.data;
            dispatch({ type: GET_DRIVERS, payload: drivers });
        } catch (error) {
            console.error('Error al obtener conductores:', error);
        }
    }
};

export const searchDriverByName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/drivers/search?name=${name}`);
            const drivers = response.data;

            // Despacha los resultados al estado de Redux
            dispatch({ type: SEARCH_DRIVER_BY_NAME, payload: drivers });
        } catch (error) {
            // Maneja errores, por ejemplo, mostrando un mensaje de error o registrándolos
            console.error('Error en la búsqueda de conductores por nombre:', error);
            alert("No se encontraron drivers con ese nombre")
        }
    };
};




export const sortDrivers = (order, direction) => {
    return { type: SORT_DRIVERS, payload: { order, direction } };
};

export const getTeams = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/teams`);
            const teams = response.data;
            dispatch({ type: GET_TEAMS, payload: teams });
        } catch (error) {
            console.error('Error al obtener equipos:', error);
        }
    }
};

export const createDriver = (driverData) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${URL}/drivers/create`, driverData);
            const driver = response.data;
            dispatch({ type: CREATE_DRIVER, payload: driver });
        } catch (error) {
            console.error('Error al crear conductor:', error);
        }
    }
}

export const filterByTeam = (team) => {
    return { type: FILTER_BY_TEAM, payload: team };
};

export const filterByOrigin = (source) => {
    return { type: FILTER_ORIGIN, payload: source };
};
