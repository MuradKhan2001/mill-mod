import React, {useContext, useEffect, useState} from 'react';
import "./footer-style.scss"
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {MyContext} from "../App/App";

const Footer = () => {
    let value = useContext(MyContext);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        axios.get(`${value.url}contact/`).then((response) => {
            setContacts(response.data)
        });

    }, [])
    return (
        <div className="footer-wrapper">
            <div className="body-footer">
                <div className="section">
                    <img className="logo" src="./images/logo2.png" alt="logo-mill-mod" loading="lazy"/>
                    <div className="des-footer">
                        {t("des_footer")}
                    </div>
                    {
                        contacts.map((item, index) => {
                            return <div key={index} className="social-medias">
                                <a href={item.instagram}>
                                    <img src="./images/ins1.png" alt="instagram" loading="lazy"/>
                                </a>
                                <a href={item.facebook}>
                                    <img src="./images/face1.png" alt="facebook" loading="lazy"/>
                                </a>
                                <a href={item.telegram}>
                                    <img src="./images/tg1.png" alt="telegram" loading="lazy"/>
                                </a>
                                <a href={item.whatsup}>
                                    <img src="./images/what1.png" alt="whatsup" loading="lazy"/>
                                </a>
                            </div>
                        })
                    }
                </div>
                <div className="section mobile-section">
                    <h1 className="title-section">
                        {t("katalogProduct")}
                    </h1>

                    <h3 onClick={() => {
                        setTimeout(() => {
                            window.scrollTo(0, 0)
                        }, 200)
                        navigate("/national")
                    }} className="name">
                        {t("national")}
                    </h3>

                    <h3 onClick={() => {
                        setTimeout(() => {
                            window.scrollTo(0, 0)
                        }, 200)
                        navigate("/modern")
                    }} className="name">
                        {t("modern")}
                    </h3>

                    <h3 onClick={() => {
                        setTimeout(() => {
                            window.scrollTo(0, 0)
                        }, 200)
                        navigate("/promo")
                    }} className="name">
                        {t("promo")}
                    </h3>
                </div>
                {
                    contacts.map((item, index) => {
                        return <div key={index} className="section">
                            <div className="title-section mobile-title">
                                {t("contact")}
                            </div>
                            <h3 className="name">
                                {t("contactText")}
                            </h3>
                            <div className="name">
                                <div className="icon">
                                    <img src="./images/phone.png" alt="phone" loading="lazy"/>
                                </div>

                                <a href={`tel:${item.phone}`}>{item.phone}</a>
                            </div>
                            <div className="name">
                                <div className="icon">
                                    <img src="./images/email.png" alt="email" loading="lazy"/>
                                </div>

                                <a href={"mailto:" + item.email}>{item.email}</a>
                            </div>
                        </div>
                    })
                }
            </div>
            <strong className="footer">
                mill&mod 2024
            </strong>
        </div>
    );
};

export default Footer;