import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../NavBar/SearchBar';
import { useLocation } from 'react-router-dom';
import style from './NavBar.css';


export default function NavBar (){

    const location = useLocation();
    return(
        <div className={style.container}>
            <Link to={"/Home"}>
                <button className={style.navButtons}>Home</button>
            </Link> 
            <Link to={"/Create"}>
                <button className={style.navButtons}>Create Driver</button>
            </Link>
            <Link to={"/"}>
                <button className={style.navButtons}>Log Out</button>
            </Link>
            {/* {location.pathname === "/Home" && <SearchBar />} */}
        </div>
    );
};