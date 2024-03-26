import { Icon } from '@iconify/react'
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { useSelector } from 'react-redux'

import style from '../styles/feedback.module.css'

function Feedback() {
    const { data } = useSelector((state) => state.auth)
    return (
        data?._id && (
            <div className={style.feedback_container}>
                <form className={style.feedback_message_container}>
                    <div className={style.flex}>
                        <label className={style.text}>Type of feedback</label>
                        <div className={style.feedback_type}>
                            <input type="text" placeholder='Choose the type' disabled className={style.input} />
                            <VscChevronDown />
                            <ul className={style.dropdown}>
                                <li>bugs</li>
                                <hr className={style.hr} />
                                <li>feedback</li>
                                <hr className={style.hr} />
                                <li>query</li>
                            </ul>
                        </div>
                    </div>
                    <div className={style.flex}>
                        <label className={style.text}>Feedback</label>
                        <textarea name="message" id="message" cols="30" rows="10" placeholder='Type your feedback' className={style.textarea}></textarea>
                    </div>
                    <button className={style.btn}>Submit</button>
                </form>
                <div className={style.feedback_logo}>
                    <Icon icon="fluent:person-feedback-16-filled" width={35} cursor={'pointer'} />
                </div>
            </div>
        )

    )
}

export default Feedback
