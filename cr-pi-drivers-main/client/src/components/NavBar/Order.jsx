import React, { useState, useEffect } from "react"; // Importa React, useState y useEffect desde la librería "react"
import { useDispatch } from "react-redux"; // Importa useDispatch desde "react-redux"
import { sortDrivers } from "../../redux/actions"; // Importa la función sortDrivers desde un archivo de acciones en una ubicación relativa

const Order = () => { // Define un componente funcional llamado Order
  const dispatch = useDispatch(); // Obtiene la función dispatch de Redux

  useEffect(() => { // Define un efecto que se ejecuta cuando el componente se monta
    setOrder("Select Order"); // Establece el estado inicial de "order" en "Select Order"
    setDirection("asc"); // Establece el estado inicial de "direction" en "asc"
  }, []); // El efecto se ejecuta solo una vez cuando el componente se monta (arreglo de dependencias vacío)

  const [order, setOrder] = useState("Select Order"); // Declara un estado llamado "order" con valor inicial "Select Order"
  const [direction, setDirection] = useState("asc"); // Declara un estado llamado "direction" con valor inicial "asc"

  const handleSortChange = (e) => { // Define una función llamada handleSortChange que se ejecuta cuando cambia el valor del selector
    const [newOrder, newDirection] = e.target.value.split(":"); // Divide el valor seleccionado en "newOrder" y "newDirection" utilizando ":" como separador
    setOrder(newOrder); // Actualiza el estado "order" con el nuevo valor de ordenamiento
    setDirection(newDirection); // Actualiza el estado "direction" con la nueva dirección de ordenamiento
    dispatch(sortDrivers(newOrder, newDirection)); // Despacha una acción "sortDrivers" con los nuevos valores de ordenamiento
  };

  return (
    <div>
      <select onChange={handleSortChange} value={`${order}:${direction}`}> {/* Renderiza un elemento select con un controlador de cambio y un valor seleccionado basado en el estado actual de "order" y "direction" */}
        <option value="Select Order">Select Order</option> {/* Renderiza una opción predeterminada para seleccionar un orden */}
        <option value="name.forename:asc">Nombre (A-Z)</option> {/* Renderiza una opción para ordenar por nombre de A a Z */}
        <option value="name.forename:desc">Nombre (Z-A)</option> {/* Renderiza una opción para ordenar por nombre de Z a A */}
        <option value="dob:asc">Edades Ascendentes</option> {/* Renderiza una opción para ordenar por edades de manera ascendente */}
        <option value="dob:desc">Edades Descendentes</option> {/* Renderiza una opción para ordenar por edades de manera descendente */}
      </select>
    </div>
  );
};

export default Order; // Exporta el componente "Order" como predeterminado para su uso en otros lugares de la aplicación
