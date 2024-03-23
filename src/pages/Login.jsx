import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'

import Logo from '../assets/logo.png'
import Footer from '../components/Footer'
import style from '../styles/auth.module.css'

function Login() {
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
                                <p>Sign in.</p>
                                <span style={{ fontSize: '13px' }}>Already a customer?</span>
                            </div>
                        ) : (

                            <p style={{ fontSize: '22px' }}>Sign in</p>
                        )
                    }
                    <div className={style.input_container}>
                        <label className={style.label} htmlFor="emailOrMobile">Enter your email or mobile number</label>
                        <input className={style.input} type="text" id='emailOrMobile' name='emailOrMobile' autoComplete='off' autoFocus />
                    </div>
                    <div className={style.input_container}>
                        <label className={style.label} htmlFor="password">Password</label>
                        <input className={style.input} type="password" id='password' name='password' autoComplete='off' />
                    </div>
                    <button type='submit' className={style.btn}>Continue</button>
                    <p style={{ fontSize: '10px' }}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
                </form>
                <div className={style.newto}>
                    <hr className={style.hr} />
                    <p>New to Musicart?</p>
                    <hr className={style.hr} />
                </div>
                <Link to={'/signup'} className={style.signup}>Create your Musicart account</Link>
            </div>
            <Footer />
        </div>
    )
}

export default Login
