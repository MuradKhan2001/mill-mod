import React, {useEffect, useState} from 'react';
import "./style-home.scss"
import Navbar from "../Navbar/Navbar";
import Slider from "react-slick";
import Textra from 'react-textra'
import {useTranslation} from "react-i18next";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import LeadForm from "../ContactLead/LeadForm";
import Footer from "../Footer/Footer";
// import Aos from "aos";

const Home = () => {
    const [statistics, setStatistic] = useState({
        clients: 2001,
        orders: 300,
        projects: 20
    });
    const [counterOn, setCounterOn] = useState(false);
    const {t} = useTranslation();
    const [homePhoto, setHomePhoto] = useState([
        {image: "./images/home1.png", video: null},
        {image: "./images/home2.png", video: null},
        {image: "./images/home2.webp", video: null},
        {video: "./images/home4.mp4", image: null},
    ]);

    const [topProducts, setTopProducts] = useState([
        {
            img: "./images/product.png",
            title: "Lorem ipsum dolor sit amet consectetur",
            description: "Lorem ipsum dolor sit amet consectetur. Adipiscing tincidunt leo non praesent morbi."
        },
        {
            img: "./images/product2.png",
            title: "Lorem ipsum dolor sit amet consectetur",
            description: "Lorem ipsum dolor sit amet consectetur. Adipiscing tincidunt leo non praesent morbi."
        },
        {
            img: "./images/product.png",
            title: "Lorem ipsum dolor sit amet consectetur",
            description: "Lorem ipsum dolor sit amet consectetur. Adipiscing tincidunt leo non praesent morbi."
        },
        {
            img: "./images/product2.png",
            title: "Lorem ipsum dolor sit amet consectetur",
            description: "Lorem ipsum dolor sit amet consectetur. Adipiscing tincidunt leo non praesent morbi."
        },
        {
            img: "./images/product.png",
            title: "Lorem ipsum dolor sit amet consectetur",
            description: "Lorem ipsum dolor sit amet consectetur. Adipiscing tincidunt leo non praesent morbi."
        },
    ])

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
            breakpoint: 1024, settings: {
                slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: false
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
        // Aos.init({duration: 1000});
    }, [])

    return (
        <div className="home-wrapper">
            <Navbar/>
            <div className="home-slider-wrapper">
                <Slider {...settingsHomeSlider}>
                    {homePhoto ? homePhoto.map((item, index) => {
                        return <div key={index}>
                            {item.image && <img src={item.image} alt=""/>}
                            {item.video && <video autoPlay loop muted src={item.video}></video>}
                        </div>
                    }) : ""}
                </Slider>
                <div className="sloy">
                    <div className="content-home">
                        <div className="top-text">
                            <Textra effect='scale' data={[t("national"), t("modern"), t("promo")]}/>
                        </div>

                        <div className="body-text">
                            {t("mainTextHome")}
                        </div>

                        <div className="home-button">
                            {t("buttonRegister")}
                        </div>
                    </div>
                </div>
            </div>

            <div className="home-body-wrapper">
                <div className="about-us">
                    <div className="main-title">{t("aboutUs")}</div>
                    <div className="title">
                        Lorem ipsum dolor sit amet consectetur. Sit urna tortor diam leo. Neque sem
                    </div>
                    <div className="des">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                        type
                        and scrambled it to make a type specimen book.
                    </div>
                    <div className="slider-about-us">
                        <Slider {...settingsAboutUsSlider}>
                            {homePhoto ? homePhoto.map((item, index) => {
                                return <div key={index}>
                                    {item.image && <img src={item.image} alt=""/>}
                                    {item.video && <video autoPlay loop muted src={item.video}></video>}
                                </div>
                            }) : ""}
                        </Slider>
                    </div>
                </div>
                <div className="directions">
                    <div className="title">
                        {t("directions")}
                    </div>
                    <div className="bottom-content">
                        <div className="left-side">
                            <img className="bg-direction" src="./images/direction3.png" alt=""/>
                            <div className="blur-direction">
                                <div className="sloy-direction">
                                    <div className="contents">
                                        <div className="title-direction">
                                            {t("national")}
                                        </div>
                                        <div className="des-direction">
                                            {t("direction1")}
                                        </div>
                                        <div className="footer-direction">
                                            <div className="logo-direction">
                                                <img src="./images/logo2.png" alt=""/>
                                            </div>
                                            <div className="button">
                                                {t("more")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-side">

                            <div className="top-direction">
                                <img className="bg-direction" src="./images/direction2.png" alt=""/>
                                <div className="blur-direction">
                                    <div className="sloy-direction">
                                        <div className="contents">
                                            <div className="title-direction">
                                                {t("promo")}
                                            </div>
                                            <div className="des-direction">
                                                {t("direction2")}
                                            </div>
                                            <div className="footer-direction">
                                                <div className="logo-direction">
                                                    <img src="./images/logo2.png" alt=""/>
                                                </div>
                                                <div className="button">
                                                    {t("more")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bottom-direction">
                                <img className="bg-direction" src="./images/direction1.png" alt=""/>
                                <div className="blur-direction">
                                    <div className="sloy-direction">
                                        <div className="contents">
                                            <div className="title-direction">
                                                {t("modern")}
                                            </div>
                                            <div className="des-direction">
                                                {t("direction3")}
                                            </div>
                                            <div className="footer-direction">
                                                <div className="logo-direction">
                                                    <img src="./images/logo2.png" alt=""/>
                                                </div>
                                                <div className="button">
                                                    {t("more")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="statistics">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="count-box">
                    <div className="count">
                        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                            <div className="num">
                                {counterOn &&
                                    <CountUp start={0} end={statistics && statistics.clients} duration={2} delay={0}/>}
                                +
                            </div>
                        </ScrollTrigger>
                        <div className="text">
                            Mijozlar
                        </div>
                    </div>
                    <span className="line"></span>
                    <div className="count">
                        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                            <div className="num">
                                {counterOn &&
                                    <CountUp start={0} end={statistics && statistics.orders} duration={2} delay={0}/>}
                                +
                            </div>
                        </ScrollTrigger>
                        <div className="text">
                            Maxsulotlar
                        </div>
                    </div>
                    <span className="line"></span>
                    <div className="count">
                        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                            <div className="num">
                                {counterOn &&
                                    <CountUp start={0} end={statistics && statistics.projects} duration={2} delay={0}/>}
                                +
                            </div>
                        </ScrollTrigger>
                        <div className="text">
                            Hamkorlar
                        </div>
                    </div>
                </div>
            </div>

            <div className="home-body-wrapper">
                <div className="top-products">
                    <div className="main-title">{t("topProducts")}</div>
                    <div className="title">
                        {t("topProductsDees")}
                    </div>
                    <div className="contents-products">
                        <Slider {...settingsProductsSlider}>
                            {topProducts ? topProducts.map((item, index) => {
                                return <div key={index} className="slider-box">
                                    <div className="img-box">
                                        <img src={item.img} alt=""/>
                                    </div>
                                    <div className="text-box">
                                        <div className="title-top">{item.title}</div>

                                        <div className="des-top">
                                            {item.description}
                                        </div>

                                        <div className="more-btn">
                                            {t("more")}
                                        </div>
                                    </div>
                                </div>
                            }) : ""}
                        </Slider>
                    </div>
                </div>

                <div className="form-lead">
                    <div className="left-side">
                        <LeadForm/>
                    </div>
                    <div className="right-side">
                        <div className="sloy">
                            <div className="logo-box">
                                <div className="logo">
                                    <img src="./images/logo1.png" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
