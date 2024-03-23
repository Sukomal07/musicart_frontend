import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'

import Logo from '../assets/logo.png'
import Footer from '../components/Footer'
import style from '../styles/auth.module.css'

function Signup() {
    const [mobileView, setMobileView] = useState(isMobile);

    useEffect(() => {
        setMobileView(isMobile);
    }, []);
    return (
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.logo_container}>
                    <img src={Logo} alt="logo" className={style.logo_image} />
                    <h1 className={style.logo_text}>Musicart</h1>
                </div>
                {mobileView && (
                    <p className={style.welcome}>Welcome</p>
                )}
                <form className={style.form}>
                    {
                        mobileView ? (
                            <div className={style.create_account}>
                                <p>Create account.</p>
                                <span style={{ fontSize: '13px' }}>Don't have an account?</span>
                            </div>
                        ) : (

                            <p style={{ fontSize: '22px' }}>Create Account</p>
                        )
                    }
                    <div className={style.input_container}>
                        <label className={style.label} htmlFor="name">Your name</label>
                        <input className={style.input} type="text" id='name' name='name' autoComplete='off' autoFocus />
                    </div>
                    <div className={style.input_container}>
                        <label className={style.label} htmlFor="number">Mobile number</label>
                        <input className={style.input} type="text" id='number' name='number' autoComplete='off' />
                    </div>
                    <div className={style.input_container}>
                        <label className={style.label} htmlFor="email">Email id</label>
                        <input className={style.input} type="email" id='email' name='email' autoComplete='off' />
                    </div>
                    <div className={style.input_container}>
                        <label className={style.label} htmlFor="password">Password</label>
                        <input className={style.input} type="password" id='password' name='password' autoComplete='off' />
                    </div>
                    <p className={style.text}>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.</p>
                    <button type='submit' className={style.btn}>Continue</button>
                    <p style={{ fontSize: '10px' }}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
                </form>
                <div className={style.signin}>
                    Already have an account?<Link to={'/login'}>Sign in</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signup
