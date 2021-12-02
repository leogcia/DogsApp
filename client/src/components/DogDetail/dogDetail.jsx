import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getId } from "../../actions";
import styles from './DogDetail.module.css'
import BarraTitulo from "./BarraTitulo";


export default function DogDetail() {
    const url = 'https://cdn.wamiz.fr/cdn-cgi/image/quality=80,width=1200,height=675,fit=cover/https://cdn.wamiz.fr/article/main-picture/5e9090c61ba68497961350.jpg'
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getId(id));
    }, [dispatch])

    const myDog = useSelector((state) => state.dogDetail)
    

    return (
        <div className={styles.body}>
                <BarraTitulo/>
            {
                myDog.length > 0 ?
                <div className={styles.card}>
                    <h1 className={styles.name}>{myDog[0].name}</h1>
                <div className={styles.order}>
                    <img className={styles.img} src={myDog[0].image? myDog[0].image: myDog[0].image=url} alt='' width='300px' height='400px'></img>
                    <ul className={styles.label}>
                        <h3 >Height: {myDog[0].height} cm.</h3>
                        <h3 >Weight: {myDog[0].weight} kg.</h3>
                        <h3 >Life Span: {myDog[0].life_span}. </h3>
                        <h4>Temperaments: {!myDog[0].createdInDb? myDog[0].temperament + ' ': myDog[0].temperaments.map(el=>el.name + (', '))}</h4>
                    </ul>
                </div>
                    
                </div> : <p>Loading...</p>
            }

        </div>
    )
}