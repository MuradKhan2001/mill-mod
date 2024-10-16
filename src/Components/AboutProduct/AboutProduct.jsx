import React, {useContext, useEffect} from 'react';
import "./style-about-product.scss"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Aos from "aos";
import axios from "axios";
import {MyContext} from "../App/App";
import i18next from "i18next";
import DOMPurify from 'dompurify';
import {useTranslation} from "react-i18next";
import ReactPlayer from 'react-player/youtube'

const AboutProduct = () => {
    const {t} = useTranslation();
    let value = useContext(MyContext);
    const [products, setProducts] = React.useState([]);
    const [banner, setBanner] = React.useState([]);


    useEffect(() => {
        axios.get(`${value.url}banner/?type=about_product`).then((response) => {
            setBanner(response.data[0])
        });

        axios.get(`${value.url}about-product/`).then((response) => {
            setProducts(response.data)
        });

        Aos.init({duration: 1000});
    }, [])

    return (
        <div className="about-product-wrapper">
            <Navbar/>
            <div className="banner-menu">
                {banner && <img src={banner.iamge} alt=""/>}

            </div>

            <div className="contents-products">
                {
                    products.map((item, index) => {
                        return <div key={index} data-aos="flip-up" className="content">
                            <div className="title">
                                {item.translations && item.translations[i18next.language].name}
                            </div>
                            <div className="bottom-side">
                                <div className="left-side">
                                    <img src={item.photo} alt=""/>
                                </div>
                                <div className="right-side">
                                    {item.production_video ?
                                        <ReactPlayer
                                            width='100%'
                                            height='100%'
                                            url={item.production_video}/> : item.photo ?
                                            <img src={item.photo} alt=""/> : <div className="text-box">
                                                <div
                                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item.translations[i18next.language].description)}}/>
                                            </div>}
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>

            <Footer/>
        </div>
    );
};

export default AboutProduct;