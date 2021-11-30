import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    filter,
    getLight,
    getHeavy,
    getTemp,
    getZA,
    getAZ,
    getSource
} from '../../actions/index';



export default function Orden() {
    const temp = useSelector((state) => state.temps);
    const dogs = useSelector((state) => state.filter);
    const [selectTemp, setSelectTemp] = useState('');
    const [tempToFilterBy, setTempToFilterBy] = useState([]);

    const dispatch = useDispatch();

    function orderDesc(el) {
        el.preventDefault();
        dispatch(getZA());
    }

    function orderAsc(el) {
        el.preventDefault();
        dispatch(getAZ());
    }

    function orderLight(el) {
        el.preventDefault();
        dispatch(getLight());
    }

    function orderHeavy(el) {
        el.preventDefault();
        dispatch(getHeavy());
    }


    useEffect(() => {
        dispatch(getTemp())
    },[]);

    function handleChange(el) {
        setSelectTemp(el.target.value)
    }

    function handleClick() {
        let filtered = [];

        dogs?.forEach((el) =>{
            if(el.id.length) {
                el.temperaments.map((temp) =>               
                    temp.name === selectTemp ? filtered.push(el) : null
                );
            } else {
                if(el.temperament?.includes(selectTemp)) {    
                    filtered.push(el)
                }
            }
        })

        dispatch(filter(filtered))
    }

    function handleSelect(el) {
        if(el.target.value === 'null'){
            return alert('Ingresa datos válidos')
        } else {
            dispatch(getSource(el.target.value))
        }
    }

    function handleSubmit(el) {
        el.preventDefault();
        setTempToFilterBy([...tempToFilterBy, selectTemp]);
        handleClick();
    }

    return (
        
        <div className='container'>
            <h1>Orden</h1>

            <div>
                <label className='label'>Name Order</label>
                <br/>
                    <button className='buttom' onClick={(e)=>orderAsc(e)}>Ascendente</button>
                    <button className='buttom' onClick={(e)=>orderDesc(e)}>Descendente</button>
            </div>

            <div>
                <label className='label'>Weight Order</label>
                <br/>
                    <button className='buttom' onClick={(e)=>orderLight(e)}>De ligero a pesado</button>
                    <button className='buttom' onClick={(e)=>orderHeavy(e)}>De pesado a ligero</button>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <label className='label'>Temperament!!</label>   
                    <br/>  
                    <select 
                        className='select' 
                        onChange={handleChange}
                        name='By Temperaments'
                        value={selectTemp}>
                        {
                            temp?.map((temp) => {
                                return <option value={temp.name}>{temp.name}</option>
                            })
                        }
                    </select>
                    <button type='submit' className='buttom'>{' '}Filter</button>
                </form>
            </div>

            <div>
                <form>
                    <label className='label'>Source</label>   
                    <br/>  
                    <select className='select' onChange={(e)=>handleSelect(e)}>
                        <option value='ALL'>Todos</option>
                        <option value='API'>De la Api</option>
                        <option value='DB'>Creados</option>
                    </select>
                </form>
            </div>

        </div>
    )
};