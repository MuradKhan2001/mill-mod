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


const Promo = () => {
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
        show: false,
        status: ""
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

        axios.get(`${value.url}product/?category=${localStorage.getItem("type_catalog")}/`).then((response) => {
            setProducts(response.data)
        });

        axios.get(`${value.url}product-type/`).then((response) => {
            setProductType(response.data)
        });

    }, [])

    const selectProductType = (selected) => {
        if (selected) {
            setProductActive(selected)
            setModalContent({show: false})

            axios.get(`${value.url}product/?product_type=${selected.id}&category=${localStorage.getItem("type_catalog")}/`).then((response) => {
                setProducts(response.data)
            });

            axios.get(`${value.url}product-size/?product_type=${selected.id}`).then((response) => {
                setProductSize(response.data)
            });
        }
    }

    return (<div className="direction-wrapper">
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

        <Navbar/>

        <div className="banner-menu">
            {banner && <img src={banner.iamge} alt="banner"/>}
        </div>

        <div className="products-warapper">

            <div className="header-filter">
                {productActive ?
                    <div onClick={() => {
                        setModalContent({show: true, status: "products"})
                        setSelectProduct(productActive)
                    }} className="states">
                        <div className="icon-filter-product">
                            <img src={productActive.icon} alt=""/>
                        </div>
                        {productType[productActive.index].translations[i18next.language].name}
                    </div> :
                    <div onClick={() => {
                        setModalContent({show: true, status: "products"})
                    }} className={`states`}>
                        <div className="icon-filter">
                            <img src="./images/product-icon.png" alt=""/>
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
                        {t("buttonRegister")}
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

        <Footer/>
    </div>);
};

export default Promo;