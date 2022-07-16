import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import localStyles from '../../scss/pages/ProductDetail.module.scss';
import {addCartItem, setCartInfo} from "../redux/cartSlice";
import {useDispatch} from 'react-redux';

function ProductDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [productDetail, setProductDetail] = useState({});

    useEffect(() => {

    }, []);

    function addToCart(){
        dispatch(addCartItem(id,
            [
                {
                    "url": "image 1.jpg",
                    "fileType": "jpg",
                }
            ],
            20, 1));
        //alert(id);


    }

    return (
        <div className={localStyles["product-detail-page"]}>
            <div className={`align-self-center ${localStyles["float_left"]}`} style={{marginBottom: "10rem"}}>
                <h6 className='text-uppercase fw-bold'> White Side Table </h6>
                <p>This is a description of White Side Table. Bla bla bla bla.
                    This is a description of White Side Table. Bla bla bla bla
                    This is a description of White Side Table. Bla bla bla bla</p>
            </div>

            <div className={localStyles["middleSection"]}>
                <div className='col-md-3 col-lg-3 col-xl-3 align-items-center text-start' style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    minWidth: "50%",
                    maxWidth: "100%",
                }}>
                    <img src="images/test_for_browse/white_side_table.jpeg" alt="white_side_table" width={250}
                         loading="lazy"
                         style={{
                             display: "block",
                             marginLeft: "auto",
                             marginRight: "auto",
                             minWidth: "50%",
                             maxWidth: "100%",
                         }}/>
                    <img src="images/test_for_browse/white_side_table.jpeg" alt="white_side_table" width={250}
                         loading="lazy"
                         style={{
                             display: "block",
                             marginLeft: "auto",
                             marginRight: "auto",
                             minWidth: "50%",
                             maxWidth: "100%",
                         }}/>

                </div>
            </div>

            <div className={`align-self-center ${localStyles["float_right"]}`} style={{marginBottom: "10rem"}}>
                <h5> $30</h5>
                <button className={`mb-4 ${localStyles["btnToCart"]}`} onClick={addToCart}>ADD TO CART</button>
            </div>

            <div className={` ${localStyles["showMobileOnly"]}`}
                 style={{marginBottom: "5rem", padding: "1rem", position: "fixed"}}>
                <h6 className='text-uppercase fw-bold'> White Side Table </h6>
                <p>This is a description of White Side Table. Bla bla bla bla.
                    This is a description of White Side Table. Bla bla bla bla
                    This is a description of White Side Table. Bla bla bla bla</p>
                <h5> $30</h5>
                <button className={`mb-4 ${localStyles["btnToCart"]}`}>ADD TO CART</button>
            </div>
        </div>
    )
}

export default ProductDetail;