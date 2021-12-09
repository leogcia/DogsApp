import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemp, postDog } from "../../actions";
import styles from './CreateDog.module.css'


function validateForm(input) {
    let errors = {};

        if(!input.name) {
            errors.name = 'Need a breed';
        }
        
        if(!input.height) {
            errors.height = 'Need a height'
        } else {
            if(!/\d{1,2}-\d{1,2}/g.test(input.height)){
                errors.height = 'Write min and max values. Example: 10-50'
            }
        }
        
        if(!input.weight) {
            errors.weight = 'Need a weight'
        } else {
            if(!/\d{1,2}-\d{1,2}/g.test(input.weight)){
                errors.weight = 'Write min and max values. Example: 10-50'
            }
        }
        
        if(!input.life_span) {
            errors.life_span = 'Need a  life_span'
        } else {
            if(!/\d{1,2}-\d{1,2}/g.test(input.life_span)){
                errors.life_span = 'Write min and max values. Example: 10-50'
            }
        }
        return errors;
}

export default function CreateDog(){
    const dispatch = useDispatch();
    const temperaments = useSelector((state)=> state.temps)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        image:"",
        name:"",
        height:"",
        weight:"",
        life_span:"",
        temperament:[],
    })

    function handleChange(el) {
        setInput({
            ...input,
            [el.target.name] : el.target.value
        })
        setErrors(validateForm({
            ...input,
            [el.target.name] : el.target.value
        }))
        console.log(input)
    }

    function handleSelect(el) {
        if (input.temperament.includes((el.target.value))) {
            alert("Temperament already selected. Try again :)");
        } else {
            setInput({
                ...input,
                temperament:[...input.temperament, el.target.value]
            })
        }
    }

    function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== el)
        })
    }

    function handleSubmit(el) {
        el.preventDefault();
        console.log(input)
        if (!errors.name && !errors.weight && !errors.height && !errors.life_span) {
            dispatch(postDog(input))
            alert('Budie created :)')
            setInput({
                image:"",
                name:"",
                height:"",
                weight:"",
                life_span:"",
                temperament:[],
            })
        } else alert('Uups! Something is wrong :(')
    }

    useEffect(()=>{
        dispatch(getTemp())
    }, [dispatch])


    return (
        
        <div className={styles.body}>
            <div className={styles.titulo}>
            <Link to= '/home'><button className={styles.button}>Home</button></Link>
                <h1>Create your budie!!</h1>
            </div>

            <div className={styles.container}>
                <div className={styles.card}>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label className={styles.label}>Breed:</label>
                            <input
                                className={styles.input}
                                type='text'
                                value={input.name}
                                name='name'
                                onChange={handleChange}
                                required>
                            </input>
                            {errors.name && (
                                <p className = {styles.erros}>{errors.name}</p>
                                )}
                    </div>

                    <div>
                        <label className={styles.label}>Height:</label>
                            <input
                                className={styles.input}
                                type='text'
                                value={input.height}
                                name='height'
                                onChange={handleChange}
                                required>
                            </input>
                            {errors.height && (
                                <p className = {styles.erros}>{errors.height}</p>
                                )}
                    </div>

                    <div>
                        <label className={styles.label}>Weight:</label>
                            <input
                                className={styles.input}
                                type='text'
                                value={input.weight}
                                name='weight'
                                onChange={handleChange}
                                required>
                            </input>
                            {errors.weight && (
                                <p className = {styles.erros}>{errors.weight}</p>
                                )}
                    </div>

                    <div>
                        <label className={styles.label}>Life Span:</label>
                            <input  
                                className={styles.input}
                                type='text'
                                value={input.life_span}
                                name='life_span'
                                onChange={handleChange}
                                required>
                            </input>
                            {errors.life_span && (
                                <p className = {styles.erros}>{errors.life_span}</p>
                                )}
                    </div>

                <div>
                        <label className={styles.label}>Temperament: </label>
                            <select className = {styles.select} onChange={handleSelect} required>
                                {temperaments.map((temp) => (
                                    <option value={temp.name} key={temp.id}>{temp.name}</option>
                                    ))}
                            </select>
                    </div>

                
                    <div className={styles.piepagina}><button className={styles.buttonCreate} type='submit'>Here you are!</button></div>
                    </form>
                </div>
                
                </div>

                <div className = {styles.sider_box}>
                    {input.temperament.map(el => 
                        <div key={el} className ={styles.countemp}>
                            <p>{el}</p>
                            <button className = {styles.btnclose} onClick={()=>handleDelete(el)}>x</button>
                        </div>)}
                </div>
            
        </div>
    )
}



