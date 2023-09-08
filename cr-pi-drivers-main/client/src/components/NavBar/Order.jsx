import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sortDrivers } from "../../redux/actions";

const Order = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setOrder("");
    setDirection("");
  }, []);

  const [order, setOrder] = useState("");
  const [direction, setDirection] = useState("");

  const handleSortChange = (e) => {
    const [newOrder, newDirection] = e.target.value.split(":");
    setOrder(newOrder);
    setDirection(newDirection);
    //console.log(newOrder, newDirection)
    dispatch(sortDrivers(newOrder, newDirection));
  };

  return (
    <div>
      <select onChange={handleSortChange} value={`${order}:${direction}`}>
        <option value="name:asc">Nombre (A-Z)</option>
        <option value="name:desc">Nombre (Z-A)</option>
        <option value="birthdate:asc">Edades Ascendentes</option>
        <option value="birthdate:desc">Edades Descendentes</option>
      </select>
    </div>
  );
};

export default Order;
