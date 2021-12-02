import React from "react";
import { Link } from "react-router-dom";
import styles from './BarraTitulo.module.css'

export default function BarraTitulo() {

    return (
        <div className={styles.navBar}>
            <Link to='/home'>
                <button className={styles.btn}>Come back!</button>
            </Link>
            
        </div>
    )
}

