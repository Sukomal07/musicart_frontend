import { Icon } from '@iconify/react'
import { useEffect, useState } from "react";
import { isMobile } from 'react-device-detect'
import { BsSearch } from "react-icons/bs";
import { IoGrid, IoGridOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { TfiViewListAlt } from "react-icons/tfi";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce';

import homeImage from '../assets/home_image.png'
import Feedback from '../components/Feedback.jsx';
import Layout from "../layout/Layout"
import { addToCart, getCart } from "../redux/slices/CartSlice.js";
import { filterProducts, getAllProduct, searchProduct } from "../redux/slices/ProductSlice.js";
import style from '../styles/home.module.css'

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 200);
    const { data } = useSelector((state) => state.auth)
    const { product } = useSelector((state) => state.product) || []
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
    const formatFilterValue = (value) => {
        let formattedValue = value?.toLowerCase()?.trim();

        if (formattedValue?.endsWith(' headphone')) {
            formattedValue = formattedValue?.slice(0, -10);
        }

        return formattedValue;
    };

    const filterData = async () => {
        const filters = {
            type: formatFilterValue(selectedValues.headphoneTypes),
            company: formatFilterValue(selectedValues.company),
            colour: formatFilterValue(selectedValues.colour),
            price: formatFilterValue(selectedValues.price),
            sortBy: formatFilterValue(selectedValues.sortBy)
        };
        Object.keys(filters).forEach((key) => filters[key] === '' && delete filters[key]);
        if (Object.keys(filters).length > 0) {
            await dispatch(filterProducts(filters));
        } else {
            await dispatch(getAllProduct());
        }
    };

    const handleSelectProduct = async (event, productId) => {
        event.stopPropagation()
        const newCartItem = { productId };
        if (data?._id) {
            await dispatch(addToCart(newCartItem));
            await dispatch(getCart())
        } else {
            navigate('/login')
        }
    };

    const handleProductClick = (event, data) => {
        if (view === 'grid') {
            navigate(`/product/${data?._id}`, { state: data });
        } else if (view === 'list' && event.target?.classList.contains(style.details)) {
            navigate(`/product/${data?._id}`, { state: data });
        }
    };

    useEffect(() => {
        if (debouncedQuery) {
            const fetchData = async () => {
                await dispatch(searchProduct(debouncedQuery));
            };
            fetchData();
        } else {
            const fetchData = async () => {
                await dispatch(getAllProduct());
            };
            fetchData();
        }
    }, [debouncedQuery, dispatch]);

    useEffect(() => {
        filterData()
    }, [selectedValues])

    return (
        <Layout>
            <section className={style.home_container}>
                <div className={style.banner}>
                    {isMobile ? (
                        <div className={style.offer}>
                            <h2>Grab upto 50% off on <br /> Selected headphones</h2>
                            <span>Buy now</span>
                        </div>
                    ) : (
                        <h2>Grab upto 50% off on <br /> Selected headphones</h2>
                    )}
                    <img src={homeImage} alt="logo" />
                </div>
                {!isMobile && (
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
                )}
                {
                    isMobile ? (
                        <div className={style.filter}>
                            <div className={style.sortby} onClick={() => toggleDropdown('sortBy')}>
                                <p>{selectedValues.sortBy || 'Sort by'}</p>
                                {showDropdowns.sortBy ? <VscChevronUp size={15} /> : <VscChevronDown size={15} />}
                                {showDropdowns.sortBy && (
                                    <ul className={style.sort_types}>
                                        <li onClick={() => handleSelect('sortBy', '')}>Featured</li>
                                        <li onClick={() => handleSelect('sortBy', 'Lowest')}>Price : Lowest</li>
                                        <li onClick={() => handleSelect('sortBy', 'Highest')}>Price : Highest</li>
                                        <li onClick={() => handleSelect('sortBy', 'A-Z')}>Name : (A-Z)</li>
                                        <li onClick={() => handleSelect('sortBy', 'Z-A')}>Name : (Z-A)</li>
                                    </ul>
                                )}
                            </div>
                            <div className={style.filter_option}>
                                <div className={style.option} onClick={() => toggleDropdown('headphoneTypes')}>
                                    <h2>{selectedValues.headphoneTypes || 'Headphone type'}</h2>
                                    {showDropdowns.headphoneTypes ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                                    {showDropdowns.headphoneTypes && (
                                        <ul className={style.headphone_types}>
                                            <li onClick={() => handleSelect('headphoneTypes', '')}>Featured</li>
                                            <li onClick={() => handleSelect('headphoneTypes', 'In-ear headphone')} className={selectedValues.headphoneTypes === 'In-ear headphone' ? style.active : ''}>In-ear headphone</li>
                                            <li onClick={() => handleSelect('headphoneTypes', 'On-ear headphone')} className={selectedValues.headphoneTypes === 'On-ear headphone' ? style.active : ''}>On-ear headphone</li>
                                            <li onClick={() => handleSelect('headphoneTypes', 'Over-ear headphone')} className={selectedValues.headphoneTypes === 'Over-ear headphone' ? style.active : ''}>Over-ear headphone</li>
                                        </ul>
                                    )}
                                </div>
                                <div className={style.option} onClick={() => toggleDropdown('company')}>
                                    <h2>{selectedValues.company || 'Company'}</h2>
                                    {showDropdowns.company ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                                    {showDropdowns.company && (
                                        <ul className={style.company}>
                                            <li onClick={() => handleSelect('company', '')}>Featured</li>
                                            <li onClick={() => handleSelect('company', 'Jbl')} className={selectedValues.company === 'Jbl' ? style.active : ''}>Jbl</li>
                                            <li className={selectedValues.company === 'Sony' ? style.active : ''} onClick={() => handleSelect('company', 'Sony')}>Sony</li>
                                            <li className={selectedValues.company === 'Boat' ? style.active : ''} onClick={() => handleSelect('company', 'Boat')}>Boat</li>
                                            <li className={selectedValues.company === 'Zebronics' ? style.active : ''} onClick={() => handleSelect('company', 'Zebronics')}>Zebronics</li>
                                            <li className={selectedValues.company === 'Marshall' ? style.active : ''} onClick={() => handleSelect('company', 'Marshall')}>Marshall</li>
                                            <li className={selectedValues.company === 'Ptron' ? style.active : ''} onClick={() => handleSelect('company', 'Ptron')}>Ptron</li>
                                        </ul>
                                    )}
                                </div>
                                <div className={style.option} onClick={() => toggleDropdown('colour')}>
                                    <h2>{selectedValues.colour || 'Colour'}</h2>
                                    {showDropdowns.colour ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                                    {showDropdowns.colour && (
                                        <ul className={style.colour}>
                                            <li onClick={() => handleSelect('colour', '')}>Featured</li>
                                            <li className={selectedValues.colour === 'Blue' ? style.active : ''} onClick={() => handleSelect('colour', 'Blue')}>Blue</li>
                                            <li className={selectedValues.colour === 'Black' ? style.active : ''} onClick={() => handleSelect('colour', 'Black')}>Black</li>
                                            <li className={selectedValues.colour === 'White' ? style.active : ''} onClick={() => handleSelect('colour', 'White')}>White</li>
                                            <li className={selectedValues.colour === 'Brown' ? style.active : ''} onClick={() => handleSelect('colour', 'Brown')}>Brown</li>
                                        </ul>
                                    )}
                                </div>
                                <div className={style.option} onClick={() => toggleDropdown('price')}>
                                    <h2>{selectedValues.price || 'Price'}</h2>
                                    {showDropdowns.price ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                                    {showDropdowns.price && (
                                        <ul className={style.price}>
                                            <li onClick={() => handleSelect('price', '')}>Featured</li>
                                            <li className={selectedValues.price === '0 - 1000' ? style.active : ''} onClick={() => handleSelect('price', '0 - 1000')}>₹0 - ₹10,00</li>
                                            <li className={selectedValues.price === '1000 - 10000' ? style.active : ''} onClick={() => handleSelect('price', '1000 - 10000')}>₹1,000 - ₹10,000</li>
                                            <li className={selectedValues.price === '10000 - 20000' ? style.active : ''} onClick={() => handleSelect('price', '10000 - 20000')}>₹10,000 - ₹20,000</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={style.filter}>
                            <div className={style.icons}>
                                {view === 'grid' ? (
                                    <>
                                        <IoGrid size={23} cursor={'pointer'} />
                                        <TfiViewListAlt size={21} cursor={'pointer'} onClick={toggleView} />
                                    </>
                                ) : (
                                    <>
                                        <IoGridOutline size={22} cursor={'pointer'} onClick={toggleView} />
                                        <Icon icon={"material-symbols:view-list-rounded"} width={28} cursor={'pointer'} />
                                    </>
                                )}
                            </div>
                            <div className={style.filter_option}>
                                <div className={style.option} onClick={() => toggleDropdown('headphoneTypes')}>
                                    <h2>{selectedValues.headphoneTypes || 'Headphone type'}</h2>
                                    {showDropdowns.headphoneTypes ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                                    {showDropdowns.headphoneTypes && (
                                        <ul className={style.headphone_types}>
                                            <li onClick={() => handleSelect('headphoneTypes', '')}>Featured</li>
                                            <li onClick={() => handleSelect('headphoneTypes', 'In-ear headphone')} className={selectedValues.headphoneTypes === 'In-ear headphone' ? style.active : ''}>In-ear headphone</li>
                                            <li onClick={() => handleSelect('headphoneTypes', 'On-ear headphone')} className={selectedValues.headphoneTypes === 'On-ear headphone' ? style.active : ''}>On-ear headphone</li>
                                            <li onClick={() => handleSelect('headphoneTypes', 'Over-ear headphone')} className={selectedValues.headphoneTypes === 'Over-ear headphone' ? style.active : ''}>Over-ear headphone</li>
                                        </ul>
                                    )}
                                </div>
                                <div className={style.option} onClick={() => toggleDropdown('company')}>
                                    <h2>{selectedValues.company || 'Company'}</h2>
                                    {showDropdowns.company ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                                    {showDropdowns.company && (
                                        <ul className={style.company}>
                                            <li onClick={() => handleSelect('company', '')}>Featured</li>
                                            <li onClick={() => handleSelect('company', 'Jbl')} className={selectedValues.company === 'Jbl' ? style.active : ''}>Jbl</li>
                                            <li className={selectedValues.company === 'Sony' ? style.active : ''} onClick={() => handleSelect('company', 'Sony')}>Sony</li>
                                            <li className={selectedValues.company === 'Boat' ? style.active : ''} onClick={() => handleSelect('company', 'Boat')}>Boat</li>
                                            <li className={selectedValues.company === 'Zebronics' ? style.active : ''} onClick={() => handleSelect('company', 'Zebronics')}>Zebronics</li>
                                            <li className={selectedValues.company === 'Marshall' ? style.active : ''} onClick={() => handleSelect('company', 'Marshall')}>Marshall</li>
                                            <li className={selectedValues.company === 'Ptron' ? style.active : ''} onClick={() => handleSelect('company', 'Ptron')}>Ptron</li>
                                        </ul>
                                    )}
                                </div>
                                <div className={style.option} onClick={() => toggleDropdown('colour')}>
                                    <h2>{selectedValues.colour || 'Colour'}</h2>
                                    {showDropdowns.colour ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                                    {showDropdowns.colour && (
                                        <ul className={style.colour}>
                                            <li onClick={() => handleSelect('colour', '')}>Featured</li>
                                            <li className={selectedValues.colour === 'Blue' ? style.active : ''} onClick={() => handleSelect('colour', 'Blue')}>Blue</li>
                                            <li className={selectedValues.colour === 'Black' ? style.active : ''} onClick={() => handleSelect('colour', 'Black')}>Black</li>
                                            <li className={selectedValues.colour === 'White' ? style.active : ''} onClick={() => handleSelect('colour', 'White')}>White</li>
                                            <li className={selectedValues.colour === 'Brown' ? style.active : ''} onClick={() => handleSelect('colour', 'Brown')}>Brown</li>
                                        </ul>
                                    )}
                                </div>
                                <div className={style.option} onClick={() => toggleDropdown('price')}>
                                    <h2>{selectedValues.price || 'Price'}</h2>
                                    {showDropdowns.price ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                                    {showDropdowns.price && (
                                        <ul className={style.price}>
                                            <li onClick={() => handleSelect('price', '')}>Featured</li>
                                            <li className={selectedValues.price === '0 - 1000' ? style.active : ''} onClick={() => handleSelect('price', '0 - 1000')}>₹0 - ₹10,00</li>
                                            <li className={selectedValues.price === '1000 - 10000' ? style.active : ''} onClick={() => handleSelect('price', '1000 - 10000')}>₹1,000 - ₹10,000</li>
                                            <li className={selectedValues.price === '10000 - 20000' ? style.active : ''} onClick={() => handleSelect('price', '10000 - 20000')}>₹10,000 - ₹20,000</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className={style.sortby} onClick={() => toggleDropdown('sortBy')}>
                                <p>Sort by: {selectedValues.sortBy || 'Featured'}</p>
                                {showDropdowns.sortBy ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
                                {showDropdowns.sortBy && (
                                    <ul className={style.sort_types}>
                                        <li onClick={() => handleSelect('sortBy', '')}>Featured</li>
                                        <li onClick={() => handleSelect('sortBy', 'Lowest')}>Price : Lowest</li>
                                        <li onClick={() => handleSelect('sortBy', 'Highest')}>Price : Highest</li>
                                        <li onClick={() => handleSelect('sortBy', 'A-Z')}>Name : (A-Z)</li>
                                        <li onClick={() => handleSelect('sortBy', 'Z-A')}>Name : (Z-A)</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    )
                }
                <div className={view === 'grid' ? style.grid_product_container : style.list_product_container}>
                    {product?.length > 0 ? product?.map((item) => (
                        <div key={item?._id} className={view === 'grid' ? style.product : style.product_list} onClick={(event) => handleProductClick(event, item)}>
                            <div className={view === 'grid' ? style.image_container : style.list_image_container}>
                                <img src={item?.pictures[0]} alt={item?.name} className={view === 'grid' ? style.product_image : style.list_product_image} />
                                <div className={style.cart} onClick={(event) => handleSelectProduct(event, item?._id)}>
                                    {
                                        isMobile ? (
                                            <MdAddShoppingCart size={15} color="#1d7000" />
                                        ) : (
                                            <MdAddShoppingCart size={20} color="#1d7000" />
                                        )
                                    }
                                </div>
                            </div>
                            <div className={view === 'grid' ? style.grid_product_details : style.list_product_details}>
                                <h3 className={view === 'grid' ? style.product_name : style.list_product_name}>{item?.name}</h3>
                                <p className={view === 'grid' ? style.product_price : style.p}>Price - ₹ {item?.price}</p>
                                <p className={view === 'grid' ? style.product_price : style.p}>{item?.colour} | {formatType(item?.type)}</p>
                                {
                                    view === 'list' && (
                                        <>
                                            <p className={style.p}>{item?.description}</p>
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
            {
                !isMobile && (
                    <Feedback />
                )
            }
        </Layout>
    )
}

export default Home
