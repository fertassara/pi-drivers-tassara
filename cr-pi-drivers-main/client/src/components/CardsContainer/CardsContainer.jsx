// Importa React y otros componentes y estilos
import React from 'react';
import Card from '../Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/actions';
import './CardsContainer.css';

// Define el componente 'CardsContainer'
const CardsContainer = () => {
    // Utiliza el hook 'useSelector' para obtener el estado de Redux
    const drivers = useSelector(state => state.drivers);
    const currentPage = useSelector(state => state.currentPage);
    const cardsPerPage = 9; // Configura el número máximo de cartas por página aquí
    const originDriver = useSelector(state => state.originDriver);
    const dispatch = useDispatch();

    // Función de filtro para conductores por origen
    const filterDriversByOrigin = (driver) => {
        if (originDriver === "") return true;
        if (originDriver === "database") return isNaN(driver.id);
        if (originDriver === "api") return !isNaN(driver.id);
        return true; // Si no se cumple ninguna condición, muestra el conductor
    };

    // Filtra los conductores por origen
    const filteredDrivers = drivers.filter(filterDriversByOrigin);

    // Calcula los índices de inicio y fin para mostrar las cartas en la página actual
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = Math.min(startIndex + cardsPerPage, filteredDrivers.length);

    // Obtiene las cartas a mostrar en la página actual
    const visibleDrivers = filteredDrivers.slice(startIndex, endIndex);

    // Calcula la cantidad de filas necesarias
    const numRows = Math.ceil(visibleDrivers.length / 3);

    // Maneja el cambio de página
    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    return (
        <div className='cardsContainer'>
            <div className='cardGrid'>
                {/* Mapea y muestra las cartas de los conductores visibles */}
                {visibleDrivers.map(({ id, name, forename, surname, image, dob, teams, Teams }) => {
                    // Determina el nombre del conductor
                    const driverName = name && typeof name === 'object' ? `${name.forename} ${name.surname}` :  `${forename} ${surname}`;
                    
                    // Renderiza un componente 'Card' para cada conductor
                    return (
                        <Card
                            key={id}
                            id={id}
                            name={driverName}
                            image={image || 'https://picsum.photos/200/300'}
                            dob={dob}
                            teams={teams || Teams}
                            className='card'
                        />
                    );
                })}
            </div>
            {/* Muestra la paginación */}
            <div className='pagination'>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <h1>{currentPage}/{Math.ceil(filteredDrivers.length / 9)}</h1>             {/* muestro pag actual y total */}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={endIndex >= filteredDrivers.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

// Exporta el componente 'CardsContainer' para su uso en otros lugares de la aplicación
export default CardsContainer;
