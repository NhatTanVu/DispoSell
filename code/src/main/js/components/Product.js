import React from "react";
import localStyles from "../../scss/components/product.module.scss";

function Product(){
    return (
        <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 align-items-center text-start'>
            <img src="images/test_for_browse/white_side_table.jpeg" alt="white_side_table" width={250}/>
            <h6 className='text-uppercase fw-bold'> White Side Table </h6>
            <h5> $30</h5>
            <button className={`mb-4 ${localStyles["btnToCart"]}`}>Add to Cart</button>
        </div>
    )
}

export default Product;
