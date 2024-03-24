import Cookies from "js-cookie";
import { BiPhoneCall } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { logout } from "../redux/slices/Authslice";
import style from '../styles/header.module.css'
function Header() {
    const location = useLocation()
    const dispatch = useDispatch()
    const { data } = useSelector((state) => state.auth)
    async function handleLogout() {
        await dispatch(logout())
        Cookies.remove('authToken')
    }
    return (
        <div className={style.container}>
            <div className={style.phone}>
                <BiPhoneCall />
                <p>912121131313</p>
            </div>
            <div className={style.offer}>
                <p className={style.text}>Get 50% off on selected items</p>
                |
                <p className={style.text}>Shop Now</p>
            </div>
            <div className={style.right}>
                {data?._id ? (
                    location.pathname !== "/" && <span className={style.link} onClick={handleLogout}>Logout</span>
                ) : (
                    <>
                        <Link to={'/login'} className={style.link}>Login</Link>
                        |
                        <Link to={'/signup'} className={style.link}>Signup</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header
