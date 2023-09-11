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

const initialState = {
    ordenados: [],
    drivers: [],
    driversName: [],
    driversTeam: [],
    teams: [],
    originDriver: "",
    currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DRIVERS:
            return {
                ...state,
                drivers: action.payload,
                driversName: action.payload,
                driversTeam: action.payload,
            };

        case SEARCH_DRIVER_BY_NAME:
            return { ...state, drivers: action.payload };

        case SORT_DRIVERS:
            const { order, direction } = action.payload;
            const ordenados = [...state.drivers];

            console.log(order)

            if (order === "name.forename") {
                ordenados.sort((a, b) => {
                    const nameA = a.name && a.name.forename ? a.name.forename.toUpperCase() : "";
                    const nameB = b.name && b.name.forename ? b.name.forename.toUpperCase() : "";
            
                    if (direction === "asc") {
                        return nameA.localeCompare(nameB);
                    } else {
                        return nameB.localeCompare(nameA);
                    }
                });
            
            
            } else if (order === "dob") {
                ordenados.sort((a, b) => {
                    const dobA = new Date(a.dob);
                    const dobB = new Date(b.dob);

                    if (direction === "asc") {
                        return dobA - dobB;
                    } else {
                        return dobB - dobA;
                    }
                });
            }

            return { ...state, drivers: ordenados };

        case GET_TEAMS:
            return { ...state, teams: action.payload };

        case CREATE_DRIVER:
            return { ...state, drivers: [...state.drivers, action.payload] };

        case FILTER_BY_TEAM:
            const filteredTeam = state.driversTeam.filter(
                (driver) =>
                    driver && driver.teams && driver.teams.includes(action.payload)
            );
            return { ...state, drivers: filteredTeam };

        case FILTER_ORIGIN:
            return { ...state, originDriver: action.payload };

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };

        default:
            return { ...state };
    }
};

export default rootReducer;
