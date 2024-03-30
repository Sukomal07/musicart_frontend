import { Icon } from '@iconify/react'
import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from '../layout/Layout'
import { getInvoices } from '../redux/slices/InvoiceSlice'
import style from '../styles/invoice.module.css'
function Invoices() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { invoices } = useSelector((state) => state.invoices) || []
    const { name } = useSelector((state) => state.auth?.data) || ""

    const viewInvoice = (invoice) => {
        navigate(`/invoices/${invoice._id}`, { state: invoice });
    };


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getInvoices())
        }
        fetchData()
    }, [])
    return (
        <Layout>
            <section className={style.container}>
                {
                    isMobile ? (
                        <span onClick={() => navigate('/')} className={style.back_btn}>
                            <Icon icon="mdi:arrow-left" color='black' width={30} fontWeight={600} />
                        </span>
                    ) : (
                        <span onClick={() => navigate('/')} className={style.back_btn}>Back to home</span>
                    )
                }
                {
                    isMobile ? (
                        <div className={style.invoice}>
                            <Icon icon="mdi:invoice-edit" width={30} color='black' />
                            <h2>My Invoices</h2>
                        </div>
                    ) : (
                        <h2 style={{ textAlign: 'center' }}>My Invoices</h2>
                    )
                }
                <div className={style.all_invoice}>
                    {invoices && invoices.map((invoice) => (
                        <div key={invoice?._id} className={style.invoice_container}>
                            <div className={style.address_container}>
                                <Icon icon="mdi:invoice-edit" width={30} color='#797979' />
                                <div className={style.address}>
                                    <p>{name}</p>
                                    <p>{invoice?.address}</p>
                                </div>
                            </div>
                            {invoice && (
                                <span className={style.btn} onClick={() => viewInvoice(invoice)}>View Invoice</span>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export default Invoices
