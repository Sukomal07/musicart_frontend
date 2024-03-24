import Cookies from "js-cookie";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import Logo from '../assets/logo.png'
import { logout } from "../redux/slices/Authslice";
import style from '../styles/navbar.module.css'
function Navbar() {
    const location = useLocation()
    const dispatch = useDispatch()
    const { data } = useSelector((state) => state.auth)
    let timeoutId;
    const handleMouseOver = () => {
        clearTimeout(timeoutId);
        const popup = document.getElementById("popup");
        popup.style.display = "flex";
    };

    const handleMouseOut = () => {
        timeoutId = setTimeout(() => {
            const popup = document.getElementById("popup");
            popup.style.display = "none";
        }, 200)
    };
    function modifyName(name) {
        const parts = name?.split(" ");
        if (parts?.length >= 2) {
            return parts[0].charAt(0) + parts[1].charAt(0);
        }
        return name?.charAt(0);
    }
    async function handleLogout() {
        await dispatch(logout())
        Cookies.remove('authToken')
    }
    return (
        <div className={style.navbar}>
            <div className={style.flex}>
                <div className={style.logo_container}>
                    <img src={Logo} alt="logo" className={style.logo_image} />
                    <h1 className={style.logo_text}>Musicart</h1>
                </div>
                <div className={style.nav_links}>
                    <Link to={'/'} className={style.link}>Home</Link>
                    <Link to={'/invoice'} className={style.link}>Invoice</Link>
                </div>
            </div>
            <div className={style.flex}>
                <div className={style.cart}>
                    <div>
                        <AiOutlineShoppingCart size={'20px'} />
                        View Cart
                    </div>
                    <p>0</p>
                </div>
                {location.pathname === "/" && data?.name && (
                    <div className={style.user} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        <p>{modifyName(data?.name)}</p>
                    </div>
                )}
                <div id="popup" className={style.popup} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <p className={style.p}>{data?.name}</p>
                    <hr className={style.hr} />
                    <p className={style.p} onClick={handleLogout}>Logout</p>
                </div>

            </div>
        </div>
    )
}

export default Navbar
