import React, {useEffect} from 'react';
import "./style-about-product.scss"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Aos from "aos";

const AboutProduct = () => {
    const [products, setProducts] = React.useState([
        {
            product: "./images/product.png",
            img: "./images/banner.png",
            video: null,
        },
        {
            product: "./images/product2.png",
            img: null,
            video: "./images/home4.mp4",
        },
    ]);


    useEffect(() => {
        Aos.init({duration: 1000});
    }, [])
    return (
        <div className="about-product-wrapper">
            <Navbar/>
            <div className="banner-menu">
                <img src="./images/banner.png" alt=""/>
            </div>

            <div className="contents-products">

                {
                    products.map((item, index) => {
                        return <div data-aos="flip-up" className="content">
                            <div className="left-side">
                                <img src={item.product} alt=""/>
                            </div>
                            <div className="right-side">
                                {item.img && <img src={item.img} alt=""/>}
                                {item.video && <video autoPlay loop muted src={item.video}></video>}
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