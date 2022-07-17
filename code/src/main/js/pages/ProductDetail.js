import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import localStyles from '../../scss/pages/ProductDetail.module.scss';
import {addCartItem, setUserInfo} from "../redux/cartSlice";
import {useDispatch} from 'react-redux';
import ProductService from "../services/product.service";
import {onDOMContentLoaded} from "bootstrap/js/src/util";

function ProductDetail() {
    let {id} = useParams();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const index = Number(id) - 1

    useEffect(() => {
        ProductService.getProducts().then(
            response => {
                setProducts(response.data);
                //console.log(response.data);
            },
            error => {
                setProducts(
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                );

                if (error.response && (error.response.status == 401 || error.response.status == 403)) {
                    navigate("/");
                }
            }
        );
    }, []);

    let price;
    let productName;
    let productMediaURL;
    let productMediaType;

    const onCLick = (e) => {
        let product = products.at(index);
        price = product.sellingPrice;
        productName = product.name;
        productMediaURL = product.productMedia[0].url;
        productMediaType = product.productMedia[0].fileType;

        console.log(product);
        console.log(price);
        console.log(productName);
        console.log(productMediaURL);
        console.log(productMediaType);

        dispatch(addCartItem(
            Number(id),
            productName,
            [
                {
                    "url": productMediaURL,
                    "fileType": productMediaType,
                }
            ],
            Number(price), Number(1)));
    }

    return (
        <div className={localStyles["product-detail-page"]} style={{minHeight: "100vh"}}>
            <div className={`align-self-center ${localStyles["float_left"]}`} style={{marginBottom: "10rem"}}>
                <h6 className='text-uppercase fw-bold'> productName </h6>
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
                    <img src={productMediaURL} alt="white_side_table" width={250}
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
                <h5> $sellingPrice</h5>
                <button className={`mb-4 ${localStyles["btnToCart"]}`} onClick={onCLick}>ADD TO CART</button>
            </div>

            <div className={` ${localStyles["showMobileOnly"]}`}
                 style={{marginBottom: "5rem", padding: "1rem", position: "fixed"}}>
                <h6 className='text-uppercase fw-bold'> White Side Table </h6>
                <p>This is a description of White Side Table. Bla bla bla bla.
                    This is a description of White Side Table. Bla bla bla bla
                    This is a description of White Side Table. Bla bla bla bla</p>
                <h5> $sellingPrice</h5>
                <button className={`mb-4 ${localStyles["btnToCart"]}`}>ADD TO CART</button>
            </div>
        </div>
    )
}

export default ProductDetail;