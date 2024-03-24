import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../assets/logo.png'
import Footer from '../components/Footer'
import { login } from '../redux/slices/Authslice.js'
import style from '../styles/auth.module.css'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = import.meta.env.VITE_ACCESS_TOKEN
    const [formData, setFormData] = useState({
        emailOrMobile: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        emailOrMobile: '',
        password: ''
    });
    const [mobileView, setMobileView] = useState(isMobile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors, [name]: ''
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formIsValid = true;
        const newErrors = { ...errors };

        if (!formData.emailOrMobile) {
            formIsValid = false
            newErrors.emailOrMobile = 'Email or number is required'
        }

        if (!formData.password) {
            formIsValid = false;
            newErrors.password = 'Password is required';
        }

        if (formIsValid) {
            const response = await dispatch(login(formData));
            if (response.payload?.success) {
                setFormData({
                    emailOrMobile: '',
                    password: ''
                })
                navigate('/')
                Cookies.set('authToken', token, { expires: 7 });
            }
        } else {
            setErrors(newErrors);
        }
    };

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
                <form className={style.form} onSubmit={handleSubmit}>
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
                        <input className={style.input} type="text" id='emailOrMobile' name='emailOrMobile' autoComplete='off' autoFocus value={formData.emailOrMobile} onChange={handleChange} style={errors.emailOrMobile ? { borderColor: 'red' } : {}} />
                        <span className={style.error}>{errors.emailOrMobile}</span>
                    </div>
                    <div className={style.input_container}>
                        <label className={style.label} htmlFor="password">Password</label>
                        <input className={style.input} type="password" id='password' name='password' autoComplete='off' value={formData.password} onChange={handleChange} style={errors.password ? { borderColor: 'red' } : {}} />
                        <span className={style.error}>{errors.password}</span>
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
