import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Landing.module.css'

const logo = 'https://images.vexels.com/media/users/3/202064/isolated/preview/0f53d739b41ae9302a3e745751181bee-corazon-con-huellas-de-perro-plano.png'

export default function LandingPage () {
    return (
        <div class={styles.landing}>
            <NavLink to = '/home'>
                <img className={styles.image} src={logo} alt='to Home'></img>
            </NavLink>
        </div>
    )
}