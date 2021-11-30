import React from "react";
import { Link } from "react-router-dom";
const img = 'https://cdn.wamiz.fr/cdn-cgi/image/quality=80,width=1200,height=675,fit=cover/https://cdn.wamiz.fr/article/main-picture/5e9090c61ba68497961350.jpg'

export default function DogCard({id,name, image, weight, temperament}) {
    return (
        <div>
            <div className='DogCard' >
                <Link to={`/detail/${id}`}>
                    <img src={image} alt={img} width='200px' height='250px' />
                </Link>
            </div>
            <div>
                <h3>{name}</h3>
                <h5>Peso: {weight} Kg.</h5>
                <h5>{temperament}</h5>
            </div>
        </div>
    )

};

