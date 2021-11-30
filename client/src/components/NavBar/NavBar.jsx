import React from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogs } from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import Orden from "./Orden";

export default function NavBar() {
    const dispatch = useDispatch();

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div className='navBar'>
            <h1>Nav de Perros!!!</h1>
            <Link to= '/createDog'><button className='button'>Crear Perro</button></Link>
            <button onClick={e=> {handleClick(e)}}>Volver a cargar perros</button>
            <Link to= '/'><button className='button'>Salir de App</button></Link>
            <div className='list'>
                <Orden/>
                <SearchBar/>
            </div>

        </div>
    )
}

