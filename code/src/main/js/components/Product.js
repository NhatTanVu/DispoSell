import React, {useState, useEffect} from "react";
import localStyles from "../../scss/components/product.module.scss";
import {Link} from "react-router-dom";
import ProductService from "../services/product.service";
import {addCartItem} from "../redux/cartSlice";
import {useDispatch} from "react-redux";

function Product() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        ProductService.getProducts().then(
            response => {
                setProducts(response.data);
                console.log(response.data);
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
        )
    }, []);

    const onCLick = (e,index) => {
        e.persist();

        const product = products.at(index);
        const price = product.sellingPrice;
        const id = product.productID;
        const productName = product.name;
        const productMediaURL = product.productMedia[0].url;
        const productMediaType = product.productMedia[0].fileType;

        console.log(product.productMedia[0].url);


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
                    </Link> <Link as={Link} to={`/productDetail/${product.productID}`}>
                    <h6 className='text-uppercase fw-bold'><span id='productName'>{product.name}</span></h6></Link>
                    {/*<p>{product.productMedia[0].url}</p>*/}
                    <h5>$<span id='price'>{product.sellingPrice}</span></h5>
                    <button className={`mb-4 ${localStyles["btnToCart"]}`} onClick={(e) => onCLick(e, _id)}>ADD TO CART</button>
                </div>
            ))}
        </div>
        // <div className='col-md-3 col-lg-3 col-xl-3 align-items-center text-start' style={{
        //     display: "block",
        //     marginLeft: "auto",
        //     marginRight: "auto",
        //     minWidth: "80%",
        //     maxWidth: "100%",
        // }}>
        //     <Link as={Link} to="/productdetail">
        //         <img src="images/test_for_browse/white_side_table.jpeg" alt="white_side_table" width={250}
        //              loading="lazy"
        //              style={{
        //                  display: "block",
        //                  marginLeft: "auto",
        //                  marginRight: "auto",
        //                  minWidth: "80%",
        //                  maxWidth: "100%",
        //              }}/>
        //     </Link> <Link as={Link} to="/productdetail">
        //     <h6 className='text-uppercase fw-bold'> White Side Table </h6></Link>
        //     <h5> $30</h5>
        //     <button className={`mb-4 ${localStyles["btnToCart"]}`}>ADD TO CART</button>
        // </div>
    )
}

export default Product;
