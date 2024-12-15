import React, {useContext, useEffect, useState} from 'react';
import "./contact-style.scss";
import LeadForm from "../ContactLead/LeadForm";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import {MyContext} from "../App/App";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

const Contact = () => {
    const {t} = useTranslation();
    let value = useContext(MyContext);
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        axios.get(`${value.url}contact/`).then((response) => {
            setContacts(response.data)
        });

    }, [])
    return (
        <div className="contact-wrapper">
            <Helmet>
                <title>{t("contact-title")}</title>
                <meta name="description"
                      content={t("contact-des")}/>
            </Helmet>
            <header>
                <Navbar/>
            </header>
            <main>
                <section className="contents">
                    <div className="left-side">
                        <LeadForm/>
                    </div>

                    <div className="right-side">
                        {
                            contacts.map((item, index) => {
                                return <div key={index} className="sloy">
                                    <div className="item-contact">
                                        <div className="icon">
                                            <img src="./images/phone3.png" alt="phone" loading="lazy"/>
                                        </div>
                                        <a href={`tel:${item.phone}`} className="name">{item.phone}</a>
                                    </div>

                                    <div className="item-contact">
                                        <div className="icon">
                                            <img src="./images/tg2.png" alt="telegram" loading="lazy"/>
                                        </div>
                                        <a href={item.telegram} className="name">
                                            Telegram
                                        </a>
                                    </div>

                                    <div className="item-contact">
                                        <div className="icon">
                                            <img src="./images/ins2.png" alt="instagram" loading="lazy"/>
                                        </div>
                                        <a href={item.instagram} className="name">
                                            Instagram
                                        </a>
                                    </div>

                                    <div className="item-contact">
                                        <div className="icon">
                                            <img src="./images/face2.png" alt="facebook" loading="lazy"/>
                                        </div>
                                        <a href={item.facebook} className="name">
                                            Facebook
                                        </a>
                                    </div>

                                    <div className="item-contact">
                                        <div className="icon">
                                            <img src="./images/what2.png" alt="whatsup" loading="lazy"/>
                                        </div>
                                        <a href={item.whatsup} className="name">
                                            Whatsup
                                        </a>
                                    </div>

                                    <div className="item-contact">
                                        <div className="icon">
                                            <img src="./images/email2.png" alt="email" loading="lazy"/>
                                        </div>
                                        <a href={"mailto:" + item.email}>{item.email}</a>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                </section>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default Contact;