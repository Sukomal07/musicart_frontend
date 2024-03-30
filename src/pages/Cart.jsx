import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { isMobile } from 'react-device-detect'
import { HiChevronDown, HiChevronUp, HiOutlineShoppingBag } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from "../layout/Layout"
import { addToCart, getCart } from "../redux/slices/CartSlice";
import style from '../styles/cart.module.css'
function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.cart) || {}
    const [dropdownState, setDropdownState] = useState({});
    const [refresh, setRefresh] = useState(false)


    const handleToggleDropdown = (itemId) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    };

    const handleSelectQuantity = async (event, productId, quantity) => {
        event.stopPropagation()
        setDropdownState((prevState) => ({
            ...prevState,
            [productId]: false
        }));
        const newItem = { productId, quantity }
        await dispatch(addToCart(newItem))
        setRefresh(true)
    };

    function calculateTotal(amount) {
        if (!amount) {
            return 0
        } else {
            return amount + 45
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getCart())
        }
        fetchData()
        if (refresh) {
            setRefresh(false)
        }
    }, [refresh])


    return (
        <Layout>
            <section className={style.cart_container}>
                {
                    isMobile ? (
                        <span onClick={() => navigate('/')} className={style.back_btn}>
                            <Icon icon="mdi:arrow-left" color='black' width={30} fontWeight={600} />
                        </span>
                    ) : (
                        <span onClick={() => navigate('/')} className={style.back_btn}>Back to products</span>
                    )
                }
                {
                    !isMobile && (
                        <div className={style.my_cart}>
                            <HiOutlineShoppingBag size={30} />
                            <span>My Cart</span>
                        </div>
                    )
                }
                <div className={style.cart_details_container}>
                    <div className={style.cart_details}>
                        <div className={style.all_product}>
                            {cart?.items && cart?.items?.map((item, index) => (
                                <div key={item?._id}>
                                    <div className={style.product}>
                                        <div className={style.image_container}>
                                            <img src={item?.picture} alt="logo" className={style.img} />
                                        </div>
                                        <table>
                                            <tbody className={style.product_details}>
                                                <tr className={style.tr}>
                                                    <th>{item?.name}</th>
                                                    <td className={style.product_colour}> Colour: {item?.colour}</td>
                                                    <td className={style.product_colour}>In Stock</td>
                                                </tr>
                                                <tr className={isMobile ? style.flex : style.tr}>
                                                    <th>Price</th>
                                                    <td>₹{item?.price}</td>
                                                </tr>
                                                <tr className={isMobile ? style.flex : style.tr}>
                                                    <th>Quantity</th>
                                                    <td>
                                                        <div className={style.quantity} onClick={() => handleToggleDropdown(item?._id)}>
                                                            <span>{item?.quantity}</span>
                                                            {dropdownState[item?._id] ? <HiChevronUp /> : <HiChevronDown />}
                                                            {dropdownState[item?._id] && (
                                                                <ul className={style.dropdown}>
                                                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((quantity, idx) => (
                                                                        <React.Fragment key={quantity}>
                                                                            <li onClick={(event) => handleSelectQuantity(event, item?._id, quantity)}>{quantity}</li>
                                                                            {idx !== 7 && <hr />}
                                                                        </React.Fragment>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className={isMobile ? style.flex : style.tr}>
                                                    <th>Total</th>
                                                    <td>₹{item?.totalItemPrice}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {index !== cart.items.length - 1 && <hr />}
                                </div>
                            ))}
                        </div>
                        {
                            !isMobile && (
                                <div className={style.total_amount}>
                                    {
                                        cart?.items && (
                                            <h3>{cart?.items?.length} Item</h3>
                                        )
                                    }
                                    {
                                        cart?.totalCartPrice && (
                                            <h3>₹{cart?.totalCartPrice}</h3>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div className={style.price_details}>
                        <div className={style.charge}>
                            {!isMobile && (
                                <h4 >PRICE DETAILS</h4>
                            )}
                            <div className={style.flex}>
                                <p>Total MRP</p>
                                {
                                    cart?.totalCartPrice && (
                                        <p>₹{cart?.totalCartPrice}</p>
                                    )
                                }
                            </div>
                            <div className={style.flex}>
                                <p>Discount on MRP</p>
                                <p>₹0</p>
                            </div>
                            <div className={style.flex}>
                                <p>Convenience Fee</p>
                                <p>₹45</p>
                            </div>
                        </div>
                        <div className={style.total}>
                            <div className={style.flex}>
                                <h3>Total Amount</h3>
                                <p>₹{calculateTotal(cart?.totalCartPrice)}</p>
                            </div>
                            {cart && (
                                <button className={style.btn} onClick={() => navigate('/checkout')}>place order</button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Cart
