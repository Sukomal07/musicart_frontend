import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../assets/logo.png'
import Footer from '../components/Footer'
import { createAccount } from '../redux/slices/Authslice.js'
import style from '../styles/auth.module.css'

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = import.meta.env.VITE_ACCESS_TOKEN
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        mobile: '',
        email: '',
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

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        const mobileRegex = /^\d{10}$/;

        if (!formData.name) {
            formIsValid = false;
            newErrors.name = 'Name is required';
        }
        if (!formData.mobile) {
            formIsValid = false
            newErrors.mobile = 'Mobile number is required'
        } else if (!mobileRegex.test(formData.mobile)) {
            formIsValid = false
            newErrors.mobile = 'Please enter valid number'
        }
        if (!formData.email) {
            formIsValid = false;
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            formIsValid = false;
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            formIsValid = false;
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(formData.password)) {
            formIsValid = false;
            newErrors.password = 'Password must be at least 6 characters long and include both letters and numbers';
        }

        if (formIsValid) {
            const response = await dispatch(createAccount(formData));
            if (response.payload?.success) {
                setFormData({
                    name: '',
                    mobile: '',
                    email: '',
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
                                <p>Create account.</p>
                                <span style={{ fontSize: '13px' }}>Don't have an account?</span>
                            </div>
                        ) : (

                            <p style={{ fontSize: '22px' }}>Create Account</p>
                        )
                    }
                    <div className={style.input_container}>
                        <label className={style.label} htmlFor="name">Your name</label>
                        <input className={style.input} type="text" id='name' name='name' autoComplete='off' autoFocus value={formData.name} onChange={handleChange} style={errors.name ? { borderColor: 'red' } : {}} />
                        <span className={style.error}>{errors.name}</span>
                    </div>
                    <div className={style.input_container}>
                        <label className={style.label} htmlFor="mobile">Mobile number</label>
                        <input className={style.input} type="text" id='mobile' name='mobile' autoComplete='off' value={formData.mobile} onChange={handleChange} style={errors.mobile ? { borderColor: 'red' } : {}} />
                        <span className={style.error}>{errors.mobile}</span>
                    </div>
                    <div className={style.input_container}>
                        <label className={style.label} htmlFor="email">Email id</label>
                        <input className={style.input} type="email" id='email' name='email' autoComplete='off' value={formData.email} onChange={handleChange} style={errors.email ? { borderColor: 'red' } : {}} />
                        <span className={style.error}>{errors.email}</span>
                    </div>
                    <div className={style.input_container}>
                        <label className={style.label} htmlFor="password">Password</label>
                        <input className={style.input} type="password" id='password' name='password' autoComplete='off' value={formData.password} onChange={handleChange} style={errors.password ? { borderColor: 'red' } : {}} />
                        <span className={style.error}>{errors.password}</span>
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
