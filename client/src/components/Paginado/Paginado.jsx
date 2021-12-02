import React from "react";
import styles from './Paginado.module.css'


export default function Paginado ({dogsPerPage, allDogs, paginado}) {
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i)
    };

    return (
        <nav>
            <ul className={styles.paginado}>
                { pageNumbers && pageNumbers.map(number => (
                        <li className='number' key={number}>
                            <a onClick={() => paginado(number)}> {number} </a>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}