import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    filter,
    getLight,
    getHeavy,
    getTemp,
    getZA,
    getAZ,
    getSource,
} from '../../actions/index';
import styles from './Orden.module.css'



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
        
        <div className={styles.container}>

            <div>
                <label className={styles.labelName}>Name Order</label>
                <br/>
                    <button className={styles.button} onClick={(e)=>orderAsc(e)}>Ascending Order</button>
                    <button className={styles.button} onClick={(e)=>orderDesc(e)}>Descending Order</button>
            </div>

            <div>
                <label className={styles.labelWeight}>Weight Order</label>
                <br/>
                    <button className={styles.button} onClick={(e)=>orderLight(e)}>From Lightest</button>
                    <button className={styles.button} onClick={(e)=>orderHeavy(e)}>From Heaviest</button>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <label className={styles.labelTemp}>Temperament!!</label>   
                    <br/>  
                    <select 
                        className={styles.select} 
                        onChange={handleChange}
                        name='By Temperaments'
                        value={selectTemp}>
                        {
                            temp?.map((temp) => {
                                return <option value={temp.name}>{temp.name}</option>
                            })
                        }
                    </select>
                    <button type='submit' className={styles.button}>{' '}Filter</button>
                </form>
            </div>

            <div>
                <form>
                    <label className={styles.labelSource}>Source</label>   
                    <br/>  
                    <select className={styles.select} onChange={(e)=>handleSelect(e)}>
                        <option value='ALL'>All</option>
                        <option value='API'>From Api</option>
                        <option value='DB'>Created</option>
                    </select>
                </form>
            </div>

        </div>
    )
};