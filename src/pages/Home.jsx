import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { IoGrid, IoGridOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { TfiViewListAlt } from "react-icons/tfi";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { useDispatch } from 'react-redux'
import { useDebounce } from 'use-debounce';

import homeImage from '../assets/home_image.png'
import Layout from "../layout/Layout"
import { getAllProduct, searchProduct } from "../redux/slices/ProductSlice";
import style from '../styles/home.module.css'

function Home() {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 200);
    const [showDropdowns, setShowDropdowns] = useState({
        headphoneTypes: false,
        company: false,
        colour: false,
        price: false,
        sortBy: false
    });
    const [selectedValues, setSelectedValues] = useState({
        headphoneTypes: '',
        company: '',
        colour: '',
        price: '',
        sortBy: ''
    });
    const [product, setProduct] = useState([])
    const [view, setView] = useState('grid');
    const handleSelect = (filter, value) => {
        setSelectedValues({
            ...selectedValues,
            [filter]: value,
        });
        toggleDropdown(filter);
    };

    const toggleDropdown = (filter) => {
        setShowDropdowns({
            ...showDropdowns,
            [filter]: !showDropdowns[filter],
        });
    };
    const toggleView = () => {
        setView(view === 'grid' ? 'list' : 'grid');
    };
    function formatType(type) {
        if (!type) return '';
        return type.charAt(0).toUpperCase() + type.slice(1) + ' headphone';
    }

    const handleSearchInputChange = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        if (debouncedQuery) {
            const fetchData = async () => {
                const res = await dispatch(searchProduct(debouncedQuery));
                setProduct(res?.payload?.data);
            };
            fetchData();
        } else {
            const fetchData = async () => {
                const res = await dispatch(getAllProduct());
                setProduct(res?.payload?.data);
            };
            fetchData();
        }
    }, [debouncedQuery, dispatch]);
    return (
        <Layout>
            <section className={style.home_container}>
                <div className={style.banner}>
                    <h2>Grab upto 50% off on <br /> Selected headphones</h2>
                    <img src={homeImage} alt="logo" />
                </div>
                <div className={style.searchbar}>
                    <BsSearch size={"20"} color="#666666" />
                    <input
                        type="text"
                        placeholder="Search by product name"
                        className={style.input}
                        value={query}
                        onChange={handleSearchInputChange}
                    />
                </div>
                <div className={style.filter}>
                    <div className={style.icons}>
                        {view === 'grid' ? (
                            <>
                                <IoGrid size={23} cursor={'pointer'} />
                                <TfiViewListAlt size={22} cursor={'pointer'} onClick={toggleView} />
                            </>
                        ) : (
                            <>
                                <IoGridOutline size={22} cursor={'pointer'} onClick={toggleView} />
                                <FaList size={25} cursor={'pointer'} />
                            </>
                        )}

                    </div>
                    <div className={style.filter_option}>
                        <div className={style.option} onClick={() => toggleDropdown('headphoneTypes')}>
                            <h2>{selectedValues.headphoneTypes || 'Headphone type'}</h2>
                            {showDropdowns.headphoneTypes ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                            {showDropdowns.headphoneTypes && (
                                <ul className={style.headphone_types}>
                                    <li onClick={() => handleSelect('headphoneTypes', 'In-ear headphone')}>In-ear headphone</li>
                                    <li onClick={() => handleSelect('headphoneTypes', 'On-ear headphone')}>On-ear headphone</li>
                                    <li onClick={() => handleSelect('headphoneTypes', 'Over-ear headphone')}>Over-ear headphone</li>
                                </ul>
                            )}
                        </div>
                        <div className={style.option} onClick={() => toggleDropdown('company')}>
                            <h2>{selectedValues.company || 'Company'}</h2>
                            {showDropdowns.company ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                            {showDropdowns.company && (
                                <ul className={style.company}>
                                    <li onClick={() => handleSelect('company', 'Jbl')}>Jbl</li>
                                    <li onClick={() => handleSelect('company', 'Sony')}>Sony</li>
                                    <li onClick={() => handleSelect('company', 'Boat')}>Boat</li>
                                    <li onClick={() => handleSelect('company', 'Zebronics')}>Zebronics</li>
                                    <li onClick={() => handleSelect('company', 'Marshall')}>Marshall</li>
                                    <li onClick={() => handleSelect('company', 'Ptron')}>Ptron</li>
                                </ul>
                            )}
                        </div>
                        <div className={style.option} onClick={() => toggleDropdown('colour')}>
                            <h2>{selectedValues.colour || 'Colour'}</h2>
                            {showDropdowns.colour ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                            {showDropdowns.colour && (
                                <ul className={style.colour}>
                                    <li onClick={() => handleSelect('colour', 'Blue')}>Blue</li>
                                    <li onClick={() => handleSelect('colour', 'Black')}>Black</li>
                                    <li onClick={() => handleSelect('colour', 'White')}>White</li>
                                    <li onClick={() => handleSelect('colour', 'Brown')}>Brown</li>
                                </ul>
                            )}
                        </div>
                        <div className={style.option} onClick={() => toggleDropdown('price')}>
                            <h2>{selectedValues.price || 'Price'}</h2>
                            {showDropdowns.price ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                            {showDropdowns.price && (
                                <ul className={style.price}>
                                    <li onClick={() => handleSelect('price', '0 - 1000')}>₹0 - ₹10,00</li>
                                    <li onClick={() => handleSelect('price', '1000 - 10000')}>₹1,000 - ₹10,000</li>
                                    <li onClick={() => handleSelect('price', '10000 - 20000')}>₹10,000 - ₹20,000</li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className={style.sortby} onClick={() => toggleDropdown('sortBy')}>
                        <p>Sort by: {selectedValues.sortBy || 'Featured'}</p>
                        {showDropdowns.sortBy ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                        {showDropdowns.sortBy && (
                            <ul className={style.sort_types}>
                                <li onClick={() => handleSelect('sortBy', 'Lowest')}>Price : Lowest</li>
                                <li onClick={() => handleSelect('sortBy', 'Highest')}>Price : Highest</li>
                                <li onClick={() => handleSelect('sortBy', '(A-Z)')}>Name : (A-Z)</li>
                                <li onClick={() => handleSelect('sortBy', '(Z-A)')}>Name : (Z-A)</li>
                            </ul>
                        )}
                    </div>
                </div>
                <div className={view === 'grid' ? style.grid_product_container : style.list_product_container}>
                    {product ? product?.map((item) => (
                        <div key={item?._id} className={view === 'grid' ? style.product : style.product_list}>
                            <div className={view === 'grid' ? style.image_container : style.list_image_container}>
                                <img src={item?.pictures[0]} alt={item?.name} className={view === 'grid' ? style.product_image : style.list_product_image} />
                                <div className={style.cart}>
                                    <MdAddShoppingCart size={20} color="#1d7000" />
                                </div>
                            </div>
                            <div className={view === 'grid' ? style.grid_product_details : style.list_product_details}>
                                <h3 className={view === 'grid' ? style.product_name : style.list_product_name}>{item?.name}</h3>
                                <p className={view === 'grid' ? style.product_price : style.p}>Price - ₹ {item?.price}</p>
                                <p className={view === 'grid' ? style.product_price : style.p}>{item?.colour} | {formatType(item?.type)}</p>
                                {
                                    view === 'list' && (
                                        <>
                                            <p className={style.p}>{item?.about}</p>
                                            <span className={style.details}>Details</span>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    )) : (
                        <p className={style.notfound}>No product found</p>
                    )}
                </div>
            </section>
        </Layout>
    )
}

export default Home
