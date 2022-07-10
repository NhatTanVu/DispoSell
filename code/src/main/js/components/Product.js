import React from "react";
import localStyles from "../../scss/components/product.module.scss";
import {Link} from "react-router-dom";

function Product() {
    return (

        //  you connect to back-end, it should be synchronous img + title product + price
        <div className='col-md-3 col-lg-3 col-xl-3 align-items-center text-start' style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            minWidth: "80%",
            maxWidth: "100%",
        }}>
            <Link as={Link} to="/productdetail">
                <img src="images/test_for_browse/white_side_table.jpeg" alt="white_side_table" width={250}
                     loading="lazy"
                     style={{
                         display: "block",
                         marginLeft: "auto",
                         marginRight: "auto",
                         minWidth: "80%",
                         maxWidth: "100%",
                     }}/>
            </Link> <Link as={Link} to="/productdetail">

            <h6 className='text-uppercase fw-bold'> White Side Table </h6></Link>

            <h5> $30</h5>
            <button className={`mb-4 ${localStyles["btnToCart"]}`}>ADD TO CART</button>
        </div>
    )
}

export default Product;
