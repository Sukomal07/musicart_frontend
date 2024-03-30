import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { isMobile } from 'react-device-detect'
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Slider from 'react-slick';

import star from '../assets/Star.png'
import Layout from "../layout/Layout"
import { addToCart, getCart } from '../redux/slices/CartSlice'
import style from '../styles/product.module.css'

function Product() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()
    const { data } = useSelector((state) => state.auth)
    const url = state?.pictures[0]
    function format(type, string) {
        if (!string) return '';
        if (type === 'colour') {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } else {
            return string.charAt(0).toUpperCase() + string.slice(1) + ' headphone';
        }
    }

    const getImageTag = (number) => {
        const images = [];
        for (let i = 0; i < number; i++) {
            images.push(<img key={i} src={star} alt={`Image ${i + 1}`} className={style.star} />);
        }
        return images;
    };

    const splitParagraph = (paragraph) => {
        const sentences = paragraph.split('. ');
        return (
            <ul className={style.ul}>
                {sentences.map((sentence, index) => (
                    <li key={index}>{sentence}</li>
                ))}
            </ul>
        );
    };

    const handleAddToCart = async (productId) => {
        const newCartItem = { productId };
        if (data?._id) {
            await dispatch(addToCart(newCartItem));
            await dispatch(getCart())
        } else {
            navigate('/login')
        }
    };
    const handleBuyNow = async (productId) => {
        const newCartItem = { productId };
        if (data?._id) {
            await dispatch(addToCart(newCartItem));
            navigate('/cart')
        } else {
            navigate('/login')
        }
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <Layout>
            {
                isMobile ? (
                    <section className={style.product_container}>
                        <span onClick={() => navigate('/')} className={style.back_btn}>
                            <BiArrowBack color='black' size={30} fontWeight={600} />
                        </span>
                        <span className={style.buy} onClick={() => handleBuyNow(state?._id)}>Buy now</span>
                        <div className={style.column}>
                            <Slider {...settings} className={style.custom_slider}>
                                {state?.pictures.map((picture, index) => (
                                    <div key={index} className={style.image_container} style={{ display: 'flex' }}>
                                        <img src={picture} alt="slide" className={style.img} />
                                    </div>
                                ))}
                            </Slider>

                            <div className={style.product_details}>
                                <h2>{state?.name}</h2>
                                <div className={style.star_container} >
                                    <div className={style.flex} style={{ gap: '6px' }}>{getImageTag(state?.rating)}</div>
                                    <span className={style.customer}>({state?.customer} Customer reviews)</span>
                                </div>
                                <p className={style.description}>{state?.description}</p>
                                <h3 className={style.description}>Price - ₹ {state?.price}</h3>
                                <p className={style.colour}>{format('colour', state?.colour)} | {format('type', state?.type)}</p>
                                <div className={style.about_container}>
                                    <p>About this item</p>
                                    {splitParagraph(state?.about)}
                                </div>

                                <h3>Available - <span className={style.span}>In stock</span></h3>
                                <h3>Brand - <span className={style.span}>{state?.company}</span></h3>
                                <div className={style.btn_container}>
                                    <span className={style.cart} onClick={() => handleAddToCart(state?._id)}>Add to cart</span>
                                    <span className={style.buy} onClick={() => handleBuyNow(state?._id)}>Buy now</span>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className={style.product_container}>
                        <span onClick={() => navigate('/')} className={style.back_btn}>Back to products</span>
                        <p className={style.description}>{state?.description}</p>
                        <div className={style.flex}>
                            <div className={style.column}>
                                <div className={style.image_container}>
                                    <img src={url} alt="logo" className={style.img} />
                                </div>
                                <div className={style.flex}>
                                    {state?.pictures?.map((picture, index) => {
                                        return index > 0 &&
                                            <div key={index} className={style.sub_image_container}>
                                                <img src={picture} alt="logo" className={style.sub_image} />
                                            </div>
                                    })}
                                </div>
                            </div>
                            <div className={style.product_details}>
                                <h2>{state?.name}</h2>
                                <div className={style.star_container} >
                                    <div className={style.flex} style={{ gap: '6px' }}>{getImageTag(state?.rating)}</div>
                                    <span className={style.customer}>({state?.customer} Customer reviews)</span>
                                </div>
                                <h3>Price - ₹ {state?.price}</h3>
                                <p className={style.colour}>{format('colour', state?.colour)} | {format('type', state?.type)}</p>
                                <div className={style.about_container}>
                                    <p>About this item</p>
                                    {splitParagraph(state?.about)}
                                </div>

                                <h3>Available - <span className={style.span}>In stock</span></h3>
                                <h3>Brand - <span className={style.span}>{state?.company}</span></h3>
                                <div className={style.btn_container}>
                                    <span className={style.cart} onClick={() => handleAddToCart(state?._id)}>Add to cart</span>
                                    <span className={style.buy} onClick={() => handleBuyNow(state?._id)}>Buy now</span>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </Layout>
    )
}

export default Product
