import { Icon } from '@iconify/react'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from 'react-router-dom'

import Layout from '../layout/Layout'
import style from '../styles/checkout.module.css'

function InvoiceDetails() {
    const navigate = useNavigate()
    const { state } = useLocation() || {}
    const { name } = useSelector((state) => state.auth?.data) || ""
    const [index, setIndex] = useState(0)

    function format(str) {
        switch (str) {
            case 'pay_on_delivery':
                return 'Pay on Delivery'
            case 'card':
                return 'Card'
            case 'upi':
                return 'UPI'

            default:
                return ''
        }
    }
    function calculateTotalItemprice(amount) {
        if (!amount) {
            return 0
        } else {
            return amount - 45
        }
    }

    return (
        <Layout>
            <section className={style.checkout_container}>
                {
                    isMobile ? (
                        <span onClick={() => navigate('/invoices')} className={style.back_btn}>
                            <Icon icon="mdi:arrow-left" color='black' width={30} fontWeight={600} />
                        </span>
                    ) : (
                        <span onClick={() => navigate('/invoices')} className={style.back_btn}>Back to invoices</span>
                    )
                }
                <h2 className={style.checkout}>Invoice</h2>
                <div style={{ display: 'flex' }} className={style.address_container}>
                    <div className={style.checkout_details}>
                        <div className={style.user_details}>
                            <div className={style.space}>
                                <h3 className={style.h3}>1. Delivery address</h3>
                                <div className={style.message_container}>
                                    <p>{name}</p>
                                    <p>{state?.address}</p>
                                </div>
                            </div>
                            <hr />
                            <div className={style.space}>
                                <h3 className={style.h3}>2. Payment method</h3>
                                <span className={style.payment_mode}>
                                    {format(state?.payment_method)}
                                </span>
                            </div>
                            <hr />
                            <div className={style.space}>
                                <h3 className={style.h3}>3. Review items and delivery</h3>
                                <div className={style.allproduct}>
                                    <div className={style.image_container}>
                                        {state?.items && state?.items.map((item, index) => (
                                            <div key={index} className={style.image_box} onClick={() => setIndex(index)}>
                                                <img src={item?.picture} alt="logo" className={style.img} />
                                            </div>
                                        ))}
                                    </div>
                                    {state?.items && (
                                        <div className={style.product_name}>
                                            <h3>{state?.items[index]?.name}</h3>
                                            <p className={style.color}>Colour : {state?.items[index]?.colour}</p>
                                            <p className={style.p} >Estimated delivery :</p>
                                            <p className={style.p}>Monday — FREE Standard Delivery</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.order_total}>
                        <div className={style.order_summary}>
                            <h3>Order Summary</h3>
                            <div className={style.price_div}>
                                <div className={style.order_total_details}>
                                    <span>Items:</span>
                                    <span>₹{calculateTotalItemprice(state?.orderTotal)}.00</span>
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
                            <h3 className={style.h3}>₹{state?.orderTotal}.00</h3>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default InvoiceDetails
