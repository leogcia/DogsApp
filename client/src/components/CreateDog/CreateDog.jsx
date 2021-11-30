import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemp, postDog } from "../../actions";


function validateForm(input) {
    let errors = {};

        if(!input.name) {
            errors.name = 'Se requiere escribir una Raza';
        }
        
        if(!input.height) {
            errors.height = 'Se requiere escribir un height'
        } else {
            if(!/\d{1,2}-\d{1,2}/g.test(input.height)){
                errors.height = 'Escribe valores min y max. Ejemplo: 10-50'
            }
        }
        
        if(!input.weight) {
            errors.weight = 'Se requiere escribir un weight'
        } else {
            if(!/\d{1,2}-\d{1,2}/g.test(input.weight)){
                errors.weight = 'Escribe valores min y max. Ejemplo: 10-50'
            }
        }
        
        if(!input.life_span) {
            errors.life_span = 'Se requiere escribir un life_span'
        } else {
            if(!/\d{1,2}-\d{1,2}/g.test(input.life_span)){
                errors.life_span = 'Escribe valores min y max. Ejemplo: 10-50'
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
            alert("Ya seleccionaste éste temperamento. Intenta de nuevo :)");
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
            alert('Perro creado :)')
            setInput({
                image:"",
                name:"",
                height:"",
                weight:"",
                life_span:"",
                temperament:[],
            })
        } else alert('Uups! algo salió mal :(')
    }

    useEffect(()=>{
        dispatch(getTemp())
    }, [dispatch])


    return (
        <div>
            
            <Link to= '/home'><button className='button'>Home</button></Link>
            <h1>Crea a tu perro!!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Raza:</label>
                        <input
                            type='text'
                            value={input.name}
                            name='name'
                            onChange={handleChange}
                            required>
                        </input>
                        {errors.name && (
                            <p className = 'errores'>{errors.name}</p>
                            )}
                </div>

                <div>
                    <label>Height:</label>
                        <input
                            type='text'
                            value={input.height}
                            name='height'
                            onChange={handleChange}
                            required>
                        </input>
                        {errors.height && (
                            <p className = 'errores'>{errors.height}</p>
                            )}
                </div>

                <div>
                    <label>Weight:</label>
                        <input
                            type='text'
                            value={input.weight}
                            name='weight'
                            onChange={handleChange}
                            required>
                        </input>
                        {errors.weight && (
                            <p className = 'errores'>{errors.weight}</p>
                            )}
                </div>

                <div>
                    <label>Life Span:</label>
                        <input
                            type='text'
                            value={input.life_span}
                            name='life_span'
                            onChange={handleChange}
                            required>
                        </input>
                        {errors.life_span && (
                            <p className = 'errores'>{errors.life_span}</p>
                            )}
                </div>

                <div>
                    <label>Temperament:</label>
                        <select onChange={handleSelect} required>
                            {temperaments.map((temp) => (
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            ))}
                        </select>
                </div>

                <ul><li>{input.temperament.map(el => el + ', ')}</li></ul>
                <button type='submit'>Crear Perro!</button>

            </form>
            {input.temperament.map(el => 
                <div className='divTemp'>
                    <p>{el}</p>
                    <button className='btnClose' onClick={()=>handleDelete(el)}>x</button>
                </div>)}

        </div>
    )
}
