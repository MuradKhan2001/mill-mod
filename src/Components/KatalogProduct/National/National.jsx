import React, {useRef, useState} from 'react';
import "./direction-style.scss"
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import {CSSTransition} from "react-transition-group";
import ReactPaginate from "react-paginate";

import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useNavigate} from "react-router-dom";


const National = () => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const nodeRef = useRef(null);
    const [products, setProducts] = useState([{img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}, {img: "./images/product.png"}]);

    const [stateActive, setStateActive] = useState(null)
    const [selectRegion, setSelectRegion] = useState(null)
    const [regionsList, setRegionsList] = useState([
        {
            img: "./images/region.png",
            name: "English"
        },
        {
            img: "./images/arabic.png",
            name: "Arabic"
        },
    ])

    const [productActive, setProductActive] = useState(null)
    const [selectProduct, setSelectProduct] = useState(null)
    const [categoryList, setCategoryList] = useState([
        {
            img: "./images/test-product2.png",
            name: "Bags"
        },
        {
            img: "./images/test-product1.png",
            name: "T-shirts"
        },
    ])

    const [modalContent, setModalContent] = useState({
        show: false, status: ""
    });

    const worksPage = 16;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * worksPage;
    const productList = products.slice(pagesVisited, pagesVisited + worksPage).map((item, index) => {
        return <div key={index} className="product">
            <LazyLoadImage
                alt={item.img}
                effect="blur"
                wrapperProps={{style: {transitionDelay: "0.7s"}}}
                src={item.img}/>
        </div>
    });


    const pageCount = Math.ceil(products.length / worksPage);

    const changePage = ({selected}) => {
        setPageNumber(selected)

        setTimeout(() => {
            ref.current?.scrollIntoView({behavior: "smooth"});
        }, 500);
    };

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
                        <div className="title">Davlatlar</div>
                        <div className="des">
                            Iltimos davlatni tanglang!
                        </div>
                        <div className="region-cards">
                            {regionsList.map((item, index) => {
                                return <div onClick={() => setSelectRegion({img: item.img, name: item.name})}
                                            className={`region ${selectRegion && selectRegion.img == item.img && "active"}`}>
                                    <div className="sloy">
                                        {selectRegion && selectRegion.img == item.img &&
                                            <div className="tick"><img src="./images/tick.png" alt=""/></div>}
                                        <div className="icon">
                                            <img src={item.img} alt=""/>

                                        </div>
                                        <div className="name">
                                            {item.name}
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                        <div onClick={() => {
                            if (selectRegion) {
                                setStateActive(selectRegion)
                                setModalContent({show: false})
                            }
                        }} className={`success-btn ${selectRegion && "active-btn"}`}>
                            Tasdiqlash
                        </div>
                    </div>)}

                    {modalContent.status === "products" && (<div className="products">
                        <div className="cancel-btn">
                            <img
                                onClick={() => {
                                    setModalContent({show: false})
                                    setSelectProduct(null)
                                }}
                                src="./images/close.png"
                                alt=""
                            />
                        </div>
                        <div className="title">Maxsulotlar</div>
                        <div className="des">
                            Iltimos maxsulotlarni tanglang!
                        </div>
                        <div className="region-cards">

                            {categoryList.map((item, index) => {
                                return <div key={index}
                                            onClick={() => setSelectProduct({img: item.img, name: item.name})}
                                            className={`region ${selectProduct && selectProduct.img == item.img && "active"}`}>
                                    <div className="sloy">
                                        {selectProduct && selectProduct.img == item.img &&
                                            <div className="tick"><img src="./images/tick.png" alt=""/></div>}
                                        <div className="icon">
                                            <img src={item.img} alt=""/>
                                        </div>
                                        <div className="name">
                                            {item.name}
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                        <div onClick={() => {
                            if (selectProduct) {
                                setProductActive(selectProduct)
                                setModalContent({show: false})
                            }
                        }} className={`success-btn ${selectRegion && "active-btn"}`}>
                            Tasdiqlash
                        </div>
                    </div>)}
                </div>
            </div>
        </CSSTransition>

        <Navbar/>

        <div className="banner-menu">
            <img src="./images/banner.png" alt="banner"/>
        </div>

        <div className="products-warapper">

            <div className="header-filter">
                {stateActive ?
                    <div onClick={() => {
                        setModalContent({show: true, status: "states"})
                        setSelectRegion(stateActive)
                    }} className="states">
                        <img src={stateActive.img} alt=""/>
                        {stateActive.name}
                    </div> :
                    <div onClick={() => setModalContent({show: true, status: "states"})} className="states">
                        <img src="./images/globe.png" alt=""/>
                        Davlatni tanlang
                    </div>}

                {productActive ?
                    <div onClick={() => {
                        setModalContent({show: true, status: "products"})
                        setSelectProduct(productActive)
                    }} className="states">
                        <img src={productActive.img} alt=""/>
                        {productActive.name}
                    </div> :
                    <div onClick={() => {
                        if (stateActive) {
                            setModalContent({show: true, status: "products"})
                        }
                    }} className={`states ${!stateActive && "disablet"}`}>
                        <img src="./images/product-icon.png" alt=""/>
                        Maxulotni tanlang
                    </div>}
            </div>

            <div ref={ref} className="info-product">
                <div className="section">
                    <div className="title">Eng kichik o'lcham</div>
                    <div className="size">10X15 sm</div>
                </div>

                <div className="section">
                    <div className="title">Eng kichik o'lcham</div>
                    <div className="size">10X15 sm</div>
                </div>

                <div className="section">
                    <div className="title">Eng kichik o'lcham</div>
                    <div className="size">10X15 sm</div>
                </div>

                <div className="section">
                    <div className="title">Eng kichik o'lcham</div>
                    <div className="size">10X15 sm</div>
                </div>
            </div>

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
                        Biz bilan bog'lanish
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

export default National;