import { Icon } from '@iconify/react'
import { useState } from "react"
import { isMobile } from 'react-device-detect'
import { VscChevronDown, VscChevronUp } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Successfull from "../components/Successfull"
import Layout from '../layout/Layout'
import { getCart } from '../redux/slices/CartSlice'
import { checkout } from "../redux/slices/InvoiceSlice"
import style from '../styles/checkout.module.css'

function Checkout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { name } = useSelector((state) => state.auth?.data) || ""
    const { totalCartPrice } = useSelector((state) => state.cart?.cart) || 0
    const { items } = useSelector((state) => state.cart?.cart) || []
    const [index, setIndex] = useState(0)
    const [showDropdown, setShowDropdown] = useState(false)
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({
        address: '',
        payment_method: '',
        orderTotal: 0
    })
    const [errors, setErrors] = useState({
        address: '',
        payment_method: ''
    })
    const handleToggle = () => {
        setShowDropdown(!showDropdown)
    }
    const handleChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            address: event.target.value
        }))
        setErrors((prevData) => ({
            ...prevData,
            address: ''
        }))
    }
    function calculateTotal(amount) {
        if (!amount) {
            return 0
        } else {
            return amount + 45
        }
    }

    const handleSelect = (method) => {
        const newOrderTotal = calculateTotal(totalCartPrice);

        setData((prevData) => ({
            ...prevData,
            payment_method: method,
            orderTotal: newOrderTotal
        }));

        setErrors((prevData) => ({
            ...prevData,
            payment_method: ''
        }));

        handleToggle();
    }

    function format(str) {
        switch (str) {
            case 'pay_on_delivery':
                return 'Pay on Delivery'
            case 'card':
                return 'Card'
            case 'upi':
                return 'UPI'

            default:
                return 'Mode of payment'
        }
    }
    const handleCheckout = async () => {
        let isValid = true
        const newErrors = { ...errors }
        if (!data.address) {
            isValid = false
            newErrors.address = 'Address is required'
        }
        if (!data.payment_method) {
            isValid = false
            newErrors.payment_method = 'Payment method is required'
        }
        if (isValid && data.orderTotal > 0) {
            const res = await dispatch(checkout(data))
            if (res?.payload?.success) {
                setData({
                    address: '',
                    payment_method: '',
                    orderTotal: 0
                })
                setSuccess(true)
                await dispatch(getCart())
            }
        } else {
            setErrors(newErrors)
        }
    }
    return (
        <Layout>
            <section className={style.checkout_container}>
                {
                    isMobile ? (
                        <span onClick={() => navigate('/cart')} className={style.back_btn}>
                            <Icon icon="mdi:arrow-left" color='black' width={30} fontWeight={600} />
                        </span>
                    ) : (
                        <span onClick={() => navigate('/cart')} className={style.back_btn}>Back to cart</span>
                    )
                }
                <h2 className={style.checkout}>Checkout</h2>
                <div style={{ display: 'flex' }} className={style.address_container}>
                    <div className={style.checkout_details}>
                        <div className={style.user_details}>
                            <div className={style.space}>
                                <h3 className={style.h3}>1. Delivery address</h3>
                                <div className={style.message_container}>
                                    <p>{name}</p>
                                    <textarea name="message" id="message" placeholder="Enter address" value={data.address} onChange={handleChange} className={style.textarea} style={errors.address ? { border: '1px solid red' } : {}}></textarea>
                                    {errors.address && (
                                        <span style={{ color: 'red' }}>{errors.address}</span>
                                    )}
                                </div>
                            </div>
                            <hr />
                            <div className={style.space}>
                                <h3 className={style.h3}>2. Payment method</h3>
                                <div className={style.payment_mode} style={errors.payment_method ? { border: '1px solid red' } : {}} onClick={handleToggle}>
                                    <span> {format(data.payment_method)}</span>
                                    {showDropdown ? <VscChevronUp /> : <VscChevronDown />}
                                    {showDropdown && (
                                        <ul className={style.dropdown}>
                                            <li onClick={() => handleSelect('pay_on_delivery')}>Pay on Delivery</li>
                                            <hr />
                                            <li onClick={() => handleSelect('upi')}>UPI</li>
                                            <hr />
                                            <li onClick={() => handleSelect('card')}>Card</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <hr />
                            <div className={style.space}>
                                <h3 className={style.h3}>3. Review items and delivery</h3>
                                <div className={style.allproduct}>
                                    <div className={style.image_container}>
                                        {items && items.map((item, index) => (
                                            <div key={item?._id} className={style.image_box} onClick={() => setIndex(index)}>
                                                <img src={item?.picture} alt="logo" className={style.img} />
                                            </div>
                                        ))}
                                    </div>
                                    {items && (
                                        <div className={style.product_name}>
                                            <h3>{items[index]?.name}</h3>
                                            <p className={style.color}>Colour : {items[index]?.colour}</p>
                                            <p className={style.p} >Estimated delivery :</p>
                                            <p className={style.p}>Monday — FREE Standard Delivery</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {!isMobile && (
                            <div className={style.bottom_div}>
                                <span className={style.btn} onClick={handleCheckout}>Place your order</span>
                                <div style={{ fontSize: '13px' }}>
                                    <h3 className={style.h3}>Order Total : ₹{calculateTotal(totalCartPrice)} </h3>
                                    <p>By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={style.order_total}>
                        {!isMobile && (
                            <div className={style.btn_container}>
                                <span className={style.btn} onClick={handleCheckout}>Place your order</span>
                                <p className={style.term}>By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
                            </div>
                        )}
                        {
                            !isMobile && (
                                <hr />
                            )
                        }
                        <div className={style.order_summary}>
                            <h3>Order Summary</h3>
                            <div className={style.price_div}>
                                <div className={style.order_total_details}>
                                    <span>Items:</span>
                                    <span>₹{totalCartPrice}.00</span>
                                </div>
                                <div className={style.order_total_details}>
                                    <span>Delivery</span>
                                    <span>₹45.00</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className={style.order_total_details}>
                            <h3 className={style.h3}>Order Total:</h3>
                            <h3 className={style.h3}>₹{calculateTotal(totalCartPrice)}.00</h3>
                        </div>
                        <hr />
                        {isMobile && (
                            <div className={style.btn_container}>
                                <p className={style.term}>By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
                                <span className={style.btn} onClick={handleCheckout}>Place your order</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {
                success && (
                    <Successfull />
                )
            }
        </Layout>
    )
}

export default Checkout
