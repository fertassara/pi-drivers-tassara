import React from 'react';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';
import './CardsContainer.css';

const CardsContainer = () => {
    const drivers = useSelector(state => state.drivers);
    const originDriver = useSelector(state => state.originDriver);

    const filteredDrivers = drivers.filter(driver => {
        if (originDriver === "") return true;
        if (originDriver === "database") return isNaN(driver.id);
        if (originDriver === "api") return !isNaN(driver.id);
        return true; // Si no se cumple ninguna condición, muestra el conductor
    });

    return (
        <div className='cardsContainer'>
            {filteredDrivers.map(({ id, name, forename, surname, image, dob, teams, Teams }) => {
                const driverName = name && typeof name === 'object' ? `${name.forename} ${name.surname}` :  `${forename} ${surname}`;
                
                return (
                    <Card
                        key={id}
                        id={id}
                        name={driverName}
                        image={image || 'https://picsum.photos/200/300'}
                        dob={dob}
                        teams={teams || Teams}
                    />
                );
            })}
        </div>
    );
};

export default CardsContainer;
