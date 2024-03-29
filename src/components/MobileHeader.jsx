import { BsSearch } from "react-icons/bs"

import style from '../styles/mobileHeader.module.css'

function MobileHeader() {
    return (
        <div className={style.container}>
            <div className={style.searchbar}>
                <BsSearch size={"20"} color="#666666" />
                <input
                    type="text"
                    placeholder="Search Musicart"
                    className={style.input}
                />
            </div>
        </div>
    )
}

export default MobileHeader
