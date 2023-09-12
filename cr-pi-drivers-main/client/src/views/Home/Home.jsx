// Importa el componente 'CardsContainer' desde el directorio 'components/CardsContainer/CardsContainer'
import CardsContainer from "../../components/CardsContainer/CardsContainer";
// Importa el componente 'FilterAndOrder' desde el directorio 'components/NavBar/FilterAndOrder'
import FilterAndOrder from '../../components/NavBar/FilterAndOrder'
// Importa la acción 'getDrivers' desde el módulo 'actions' en el directorio 'redux'
import { getDrivers } from "../../redux/actions";
// Importa el hook 'useEffect' desde React para realizar efectos secundarios en componentes funcionales
import { useEffect } from "react";
// Importa el hook 'useDispatch' desde React Redux para obtener la función 'dispatch'
import { useDispatch } from "react-redux";
// Importa la acción 'getTeams' desde el módulo 'actions' en el directorio 'redux'
import { getTeams } from "../../redux/actions";

// Define el componente 'Home'
const Home = () => {
    // Obtiene la función 'dispatch' de Redux
    const dispatch = useDispatch();

    // Efecto secundario que se ejecuta cuando el componente se monta
    useEffect(() => {
        // Llama a la acción 'getDrivers' para obtener datos de conductores y almacenarlos en el estado global de Redux
        dispatch(getDrivers());
    }, [dispatch]); // Este efecto se ejecutará solo cuando 'dispatch' cambie, lo que es constante en este caso

    // Efecto secundario que se ejecuta cuando el componente se monta
    useEffect(() => {
        // Llama a la acción 'getTeams' para obtener datos de equipos y almacenarlos en el estado global de Redux
        dispatch(getTeams());
    }, [dispatch]); // Este efecto se ejecutará solo cuando 'dispatch' cambie, lo que es constante en este caso

    return (
        <div>
            {/* Renderiza el componente 'FilterAndOrder' para filtrar y ordenar los conductores */}
            <FilterAndOrder />
            {/* Renderiza el componente 'CardsContainer' para mostrar tarjetas de conductores */}
            <CardsContainer />
        </div>
    );
}

// Exporta el componente 'Home'
export default Home;
