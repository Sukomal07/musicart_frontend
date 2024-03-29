import { Link } from 'react-router-dom'

import confetti from '../assets/confetti.png'
import Logo from '../assets/logo.png'
import style from '../styles/successfull.module.css'
import Footer from './Footer'

function Successfull() {
    return (
        <div className={style.container}>
            <div className={style.logo_container}>
                <img src={Logo} alt="logo" className={style.logo_image} />
                <h1 className={style.logo_text}>Musicart</h1>
            </div>
            <div className={style.overlay}>
                <img src={confetti} alt="confetti" width={'100px'} />
                <h1 style={{ fontSize: '20px' }}>Order is placed successfully!</h1>
                <p className={style.p}>You  will be receiving a confirmation email with order details</p>
                <Link to={'/'} className={style.btn}>Go back to Home page</Link>
            </div>
            <Footer />
        </div>
    )
}

export default Successfull
