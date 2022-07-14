import React, {useState, useEffect} from "react";
import localStyles from "../../scss/components/product.module.scss";
import {Link} from "react-router-dom";
import ProductService from "../services/product.service";

function Product() {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        ProductService.getProduct().then(
            response => {
                setProduct(response.data);
                console.log(response.data);
            },
            error => {
                setProduct(
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

    function addToCart(id) {
         let cart = JSON.parse(localStorage.getItem("items") || "[]");

        // Modifying
        let item = {
            id: id
        };
        cart.push(item);
        console.log("Added item #" + item.id);

        // Saving
        localStorage.setItem("users", JSON.stringify(cart));

        // let cart = JSON.parse(localStorage.getItem("items") || "[]");
        console.log("# of items in the cart: " + cart.length);
        cart.forEach(function(item, index) {
            console.log("[" + index + "]: " + item.id);
        });
    }

    return (
        <div className="d-inline-flex row justify-content-around" style={{padding: "2rem"}}>
            {products.map((product) => (
                <div className="col-sm-auto" key={product.productID}>
                    <Link as={Link} to={`/productdetail/id=${product.productID}`}>
                        <img src={`${product.productMedia[0].url}`} alt={product.name} width={250}
                             loading="lazy"
                             style={{
                                 display: "block",
                                 marginLeft: "auto",
                                 marginRight: "auto",
                                 minWidth: "80%",
                                 maxWidth: "100%",
                             }}/>
                    </Link> <Link as={Link} to={`/productdetail/id=${product.productID}`}>
                    <h6 className='text-uppercase fw-bold'> {product.name} </h6></Link>
                    {/*<p>{product.productMedia[0].url}</p>*/}
                    <h5>${product.sellingPrice}</h5>
                    <button className={`mb-4 ${localStyles["btnToCart"]}`} onClick={addToCart(`${product.productID}`)}>ADD TO CART</button>
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
