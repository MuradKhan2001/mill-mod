import React from 'react';
import "./footer-style.scss"
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="footer-wrapper">

            <div className="body-footer">
                <div className="section">
                    <img className="logo" src="./images/logo2.png" alt=""/>

                    <div className="des-footer">
                        Leverage agile frameworks to provide a robust synopsis for strategy collaborative
                    </div>

                    <div className="social-medias">
                        <a href="#">
                            <img src="./images/ins1.png" alt=""/>
                        </a>

                        <a href="#">
                            <img src="./images/face1.png" alt=""/>
                        </a>

                        <a href="#">
                            <img src="./images/tg1.png" alt=""/>
                        </a>

                        <a href="#">
                            <img src="./images/what1.png" alt=""/>
                        </a>

                    </div>
                </div>

                <div className="section mobile-section">
                    <div className="title-section">
                        {t("katalogProduct")}
                    </div>

                    <div onClick={() => {
                        setTimeout(() => {
                            window.scrollTo(0, 0)
                        }, 200)
                        navigate("/auto-dealerships")
                    }} className="name">
                        {t("national")}
                    </div>

                    <div onClick={() => {
                        setTimeout(() => {
                            window.scrollTo(0, 0)
                        }, 200)
                        navigate("/auto-auctions")
                    }} className="name">
                        {t("modern")}
                    </div>

                    <div onClick={() => {
                        setTimeout(() => {
                            window.scrollTo(0, 0)
                        }, 200)
                        navigate("/rental-car-companies")
                    }} className="name">
                        {t("promo")}
                    </div>
                </div>

                <div className="section">
                    <div className="title-section mobile-title">
                        {t("contact")}
                    </div>

                    <div className="name">
                        {t("contactText")}
                    </div>

                    <div className="name">
                        <div className="icon">
                            <img src="./images/phone.png" alt=""/>
                        </div>
                        <a href="#">+998 97 777 77 77</a>
                    </div>

                    <div className="name">
                        <div className="icon">
                            <img src="./images/email.png" alt=""/>
                        </div>
                        <a href="#">millmod@gmail.com</a>
                    </div>

                </div>
            </div>
            <div className="footer">
                mill&mod 2024
            </div>

        </div>
    );
};

export default Footer;