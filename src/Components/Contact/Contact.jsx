import React from 'react';
import "./contact-style.scss";
import LeadForm from "../ContactLead/LeadForm";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Contact = () => {

    return (
        <div className="contact-wrapper">
            <Navbar/>

            <div className="contents">
                <div className="left-side">
                    <LeadForm/>
                </div>

                <div className="right-side">
                    <div className="sloy">
                        <div className="item-contact">
                            <div className="icon">
                                <img src="./images/phone3.png" alt=""/>
                            </div>
                            <a href="" className="name">
                                +998 97 777 77 77
                            </a>
                        </div>

                        <div className="item-contact">
                            <div className="icon">
                                <img src="./images/tg2.png" alt=""/>
                            </div>
                            <a href="" className="name">
                                @millmode
                            </a>
                        </div>

                        <div className="item-contact">
                            <div className="icon">
                                <img src="./images/ins2.png" alt=""/>
                            </div>
                            <a href="" className="name">
                                @millmode
                            </a>
                        </div>

                        <div className="item-contact">
                            <div className="icon">
                                <img src="./images/face2.png" alt=""/>
                            </div>
                            <a href="" className="name">
                                @millmode
                            </a>
                        </div>

                        <div className="item-contact">
                            <div className="icon">
                                <img src="./images/what2.png" alt=""/>
                            </div>
                            <a href="" className="name">
                                @millmode
                            </a>
                        </div>

                        <div className="item-contact">
                            <div className="icon">
                                <img src="./images/email2.png" alt=""/>
                            </div>
                            <a href="" className="name">
                                millmode2024@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Contact;