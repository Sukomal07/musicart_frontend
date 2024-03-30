import { Icon } from '@iconify/react'
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { logout } from "../redux/slices/Authslice";
import { getCart } from "../redux/slices/CartSlice";
import style from '../styles/mobileNavbar.module.css'
function MobileNavbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data } = useSelector((state) => state.auth)
    const { totalCartCount } = useSelector((state) => state.cart?.cart) || {};

    async function handleLogout() {
        await dispatch(logout())
        await dispatch(getCart())
        Cookies.remove('authToken')
    }

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getCart())
        }
        fetchData()
    }, [])
    return (
        <div className={style.navbar}>
            <div className={style.flex} onClick={() => navigate('/')}>
                <Icon icon="teenyicons:home-outline" color='#2E0052' width={35} style={{ marginTop: '6px' }} />
                <p>Home</p>
            </div>
            <div className={style.flex} onClick={() => navigate('/cart')}>
                <Icon icon="bi:cart-plus" color='#2E0052' width={35} style={{ marginTop: '6px' }} />
                <p>Cart</p>
                <span className={style.cartvalue}>{totalCartCount || 0}</span>
            </div>
            {
                location.pathname !== '/cart' && location.pathname !== '/checkout' && (
                    <div className={style.flex} onClick={() => navigate('/invoices')}>
                        <Icon icon="mdi:invoice-edit" color='#2E0052' width={35} style={{ marginTop: '6px' }} />
                        <p>Invoice</p>
                    </div>
                )
            }
            {
                data?._id ? (
                    <div className={style.flex} onClick={handleLogout}>
                        <Icon icon="ic:sharp-person-outline" color='#2E0052' width={35} style={{ marginTop: '6px' }} />
                        <p>Logout</p>
                    </div>
                ) : (
                    <div className={style.flex} onClick={() => navigate('/login')}>
                        <Icon icon="mdi:person-alert-outline" color='#2E0052' width={35} style={{ marginTop: '6px' }} />
                        <p>Login</p>
                    </div>
                )
            }
        </div>
    )
}

export default MobileNavbar
