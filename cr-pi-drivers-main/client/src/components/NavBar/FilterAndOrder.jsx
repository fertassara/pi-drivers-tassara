import SearchBar from "./SearchBar";
import Order from './Order';
import Origin from "./Origin";
import FilterByTeam from "./FilterByTeam";
import './FilterAndOrder.css'; // Importa los estilos CSS

//renderizo en la navbar los componentes
const NavBar = () => {
    return (
        <div className="navbar-container"> {/* Aplica la clase "navbar-container" */}
            <SearchBar className="navbar-item" /> {/* Aplica la clase "navbar-item" */}
            <Order className="navbar-item" /> {/* Aplica la clase "navbar-item" */}
            <Origin className="navbar-item" /> {/* Aplica la clase "navbar-item" */}
            <FilterByTeam className="navbar-item" /> {/* Aplica la clase "navbar-item" */}
        </div>
    );
};

export default NavBar;
