import React from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogs } from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import Orden from "./Orden";
import styles from './NavBar.module.css'

export default function NavBar() {
    const dispatch = useDispatch();

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div className={styles.navBar}>
            <Link to= '/'><button className={styles.btnQuit}>Take a walk!!</button></Link>
            <button onClick={e=> {handleClick(e)}} className={styles.btnHome}>Come Back!</button>
            <Link to= '/createDog'><button className={styles.btnCreate}>Create Dog</button></Link>
            <div className={styles.list}>
                <SearchBar/>
            </div>
            <Orden/>

        </div>
    )
}

