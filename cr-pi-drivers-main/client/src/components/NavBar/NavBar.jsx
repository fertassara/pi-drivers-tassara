import React from 'react'; // Importa la librería React
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom
import SearchBar from '../NavBar/SearchBar'; // Importa el componente SearchBar desde un directorio relativo
import { useLocation } from 'react-router-dom'; // Importa el hook useLocation de react-router-dom
import style from './NavBar.css?inline'; // Importa el archivo de estilos CSS

export default function NavBar() { // Define un componente funcional llamado NavBar
    const location = useLocation(); // Utiliza el hook useLocation para obtener la ubicación actual
    return (
        <div className={style.container}> {/* Renderiza un div con una clase de estilo CSS llamada "container" */}
            <Link to={"/Home"}> {/* Renderiza un enlace (Link) a la ruta "/Home" */}
                <button className={style.navButtons}>Home</button> {/* Renderiza un botón con una clase de estilo CSS llamada "navButtons" */}
            </Link>
            <Link to={"/Create"}> {/* Renderiza un enlace (Link) a la ruta "/Create" */}
                <button className={style.navButtons}>Create Driver</button> {/* Renderiza un botón con una clase de estilo CSS llamada "navButtons" */}
            </Link>
            <Link to={"/"}> {/* Renderiza un enlace (Link) a la ruta "/" */}
                <button className={style.navButtons}>Log Out</button> {/* Renderiza un botón con una clase de estilo CSS llamada "navButtons" */}
            </Link>
            {/* Comentario: La línea siguiente es un código comentado que parece que se utilizaría condicionalmente para renderizar el componente SearchBar en función de la ruta actual */}
            {/* {location.pathname === "/Home" && <SearchBar />} */}
        </div>
    );
};
