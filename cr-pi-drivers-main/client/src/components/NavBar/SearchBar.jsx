import { searchDriverByName, getDrivers } from '../../redux/actions';
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useState } from "react";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

    const handleChange = (e) => {
      setName(e.target.value); 
      dispatch(searchDriverByName(e.target.value));
    };

    
    
    const mostrarTodos = () => {
      setName('')
      dispatch(getDrivers());
    };

    return(
        <div>
            <input onChange={handleChange} value={name} placeholder="Buscar conductor"/>
            <button onClick={mostrarTodos}>Mostrar Todos</button>
            <Link to ={'/Create'}><button>Create</button> </Link>
        </div>
    )
}

export default SearchBar