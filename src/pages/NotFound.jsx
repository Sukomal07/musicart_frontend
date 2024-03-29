import { Link } from 'react-router-dom'

import style from '../styles/notFound.module.css'

function NotFound() {
    return (
        <div className={style.notfound}>
            <div className={style.notfound_error}>
                <span className={style.error_code}>404</span>
                <span className={style.notfound_text}>Not Found</span>
            </div>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to={'/'} className={style.home}>Back to home</Link>
        </div>
    )
}

export default NotFound
