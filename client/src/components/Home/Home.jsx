import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from "../../actions/index";
import DogCard from "./DogCard";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";



export default function Home () {

    const url = 'https://cdn.wamiz.fr/cdn-cgi/image/quality=80,width=1200,height=675,fit=cover/https://cdn.wamiz.fr/article/main-picture/5e9090c61ba68497961350.jpg'

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.filter)

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    allDogs?.map((e) =>{
        if(e.createdInDb){
            e.image = url
            e.temperament= ""
            for(let i = 0; i<e.temperaments.length; i++){
            e.temperament += e.temperaments[i].name.toString() + ", "
            }
        }
    })


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs());
    },[dispatch])


    return (
        <>

            <NavBar/>

            <div>

                <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />

            {
                currentDogs?.map( (el) => {
                    return (
                            <DogCard 
                            key={el.id}
                            id={el.id}
                            name={el.name} 
                            weight={el.weight}
                            image={el.image}
                            temperament={el.temperament}
                            />
                    )                      
                })
            }

            </div>

        </>
    );
};
