import React from "react";
import { Link } from "react-router-dom";
import styles from './DogCard.module.css'
const img = 'https://cdn.wamiz.fr/cdn-cgi/image/quality=80,width=1200,height=675,fit=cover/https://cdn.wamiz.fr/article/main-picture/5e9090c61ba68497961350.jpg'

export default function DogCard({id,name, image, weight, temperament}) {
    return (
        <div className={styles.card}>
            <div  >
                <Link  to={`/detail/${id}`} >
                    <img className={styles.image} src={image} alt={img} />
                </Link>
            </div>
            <div className={styles.texto}>
                <h3 className={styles.name}>{name}</h3>
                <h5>Peso: {weight} Kg.</h5>
                <h5>{temperament}</h5>
            </div>
        </div>
    )

};

