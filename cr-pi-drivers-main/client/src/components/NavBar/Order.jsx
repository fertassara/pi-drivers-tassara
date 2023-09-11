import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sortDrivers } from "../../redux/actions";

const Order = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setOrder("Select Order");
    setDirection("asc");
  }, []); 

  const [order, setOrder] = useState("Select Order");
  const [direction, setDirection] = useState("asc");

  const handleSortChange = (e) => {
    const [newOrder, newDirection] = e.target.value.split(":");
    setOrder(newOrder);
    setDirection(newDirection);
    dispatch(sortDrivers(newOrder, newDirection));
  };

  

  return (
    <div>
      <select onChange={handleSortChange} value={`${order}:${direction}`}>
      <option value="Select Order">Select Order</option>

       <option value="name.forename:asc">Nombre (A-Z)</option>
        <option value="name.forename:desc">Nombre (Z-A)</option>
        <option value="dob:asc">Edades Ascendentes</option>
        <option value="dob:desc">Edades Descendentes</option>
      </select>
    </div>
  );
};

export default Order;
