import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../actions";
import styles from './SearchBar.module.css'

export default function SearchBar() {
    const [dogState, setDogState] = useState('');
    const dispatch = useDispatch();

    function handleIputChange(el) {
        el.preventDefault();
        setDogState(el.target.value)
        console.log(dogState)
    } 

    function handleSubmit(el) {
        el.preventDefault();
        dispatch(getName(dogState))
        setDogState("")
    }


    return (
        <div className={styles.searchBar}>
            <input
                className={styles.input}
                type='text'
                placeholder='Where are you my friend?'
                value={dogState}
                onChange={(el)=>handleIputChange(el)}>
            </input>

            <button 
                className={styles.btn}
                onClick={(el)=>handleSubmit(el)}
                type='submit'
            >
                Come Here!
            </button>
        </div>

    )
};
