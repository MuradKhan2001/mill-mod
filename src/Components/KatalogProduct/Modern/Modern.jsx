import React, {useContext, useEffect, useRef, useState} from 'react';
import "./direction-style.scss"
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import {CSSTransition} from "react-transition-group";
import ReactPaginate from "react-paginate";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {MyContext} from "../../App/App";
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";


const Modern = () => {
    let value = useContext(MyContext);
    const {t} = useTranslation();
    const [category, setCategory] = useState([]);
    const [productType, setProductType] = useState([]);
    const [banner, setBanner] = useState([]);
    const ref = useRef(null);
    const navigate = useNavigate();
    const nodeRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [stateActive, setStateActive] = useState(null)
    const [selectRegion, setSelectRegion] = useState(null)
    const [productActive, setProductActive] = useState(null)
    const [selectProduct, setSelectProduct] = useState(null)
    const [productSize, setProductSize] = useState([])
    const [modalContent, setModalContent] = useState({
        show: !sessionStorage.getItem("direction") && true,
        status: "states"
    });

    const worksPage = 16;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * worksPage;
    const productList = products.slice(pagesVisited, pagesVisited + worksPage).map((item, index) => {
        return <div key={index} className="product">
            <LazyLoadImage
                alt={item.photo}
                effect="blur"
                wrapperProps={{style: {transitionDelay: "0.7s"}}}
                src={item.photo}/>
        </div>
    });
    const pageCount = Math.ceil(products.length / worksPage);
    const changePage = ({selected}) => {
        setPageNumber(selected)

        setTimeout(() => {
            ref.current?.scrollIntoView({behavior: "smooth"});
        }, 500);
    };
    useEffect(() => {
        axios.get(`${value.url}banner/?type=category&page=${localStorage.getItem("type_catalog")}`).then((response) => {
            setBanner(response.data[0])
        });

        axios.get(`${value.url}direction/`).then((response) => {
            setCategory(response.data)

            if (sessionStorage.getItem("direction")) {
                axios.get(`${value.url}product/?direction=${response.data[sessionStorage.getItem("direction")].id}&category=${localStorage.getItem("type_catalog")}/`).then((response) => {
                    setProducts(response.data)
                    console.log(response.data)
                });
            }
        });

        axios.get(`${value.url}product-type/`).then((response) => {
            setProductType(response.data)
        });

    }, [])
    const selectCategory = (selected) => {
        if (selected) {
            setStateActive(selected)
            setModalContent({show: false})

            axios.get(`${value.url}product/?direction=${selected.id}&category=${localStorage.getItem("type_catalog")}/`).then((response) => {
                setProducts(response.data)
            });
        }
    }
    const selectProductType = (selected) => {
        if (selected) {
            setProductActive(selected)
            setModalContent({show: false})

            axios.get(`${value.url}product/?product_type=${selected.id}&direction=${category[sessionStorage.getItem("direction")].id}&category=${localStorage.getItem("type_catalog")}/`).then((response) => {
                setProducts(response.data)
            });

            axios.get(`${value.url}product-size/?product_type=${selected.id}`).then((response) => {
                setProductSize(response.data)
            });
        }
    }

    return (<div className="direction-wrapper">
        <Helmet>
            <title>{t("modern-title")}</title>
            <meta name="description"
                  content={t("modern-des")}/>
        </Helmet>
        <CSSTransition
            in={modalContent.show}
            nodeRef={nodeRef}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
            <div
                className="modal-sloy">
                <div ref={nodeRef} className="modal-card">
                    {modalContent.status === "states" && (<div className="states">
                        <div className="cancel-btn">
                            <img
                                onClick={() => {
                                    setModalContent({show: false})
                                    setSelectRegion(null)
                                }}
                                src="./images/close.png"
                                alt=""
                            />
                        </div>
                        <div className="title">{t("direction")}</div>
                        <div className="des">
                            {t("des_direction")}
                        </div>
                        <div className="region-cards">
                            {category && category.map((item, index) => {
                                return <div key={index} onClick={() => {
                                    setSelectRegion({
                                        icon: item.icon,
                                        name: item.translations[i18next.language].name,
                                        index: index,
                                        id: item.id
                                    })
                                    sessionStorage.setItem("direction", index)
                                }}
                                            className={`region ${sessionStorage.getItem("direction") == index && "active"}`}>
                                    <div className="sloy">
                                        {sessionStorage.getItem("direction") == index &&
                                            <div className="tick"><img src="./images/tick.png" alt=""/></div>}
                                        <div className="icon">
                                            <img src={item.icon} alt=""/>
                                        </div>
                                        <div className="name">
                                            {item.translations[i18next.language].name}
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                        <div onClick={() => selectCategory(selectRegion)}
                             className={`success-btn ${sessionStorage.getItem("direction") && "active-btn"}`}>
                            {t("success")}
                        </div>
                    </div>)}

                    {modalContent.status === "products" && (<div className="products">
                        <div className="cancel-btn">
                            <img
                                onClick={() => {
                                    setModalContent({show: false})
                                }}
                                src="./images/close.png"
                                alt=""
                            />
                        </div>
                        <div className="title">{t("product")}</div>
                        <div className="des">
                            {t("des_product")}
                        </div>
                        <div className="region-cards">

                            {productType && productType.map((item, index) => {
                                return <div key={index} onClick={() =>
                                    setSelectProduct({
                                        icon: item.icon,
                                        name: item.translations[i18next.language].name,
                                        index: index,
                                        id: item.id
                                    })}
                                            className={`region ${selectProduct && selectProduct.icon == item.icon && "active"}`}>
                                    <div className="sloy">

                                        {selectProduct && selectProduct.icon == item.icon &&
                                            <div className="tick"><img src="./images/tick.png" alt=""/></div>}

                                        <div className="icon">
                                            <img src={item.icon} alt=""/>
                                        </div>
                                        <div className="name">
                                            {item.translations[i18next.language].name}
                                        </div>

                                    </div>
                                </div>
                            })}

                        </div>

                        <div onClick={() => selectProductType(selectProduct)}
                             className={`success-btn ${selectProduct && "active-btn"}`}>
                            {t("success")}
                        </div>
                    </div>)}
                </div>
            </div>
        </CSSTransition>
        <header>
            <Navbar/>
        </header>
        <main>
            <div className="banner-menu">
                {banner && <img src={banner.iamge} alt="modern-banner" loading="lazy"/>}
            </div>
            <div className="products-warapper">

                <div className="header-filter">
                    {sessionStorage.getItem("direction") ?
                        <div onClick={() => {
                            setModalContent({show: true, status: "states"})
                            setSelectRegion(stateActive)
                        }} className="states">
                            <div className="icon-filter">
                                <img
                                    src={category[Number(sessionStorage.getItem("direction"))] && category[Number(sessionStorage.getItem("direction"))].icon}
                                    alt="direction" loading="lazy"/>/>
                            </div>
                            {category[Number(sessionStorage.getItem("direction"))] && category[Number(sessionStorage.getItem("direction"))].translations[i18next.language].name}
                        </div> :
                        <div onClick={() => setModalContent({show: true, status: "states"})} className="states">
                            <div className="icon-filter">
                                <img src="./images/direction_icon.png" alt="direction" loading="lazy"/>
                            </div>
                            {t("direction")}
                        </div>}

                    {productActive ?
                        <div onClick={() => {
                            setModalContent({show: true, status: "products"})
                            setSelectProduct(productActive)
                        }} className="states">
                            <div className="icon-filter-product">
                                <img src={productActive.icon} alt="product" loading="lazy"/>
                            </div>
                            {productType[productActive.index].translations[i18next.language].name}
                        </div> :
                        <div onClick={() => {
                            if (sessionStorage.getItem("direction")) {
                                setModalContent({show: true, status: "products"})
                            }
                        }} className={`states ${!sessionStorage.getItem("direction") && "disablet"}`}>
                            <div className="icon-filter">
                                <img src="./images/product-icon.png" alt="product" loading="lazy"/>
                            </div>
                            {t("product")}
                        </div>}
                </div>
                {productSize.length > 0 && <div ref={ref} className="info-product">
                    <div className="product-info-box">
                        {productSize.map((item, index) => {
                            return <div key={index} className="section">
                                <div className="title">{item.translations[i18next.language].category}</div>
                                <div className="size">{item.translations[i18next.language].size}</div>
                            </div>
                        })}
                    </div>
                </div>}
                <div className="products-box">
                    <div className="products">
                        {productList}
                    </div>
                    <div className="pagination-warapper">
                        <div onClick={() => {
                            setTimeout(() => {
                                window.scrollTo(0, 0)
                            }, 200)
                            navigate("/contact")
                        }} className="button-register">
                            {t("contactText")}
                        </div>

                        <div className="pagination">
                            {products.length > 0 ? <ReactPaginate
                                breakLabel="..."
                                previousLabel={<img src="./images/prev.png" alt=""/>}
                                nextLabel={<img src="./images/next.png" alt=""/>}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledCalassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            /> : ""}
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>);
};

export default Modern;