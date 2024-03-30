import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs"
import { useDispatch } from 'react-redux'
import { useDebounce } from 'use-debounce';

import { getAllProduct, searchProduct } from "../redux/slices/ProductSlice";
import style from '../styles/mobileHeader.module.css'

function MobileHeader() {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 200);

    const handleSearchInputChange = (event) => {
        setQuery(event.target.value);
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
    return (
        <div className={style.container}>
            <div className={style.searchbar}>
                <BsSearch size={"20"} color="#666666" />
                <input
                    type="text"
                    placeholder="Search Musicart"
                    className={style.input}
                    value={query}
                    onChange={handleSearchInputChange}
                />
            </div>
        </div>
    )
}

export default MobileHeader
