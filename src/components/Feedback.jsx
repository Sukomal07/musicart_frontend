import { Icon } from '@iconify/react'
import { useState } from 'react';
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux'

import { sendFeedback } from '../redux/slices/Authslice';
import style from '../styles/feedback.module.css'

function Feedback() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth?.data) || {}
    const [dropdown, setDropdown] = useState(
        {
            feedback_dropdown: false,
            message_container: false
        }
    )
    const [data, setData] = useState({
        feedback_type: '',
        message: ''
    })
    const [errors, setErrors] = useState({
        feedback_type: '',
        message: ''
    })

    const toggleDropdown = (type) => {
        setDropdown({
            ...dropdown,
            [type]: !dropdown[type]
        });
    };
    const handleSelect = (value) => {
        setData({
            ...data,
            feedback_type: value
        })
        setErrors({
            ...errors,
            feedback_type: ''
        })
        toggleDropdown('feedback_dropdown')
    }

    const handleChange = (event) => {
        setData({
            ...data,
            message: event.target.value
        })
        setErrors({
            ...errors,
            message: ''
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        let formIsValid = true;
        const newErrors = { ...errors };
        if (!data.feedback_type) {
            formIsValid = false
            newErrors.feedback_type = 'Feedback type is required'
        }
        if (!data.message.trim()) {
            formIsValid = false
            newErrors.message = 'Feedback message is required'
        }
        if (formIsValid) {
            await dispatch(sendFeedback(data))
            setData({
                feedback_type: '',
                message: ''
            })
        } else {
            setErrors(newErrors)
        }
    }

    return (
        user?._id && (
            <div className={style.feedback_container}>
                {
                    dropdown.message_container && (
                        <form className={style.feedback_message_container} onSubmit={handleSubmit}>
                            <div className={style.flex}>
                                <label className={style.text}>Type of feedback</label>
                                <div className={style.feedback_type} onClick={() => toggleDropdown('feedback_dropdown')} style={errors.feedback_type ? { border: '1px solid red' } : {}}>
                                    <span className={style.span}>{data.feedback_type || 'Choose the type'} </span>
                                    {dropdown.feedback_dropdown ? <VscChevronUp size={18} /> : <VscChevronDown size={18} />}
                                    {dropdown.feedback_dropdown && (
                                        <ul className={style.dropdown}>
                                            <li onClick={() => handleSelect('bugs')} className={data.feedback_type === 'bugs' ? style.active : ''}>bugs</li>
                                            <hr className={style.hr} />
                                            <li onClick={() => handleSelect('feedback')} className={data.feedback_type === 'feedback' ? style.active : ''}>feedback</li>
                                            <hr className={style.hr} />
                                            <li onClick={() => handleSelect('query')} className={data.feedback_type === 'query' ? style.active : ''}>query</li>
                                        </ul>
                                    )}
                                </div>
                                {
                                    errors.feedback_type && (
                                        <span className={style.error}>*{errors.feedback_type}</span>
                                    )
                                }
                            </div>
                            <div className={style.flex}>
                                <label className={style.text}>Feedback</label>
                                <textarea name="message" id="message" cols="30" rows="10" placeholder='Type your feedback' className={style.textarea} value={data.message} onChange={handleChange} style={errors.message ? { border: '1px solid red' } : {}}></textarea>
                                {errors.message && (
                                    <span className={style.error}>*{errors.message}</span>
                                )}
                            </div>
                            <button className={style.btn} type='submit'>Submit</button>
                        </form>
                    )
                }
                <div className={style.feedback_logo} onClick={() => toggleDropdown('message_container')}>
                    <Icon icon="fluent:person-feedback-16-filled" width={35} cursor={'pointer'} />
                </div>
            </div>
        )

    )
}

export default Feedback
