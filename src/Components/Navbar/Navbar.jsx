import {useContext, useState, useRef, useEffect} from "react";
import "./style.scss";
import {useNavigate} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import {MyContext} from "../App/App";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import axios from "axios";


const Navbar = () => {
    const {t} = useTranslation();
    let value = useContext(MyContext);
    const [dropdownShow, setDropdownShow] = useState(false);
    const nodeRef = useRef(null);
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const [contact, setContact] = useState("");
    const [mobileSubmenu, setMobileSubmenu] = useState(false);
    const [directions, setDirections] = useState([]);

    useEffect(() => {
        axios.get(`${value.url}category/`).then((response) => {
            setDirections(response.data)
        });
    }, []);

    const language = [
        {
            code: "uz",
            name: "UZ",
            country_code: "uz",
        },
        {
            code: "en",
            name: "EN",
            country_code: "en",
        },
        {
            code: "ru",
            name: "RU",
            country_code: "ru",
        },
    ];

    const changeLanguage = (code) => {
        localStorage.setItem("lng", code);
        i18next.changeLanguage(code);
        setDropdownShow((prevState) => (prevState = false));
    };

    window.onclick = function (event) {
        if (!event.target.matches('.language-name')) {
            setDropdownShow(false)
        }
    };


    return <div className="navbar-wrapper">
        <div className="logo-desctop">
            <img onClick={() => navigate("/")} src="./images/logo1.png" alt="ss"/>
        </div>
        <CSSTransition
            in={window.innerWidth > 768 ? true : nav}
            nodeRef={nodeRef}
            timeout={100}
            classNames="alert"
            unmountOnExit
        >
            <div className="nav-list">
                <div ref={nodeRef} className="sloy-mobile">

                    <div onClick={() => {
                        setTimeout(() => {
                            window.scrollTo(0, 0)
                        }, 200)
                        navigate("/")
                    }} className="nav-item">
                        {t("home")}
                    </div>

                    <div onClick={() => {
                        setTimeout(() => {
                            window.scrollTo(0, 0)
                        }, 200)
                        navigate("/about-products")
                    }} className="nav-item">
                        {t("aboutProduct")}
                    </div>

                    <div className="nav-item-sub-desctop">
                        {t("katalogProduct")}
                        <div className="submenu">
                            {
                                directions.map((item, index) => {
                                    return <div key={index} onClick={() => {
                                        setTimeout(() => {
                                            window.scrollTo(0, 0)
                                        }, 200)
                                        localStorage.setItem("type_catalog", item.type)
                                        localStorage.setItem("id_catalog", item.id)
                                        if (item.type == "national") {
                                            navigate("/national")
                                        }
                                        if (item.type == "modern") {
                                            navigate("/modern")
                                        }
                                        if (item.type == "promo") {
                                            navigate("/promo")
                                        }
                                    }} className="name">
                                        {item.translations[i18next.language].name}
                                    </div>
                                })
                            }
                        </div>
                    </div>

                    <div onClick={() => setMobileSubmenu(!mobileSubmenu)} className="nav-item-sub-mobile">
                        {t("katalogProduct")}
                        <img className={`down ${mobileSubmenu ? "down-rotate" : ""}`} src="./images/down.png" alt=""/>
                    </div>

                    {mobileSubmenu && <div className="submenu-mobile">
                        {
                            directions.map((item, index) => {
                                return <div key={index} onClick={() => {
                                    setTimeout(() => {
                                        window.scrollTo(0, 0)
                                    }, 200)
                                    localStorage.setItem("type_catalog", item.type)
                                    localStorage.setItem("id_catalog", item.id)
                                    if (item.type == "national") {
                                        navigate("/national")
                                    }
                                    if (item.type == "modern") {
                                        navigate("/modern")
                                    }
                                    if (item.type == "promo") {
                                        navigate("/promo")
                                    }
                                }} className="name">
                                    {item.translations[i18next.language].name}
                                </div>
                            })
                        }

                    </div>}

                    <div onClick={() => {
                        setTimeout(() => {
                            window.scrollTo(0, 0)
                        }, 200)
                        navigate("/contact")
                    }} className="nav-item">
                        {t("contact")}
                    </div>
                </div>
            </div>
        </CSSTransition>

        <div className="mobile-left-side">

            <div className="logo">
                <img onClick={() => navigate("/")} src="./images/logo1.png" alt="ss"/>
            </div>

            <div className="language">
                <div className="dropdown">
                    <div
                        onClick={() => setDropdownShow((prevState) => !prevState)}
                        className="dropdown-header"
                    >
                        {language.map((item, index) => {
                            return (
                                <div className="language-name" key={index}>
                                    {i18next.language === item.code ? item.name : ""}
                                </div>
                            );
                        })}
                    </div>

                    {dropdownShow && (
                        <div className="dropdown-menu">
                            {language.map(({code, name, country_code}) => (
                                <div
                                    key={country_code}
                                    onClick={() => changeLanguage(code)}
                                    className="menu-item"
                                >
                                    {name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {nav ? <div className="nav-show">
                <img onClick={() => {
                    setNav(false)
                }} src="./images/close.png" alt=""/>
            </div> : <div className="nav-show">
                <img onClick={() => {
                    setNav(true)
                }} src="./images/menu_hamburger.png" alt=""/>
            </div>}
        </div>
    </div>
}
export default Navbar