import React, {useEffect, useRef, useState, useContext} from 'react';
import "./style-home.scss"
import Navbar from "../Navbar/Navbar";
import Slider from "react-slick";
import Textra from 'react-textra'
import {useTranslation} from "react-i18next";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import LeadForm from "../ContactLead/LeadForm";
import Footer from "../Footer/Footer";
import axios from "axios";
import DOMPurify from 'dompurify';
import {MyContext} from "../App/App";
import Aos from "aos";
import i18next from "i18next";
import {Helmet} from "react-helmet"
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    let value = useContext(MyContext);
    const ref = useRef(null);
    const [statistics, setStatistic] = useState();
    const [counterOn, setCounterOn] = useState(false);
    const {t} = useTranslation();
    const [homePhoto, setHomePhoto] = useState([]);
    const [aboutUsPhoto, setAboutUsPhoto] = useState([]);
    const [directions, setDirections] = useState([]);
    const [topProducts, setTopProducts] = useState([])
    const settingsHomeSlider = {
        lazyLoad: false,
        slidesToShow: 1,
        dots: false,
        infinite: true,
        fade: true,
        speed: 6000,
        autoplay: true,
        navs: true,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [{
            breakpoint: 1024, settings: {
                slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: false
            }
        }, {
            breakpoint: 600, settings: {
                slidesToShow: 1, slidesToScroll: 1, initialSlide: 1
            }
        }, {
            breakpoint: 480, settings: {
                slidesToShow: 1, slidesToScroll: 1
            }
        }]
    };
    const settingsAboutUsSlider = {
        lazyLoad: false,
        slidesToShow: 1,
        dots: true,
        infinite: true,
        fade: false,
        speed: 3000,
        autoplay: true,
        navs: true,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [{
            breakpoint: 1024, settings: {
                slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: false
            }
        }, {
            breakpoint: 600, settings: {
                slidesToShow: 1, slidesToScroll: 1, initialSlide: 1
            }
        }, {
            breakpoint: 480, settings: {
                slidesToShow: 1, slidesToScroll: 1
            }
        }]
    };
    const settingsProductsSlider = {
        lazyLoad: false,
        slidesToShow: 3,
        dots: false,
        infinite: true,
        fade: false,
        speed: 3000,
        autoplay: true,
        navs: true,
        slidesToScroll: 3,
        initialSlide: 3,
        responsive: [{
            breakpoint: 1440, settings: {
                slidesToShow: 4, slidesToScroll: 4, infinite: true, dots: false
            }
        }, {
            breakpoint: 600, settings: {
                slidesToShow: 2, slidesToScroll: 2, initialSlide: 2
            }
        }, {
            breakpoint: 480, settings: {
                slidesToShow: 1, slidesToScroll: 1
            }
        }]
    };
    useEffect(() => {
        axios.get(`${value.url}banner/?type=home`).then((response) => {
            setHomePhoto(response.data)
        });

        axios.get(`${value.url}about-us/`).then((response) => {
            setAboutUsPhoto(response.data)
        });

        axios.get(`${value.url}category/`).then((response) => {
            setDirections(response.data)
        });

        axios.get(`${value.url}statistic/`).then((response) => {
            setStatistic(response.data[0])
        });

        axios.get(`${value.url}top-product/`).then((response) => {
            setTopProducts(response.data)
        });

        Aos.init({duration: 1000});
    }, [])
    const moreInfo = (product) => {
        if (product.category_key === "national") {
            navigate("/national")
        }
        if (product.category_key === "modern") {
            navigate("/modern")
        }
        if (product.category_key === "promo") {
            navigate("/promo")
        }
    }

    return (
        <div className="home-wrapper">
            <Helmet>
                <title>{t("home-title")}</title>
                <meta name="description"
                      content={t("home-des")}/>
            </Helmet>
            <header>
                <Navbar/>
            </header>
            <main>
                <section className="home-slider-wrapper">
                    <Slider {...settingsHomeSlider}>
                        {homePhoto ? homePhoto.map((item, index) => {
                            return <div key={index}>
                                {item.iamge && <img src={item.iamge} alt="mill-mod-banner" loading="lazy"/>}
                                {item.video && <video autoPlay loop muted src={item.video}></video>}
                            </div>
                        }) : ""}
                    </Slider>
                    <div className="sloy">
                        <div className="content-home">
                            <strong data-aos="zoom-out-right" className="top-text">
                                <Textra effect='scale' data={[t("national"), t("modern"), t("promo")]}/>
                            </strong>
                            <h1 data-aos="zoom-in"
                                data-aos-easing="ease-in-back"
                                data-aos-offset="0" className="body-text">
                                {t("mainTextHome")}
                            </h1>
                            <button type="button" data-aos="fade-up"
                                    data-aos-anchor-placement="bottom-bottom" onClick={() => {
                                ref.current?.scrollIntoView({behavior: "smooth"});
                            }} className="home-button">
                                {t("buttonRegister")}
                            </button>
                        </div>
                    </div>
                </section>
                <section className="home-body-wrapper">
                    {
                        aboutUsPhoto.map((item, index) => {
                            return <div key={index} className="about-us">
                                <h2 data-aos="zoom-in-down" className="main-title">{t("aboutUs")}</h2>

                                <div data-aos="zoom-in"
                                        data-aos-easing="ease-in-back"
                                        data-aos-offset="0" className="title">
                                    {item.translations[i18next.language].title}
                                </div>

                                <div data-aos="fade-up"
                                        data-aos-duration="2000" className="des">
                                    {item.translations[i18next.language].description}
                                </div>

                                <div data-aos="fade-up"
                                     data-aos-anchor-placement="top-center" className="slider-about-us">
                                    <Slider {...settingsAboutUsSlider}>
                                        {item.media ? item.media.map((item, index) => {
                                            return <div key={index}>
                                                {item.iamge && <img src={item.iamge} alt="about-us" loading="lazy"/>}
                                                {item.video && <video autoPlay loop muted src={item.video}></video>}
                                            </div>
                                        }) : ""}
                                    </Slider>

                                </div>
                            </div>
                        })
                    }
                    {directions && <div className="directions">
                        <h2 data-aos="zoom-out-right" className="title">
                            {t("directions")}
                        </h2>

                        <div className="bottom-content">

                            {directions.map((item, index) => {
                                if (item.type === "national") {
                                    return <div key={index} data-aos="flip-right" className="left-side">
                                        <img className="bg-direction" src={item.image} alt="national" loading="lazy"/>
                                        <div className="blur-direction">
                                            <div className="sloy-direction">
                                                <div className="contents">
                                                    <h3 className="title-direction">
                                                        {item.translations[i18next.language].name}
                                                    </h3>
                                                    <strong className="des-direction">
                                                        {item.translations[i18next.language].description}
                                                    </strong>
                                                    <div className="footer-direction">
                                                        <div className="logo-direction">
                                                            <img src="./images/logo2.png" alt="logo-mill-mod"
                                                                 loading="lazy"/>
                                                        </div>
                                                        <div onClick={() => {
                                                            setTimeout(() => {
                                                                window.scrollTo(0, 0)
                                                            }, 200)
                                                            localStorage.setItem("type_catalog", item.type)
                                                            localStorage.setItem("id_catalog", item.id)
                                                            navigate("/national")
                                                        }} className="button">
                                                            {t("more")}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            })}

                            <div className="right-side">
                                {directions.map((item, index) => {
                                    if (item.type === "promo") {
                                        return <div key={index} data-aos="flip-up" className="top-direction">
                                            <img className="bg-direction" src={item.image}
                                                 alt="promo" loading="lazy"/>
                                            <div className="blur-direction">
                                                <div className="sloy-direction">
                                                    <div className="contents">
                                                        <h3 className="title-direction">
                                                            {item.translations[i18next.language].name}
                                                        </h3>
                                                        <strong className="des-direction">
                                                            {item.translations[i18next.language].description}
                                                        </strong>
                                                        <div className="footer-direction">
                                                            <div className="logo-direction">
                                                                <img src="./images/logo2.png" alt="logo-mill-mod"
                                                                     loading="lazy"/>
                                                            </div>
                                                            <div onClick={() => {
                                                                setTimeout(() => {
                                                                    window.scrollTo(0, 0)
                                                                }, 200)
                                                                localStorage.setItem("type_catalog", item.type)
                                                                localStorage.setItem("id_catalog", item.id)
                                                                navigate("/modern")
                                                            }} className="button">
                                                                {t("more")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    if (item.type === "modern") {
                                        return <div key={index} data-aos="flip-up" className="bottom-direction">
                                            <img className="bg-direction" src={item.image}
                                                 alt="modern" loading="lazy"/>
                                            <div className="blur-direction">
                                                <div className="sloy-direction">
                                                    <div className="contents">
                                                        <h3 className="title-direction">
                                                            {item.translations[i18next.language].name}
                                                        </h3>
                                                        <strong className="des-direction">
                                                            {item.translations[i18next.language].description}
                                                        </strong>
                                                        <div className="footer-direction">
                                                            <div className="logo-direction">
                                                                <img src="./images/logo2.png" alt="logo-mill-mod"
                                                                     loading="lazy"/>
                                                            </div>
                                                            <div onClick={() => {
                                                                setTimeout(() => {
                                                                    window.scrollTo(0, 0)
                                                                }, 200)
                                                                localStorage.setItem("type_catalog", item.type)
                                                                localStorage.setItem("id_catalog", item.id)
                                                                navigate("/promo")
                                                            }} className="button">
                                                                {t("more")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                })}
                            </div>
                        </div>
                    </div>}
                </section>
                <section className="statistics">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="count-box">
                        <div className="count">
                            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                                <div className="num">
                                    {counterOn &&
                                        <CountUp start={0} end={statistics && statistics.clients} duration={2}
                                                 delay={0}/>}
                                    +
                                </div>
                            </ScrollTrigger>
                            <div className="text">
                                {t("client")}
                            </div>
                        </div>
                        <span className="line"></span>
                        <div className="count">
                            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                                <div className="num">
                                    {counterOn &&
                                        <CountUp start={0} end={statistics && statistics.products} duration={2}
                                                 delay={0}/>}
                                    +
                                </div>
                            </ScrollTrigger>
                            <div className="text">
                                {t("products")}
                            </div>
                        </div>
                        <span className="line"></span>
                        <div className="count">
                            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                                <div className="num">
                                    {counterOn &&
                                        <CountUp start={0} end={statistics && statistics.partners} duration={2}
                                                 delay={0}/>}
                                    +
                                </div>
                            </ScrollTrigger>
                            <div className="text">
                                {t("partners")}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="home-body-wrapper">
                    <div className="top-products">
                        <h2 data-aos="zoom-in-down" className="main-title">{t("topProducts")}</h2>
                        {/*<h3 data-aos="zoom-in"*/}
                        {/*    data-aos-easing="ease-in-back"*/}
                        {/*    data-aos-offset="0" className="title">*/}
                        {/*   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, sapiente.*/}
                        {/*</h3>*/}
                        <div className="contents-products">
                            <Slider {...settingsProductsSlider}>
                                {topProducts ? topProducts.map((item, index) => {
                                    return <div data-aos="flip-left" key={index} className="slider-box">
                                        <div className="img-box">
                                            <img src={item.photo} alt="top-product" loading="lazy"/>
                                        </div>
                                        <div className="text-box">
                                            <h4 className="title-top">{item.translations && item.translations[i18next.language].name}</h4>
                                            <div className="des-top">
                                                <div
                                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item.translations[i18next.language].description)}}/>
                                            </div>
                                            <div onClick={() => moreInfo(item)} className="more-btn">
                                                {t("more")}
                                            </div>
                                        </div>
                                    </div>
                                }) : ""}
                            </Slider>
                        </div>
                    </div>
                    <div data-aos="fade-up"
                         data-aos-duration="2000" ref={ref} className="form-lead">
                        <div className="left-side">
                            <LeadForm/>
                        </div>
                        <div className="right-side">
                            <div className="sloy">
                                <div className="logo-box">
                                    <div className="logo">
                                        <img src="./images/logo1.png" alt="logo-mill-mod" loading="lazy"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default Home;
