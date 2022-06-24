import React from "react";
import localStyles from "../../scss/components/product.module.scss";

function Product(){
    return (
        <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 align-items-center text-start'>
            <img/>
            <h6 className='text-uppercase fw-bold mb-4'> {/*product name*/} </h6>
            <h5> CAD {/*product name*/}</h5>
            <button className={`mb-4 ${localStyles["btnToCart"]}`}>Add to Cart</button>
        </div>
    )
}

export default Product;
