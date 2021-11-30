import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getId } from "../../actions";

export default function DogDetail() {
    const url = 'https://cdn.wamiz.fr/cdn-cgi/image/quality=80,width=1200,height=675,fit=cover/https://cdn.wamiz.fr/article/main-picture/5e9090c61ba68497961350.jpg'
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getId(id));
    }, [dispatch])

    const myDog = useSelector((state) => state.dogDetail)
    

    return (
        <div>

            {
                myDog.length > 0 ?
                <div>
                    <img src={myDog[0].image? myDog[0].image: myDog[0].image=url} alt='' width='300px' height='400px'></img>
                    <h1>{myDog[0].name}</h1>
                    <h2>Height: {myDog[0].height} cm.</h2>
                    <h2>Weight: {myDog[0].weight} kg.</h2>
                    <h2>Life Span: {myDog[0].life_span}. </h2>
                    <h4>Temperaments: {!myDog[0].createdInDb? myDog[0].temperament + ' ': myDog[0].temperaments.map(el=>el.name + (', '))}</h4>
                </div> : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>

        </div>
    )
}