import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../actions";

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
        <div className='searchBar'>
            <h1>SearchBar</h1>
            <input
                className='input'
                type='text'
                placeholder='Buscar raza...'
                value={dogState}
                onChange={(el)=>handleIputChange(el)}>
            </input>

            <button 
                className='searchButtom'
                onClick={(el)=>handleSubmit(el)}
                type='submit'
            >
                Start!!
            </button>
        </div>

    )
};
