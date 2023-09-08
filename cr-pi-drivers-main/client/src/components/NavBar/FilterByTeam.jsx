import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTeam } from "../../redux/actions";

const FilterByTeam = () => {
    const dispatch = useDispatch();
    const [team, setTeam] = useState(""); 
    const teams = useSelector((state) => state.teams || []); // Inicializa como una matriz vacía si state.teams es falsy

    const handleTeamChange = (e) => {
        setTeam(e.target.value); 
        dispatch(filterByTeam(e.target.value));
    };

    return (
        <div>
            <select onChange={handleTeamChange}>
                <option value="">Todos los equipos</option>
                {teams.map((team) => (
                    <option key={team.id}> {team.name} </option>)
                )}
            </select>
        </div>
    );
};

export default FilterByTeam;
