import React, {useState, useEffect} from "react";
import localStyles from '../../scss/pages/Browse.module.scss';
import Product from "../components/Product";
import ProductService from "../services/product.service";
import {Link, useNavigate} from "react-router-dom";

function Search() {
    const [products, setProducts] = useState([]);
    const [filterdProduct, setFilterProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        ProductService.getProducts().then(
            response => {
                setProducts(response.data);
                setFilterProduct(response.data);
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
const handleSearch=(e)=>{
    var keywords=e.target.value.toLowerCase(); //the name of product in database must all lowercase
    console.log(keywords);
    if(keywords==''){
        ProductService.getProducts().then(
            response => {
                setFilterProduct(response.data);
            }
        )
    }else{
        setFilterProduct(products.filter((product)=>product.name.toLowerCase().includes(keywords)));    }
}
    return (
        <div className={localStyles["browse-page"]}>
            <div className={localStyles["middleSection"]}>
                <div id="bedframes">
                    <div className="container">
                        <div className="col-md-6 align-self-center">
                            <input type="text" className="form-control" id="filter" placeholder="Search furniture..."
                                   onChange={handleSearch}/>
                        </div>
                        <div className="row d-flex justify-content-around">
                            <Product products={filterdProduct}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;