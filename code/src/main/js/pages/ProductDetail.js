import React, {useState} from 'react';
import localStyles from '../../scss/pages/ProductDetail.module.scss';

function ProductDetail() {
    return (
        <div className={localStyles["product-detail-page"]}>
            <div className={localStyles["showMobileOnly"]}
                 style={{marginTop: "4.1rem",marginLeft: "1rem", marginRight: "1rem"}}>
                <h6 className='text-uppercase fw-bold'> White Side Table </h6>
                <p>This is a description of White Side Table. Bla bla bla bla.
                    This is a description of White Side Table. Bla bla bla bla
                    This is a description of White Side Table. Bla bla bla bla</p>
                <h5> $30</h5>
                <button className={`mb-4 ${localStyles["btnToCart"]}`}>ADD TO CART</button>
            </div>

            <div className={localStyles["float_left"]}>
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
                    minWidth:"50%",
                    maxWidth: "100%",
                }}>
                    <img src="images/test_for_browse/white_side_table.jpeg" alt="white_side_table" width={250}
                         loading="lazy"
                         style={{
                             display: "block",
                             marginLeft: "auto",
                             marginRight: "auto",
                             minWidth:"50%",
                             maxWidth: "100%",
                         }}/>
                    <img src="images/test_for_browse/white_side_table.jpeg" alt="white_side_table" width={250}
                         loading="lazy"
                         style={{
                             display: "block",
                             marginLeft: "auto",
                             marginRight: "auto",
                             minWidth:"50%",
                             maxWidth: "100%",
                         }}/>

                </div>
            </div>

            <div className={localStyles["float_right"]}>
                <h5> $30</h5>
                <button className={`mb-4 ${localStyles["btnToCart"]}`}>ADD TO CART</button>
            </div>
        </div>
    )
}

export default ProductDetail;