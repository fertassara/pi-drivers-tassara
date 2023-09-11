import CardsContainer from "../../components/CardsContainer/CardsContainer";
import FilterAndOrder from '../../components/NavBar/FilterAndOrder'
import { getDrivers } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTeams } from "../../redux/actions";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDrivers());
    }, [dispatch]);
                                //para que no se bloqueen entre sí en tiempos de ejecución
    useEffect(() => {
        dispatch(getTeams());
    }, [dispatch]);

    return (
        <div>
            <FilterAndOrder />
            <CardsContainer />
        </div>
    );
}

export default Home;
