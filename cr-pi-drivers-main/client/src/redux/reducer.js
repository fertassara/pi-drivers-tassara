import { GET_DRIVERS, SEARCH_DRIVER_BY_NAME, SORT_DRIVERS, GET_TEAMS, CREATE_DRIVER, FILTER_BY_TEAM, FILTER_ORIGIN } from "./actions";

const initialState = {
    drivers: [],
    driversName: [],
    driversTeam: [],
    teams: [],
    originDriver: ""
};

const rootReduccer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DRIVERS:
            return {...state, drivers: action.payload, driversName: action.payload, driversTeam: action.payload};

        case SEARCH_DRIVER_BY_NAME:
            const filteredNames = state.driversName.filter((driver) => 
                `${driver.name} ${driver.surname}`.toLowerCase().includes(action.payload.toLowerCase()));
            return {...state, drivers: filteredNames};

        case SORT_DRIVERS:
            const { order, direction } = action.payload;
            const ordenados = [...state.drivers];
                ordenados.sort((a, b) => {
                    return order === 'name'
                        ? (direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
                        : (direction === 'asc' ? new Date(b.dob) - new Date(a.dob) : new Date(a.dob) - new Date(b.dob));
                });
            return {...state, drivers: ordenados};

        case GET_TEAMS:
            return {...state, teams: action.payload};

        case CREATE_DRIVER:
                return {...state, drivers: [...state.drivers, action.payload]};

        case FILTER_BY_TEAM:
            const filteredTeam = state.driversTeam.filter((driver) => 
                driver && driver.teams && driver.teams.includes(action.payload));
            return {...state, drivers: filteredTeam};

        case FILTER_ORIGIN:
            return {...state, originDriver: action.payload};

        default:
            return {...state};
    }
};

export default rootReduccer