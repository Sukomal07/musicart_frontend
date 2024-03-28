import Cookies from "js-cookie";
import { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Logo from '../assets/logo.png'
import { logout } from "../redux/slices/Authslice";
import { getCart } from "../redux/slices/CartSlice";
import style from '../styles/navbar.module.css'
function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = location || {};
    const { data } = useSelector((state) => state.auth)
    const { totalCartCount } = useSelector((state) => state.cart?.cart) || 0;

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
        await dispatch(getCart())
        Cookies.remove('authToken')
        handleMouseOut()
    }

    function getPageTitle(pathname, state) {
        switch (pathname) {
            case '/cart':
                return 'View Cart';
            case '/checkout':
                return 'Checkout';
            case '/invoices':
                return 'Invoices';
            default:
                return state?.name || '';
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getCart())
        }
        fetchData()
    }, [])
    return (
        <div className={style.navbar}>
            <div className={style.flex}>
                <div className={style.logo_container}>
                    <img src={Logo} alt="logo" className={style.logo_image} />
                    <h1 className={style.logo_text}>Musicart</h1>
                </div>
                <div className={style.nav_links}>
                    {location.pathname === '/' ? (
                        <>
                            <Link to={'/'} className={style.link}>Home</Link>
                            <Link to={'/invoice'} className={style.link}>Invoice</Link>
                        </>
                    ) : (
                        <span>Home / {getPageTitle(location.pathname, state)}</span>
                    )}
                </div>
            </div>
            <div className={style.flex}>
                {
                    location.pathname !== "/checkout" && (
                        <div className={style.cart} onClick={() => navigate('/cart')}>
                            <div>
                                <AiOutlineShoppingCart size={'20px'} />
                                View Cart
                            </div>
                            {location.pathname !== "/cart" && (
                                <p>{totalCartCount || 0}</p>
                            )}
                        </div>
                    )
                }
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
