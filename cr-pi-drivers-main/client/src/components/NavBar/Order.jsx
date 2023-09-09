import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sortDrivers } from "../../redux/actions";

const Order = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setOrder("name.forename");
    setDirection("asc");
  }, []);

  const [order, setOrder] = useState("name.forename");
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
        <option value="name.forename:asc">Nombre (A-Z)</option>
        <option value="name.forename:desc">Nombre (Z-A)</option>
        <option value="birthdate:asc">Edades Ascendentes</option>
        <option value="birthdate:desc">Edades Descendentes</option>
      </select>
    </div>
  );
};

export default Order;
