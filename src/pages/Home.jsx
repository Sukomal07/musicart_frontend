import { BsSearch } from "react-icons/bs";
import { IoGrid, IoGridOutline, IoList, IoListOutline } from "react-icons/io5";
import { TfiViewListAlt } from "react-icons/tfi";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

import homeImage from '../assets/home_image.png'
import Layout from "../layout/Layout"
import style from '../styles/home.module.css'

function Home() {
    return (
        <Layout>
            <section className={style.home_container}>
                <div className={style.banner}>
                    <h2>Grab upto 50% off on <br /> Selected headphones</h2>
                    <img src={homeImage} alt="logo" />
                </div>
                <div className={style.searchbar}>
                    <BsSearch size={"20"} color="#666666" />
                    <input type="text" placeholder="Search by product name" className={style.input} />
                </div>
                <div className={style.filter}>
                    <div className={style.icons}>
                        <IoGrid size={22} cursor={'pointer'} />
                        <IoListOutline size={30} cursor={'pointer'} />
                    </div>
                    <div className={style.filter_option}>
                        <div className={style.option}>
                            <h2>Headphone type</h2>
                            <VscChevronDown size={20} />
                            <ul className={style.headphone_types}>
                                <li>In-ear headphone</li>
                                <li>On-ear headphone</li>
                                <li>Over-ear headphone</li>
                            </ul>
                        </div>
                        <div className={style.option}>
                            <h2>Company</h2>
                            <VscChevronDown size={20} />
                            <ul className={style.company}>
                                <li>JBL</li>
                                <li>Sony</li>
                                <li>Boat</li>
                                <li>Zebronics</li>
                                <li>Marshall</li>
                                <li>Ptron</li>
                            </ul>
                        </div>
                        <div className={style.option}>
                            <h2>Colour</h2>
                            <VscChevronDown size={20} />
                            <ul className={style.colour}>
                                <li>Blue</li>
                                <li>Black</li>
                                <li>White</li>
                                <li>Brown</li>
                            </ul>
                        </div>
                        <div className={style.option}>
                            <h2>Price</h2>
                            <VscChevronDown size={20} />
                            <ul className={style.price}>
                                <li>₹0 - ₹10,00</li>
                                <li>₹1,000 - ₹10,000</li>
                                <li>₹10,000 - ₹20,000</li>
                            </ul>
                        </div>
                    </div>
                    <div className={style.sortby}>
                        <p>Sort by: Featured</p>
                        <VscChevronDown />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Home
