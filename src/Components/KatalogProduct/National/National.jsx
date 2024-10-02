import React, {useRef, useState} from 'react';
import "./direction-style.scss"
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import {CSSTransition} from "react-transition-group";
import ReactPaginate from "react-paginate";

import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';





const National = () => {
    const nodeRef = useRef(null);
    const [products, setProducts] = useState([
        {img: "./images/product.png"}
    ]);
    const [modalContent, setModalContent] = useState({
        show: false,
        status: ""
    });

    const worksPage = 3;
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
    };

    return (
        <div className="direction-wrapper">
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
                        {modalContent.status === "states" && (
                            <div className="states">
                                <div className="cancel-btn">
                                    <img
                                        onClick={() => setModalContent({show: false})}
                                        src="./images/close.png"
                                        alt=""
                                    />
                                </div>
                                <div className="title">Davlatni tanlang</div>
                            </div>
                        )}
                    </div>
                </div>
            </CSSTransition>

            <Navbar/>

            <div className="banner-menu">
                <img src="./images/banner.png" alt="banner"/>
            </div>

            <div className="products-warapper">

                <div className="header-filter">
                    <div onClick={() => setModalContent({show: true, status: "states"})} className="states">
                        Davlatni tanlang
                    </div>
                </div>

                <div className="info-product">
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
                        <div className="button-register">
                            Biz bilan bog'lanish
                        </div>

                        <div className="pagination">
                            {
                                products.length > 0 ?
                                    <ReactPaginate
                                        previousLabel={<img src="./images/prev.png" alt=""/>}
                                        nextLabel={<img src="./images/next.png" alt=""/>}
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={"paginationBttns"}
                                        previousLinkClassName={"previousBttn"}
                                        nextLinkClassName={"nextBttn"}
                                        disabledCalassName={"paginationDisabled"}
                                        activeClassName={"paginationActive"}
                                    /> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default National;