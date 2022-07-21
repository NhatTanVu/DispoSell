import React, {useState, useEffect} from "react";
import localStyles from "../../scss/components/product.module.scss";
import {Link, useNavigate} from "react-router-dom";
import ProductService from "../services/product.service";
import {addCartItem} from "../redux/cartSlice";
import {useDispatch} from "react-redux";

function Product({products}) {
    const dispatch = useDispatch();

    const onClick = (e, product) => {
        e.persist();

        const price = product.sellingPrice;
        const id = product.productID;
        const productName = product.name;
        const productMediaURL = product.productMedia[0]?.url;
        const productMediaType = product.productMedia[0]?.fileType;

        console.log(product.productMedia[0]?.url);

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
        <div className="d-inline-flex row justify-content-around" style={{padding: "2rem"}}>
            {products.map((product, _id) => (
                <div className="col-sm-auto" key={_id}>
                    {/*<div id="productID" style={{visibility:"visible"}}>{product.productID}</div>*/}
                    {product.productMedia && product.productMedia.length > 0 &&
                        <Link as={Link} to={`/productDetail/${product.productID}`}>
                            <img src={`${product.productMedia[0].url}`} alt={product.name} width={250}
                                 loading="lazy"
                                 style={{
                                     display: "block",
                                     marginLeft: "auto",
                                     marginRight: "auto",
                                     minWidth: "80%",
                                     maxWidth: "100%",
                                 }}/>
                        </Link>} <Link as={Link} to={`/productDetail/${product.productID}`}>
                    <h6 className='text-uppercase fw-bold'><span id='productName'>{product.name}</span></h6></Link>
                    {/*<p>{product.productMedia[0].url}</p>*/}
                    <h5>$<span id='price'>{product.sellingPrice}</span></h5>
                    <button className={`mb-4 ${localStyles["btnToCart"]}`} onClick={(e) => onClick(e, product)}>ADD TO
                        CART
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Product;
