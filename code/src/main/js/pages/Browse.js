import React, {useState, useEffect} from "react";
import localStyles from '../../scss/pages/Browse.module.scss';
import Product from "../components/Product";
import ProductService from "../services/product.service";
import {Link, useNavigate} from "react-router-dom";

function Browse() {
    const [products, setProducts] = useState([]);
    const [category,setCategory]=useState([]);
    const [categoryid,setcategoryID]=useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ProductService.getCategories().then(
            response=>{
                console.log(response.data);
                setCategory(response.data);
            }
        )
        ProductService.getProducts().then(
            response => {
                setProducts(response.data);
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

    const handleFilter=(e,categoryID)=>{
        e.preventDefault();
        ProductService.getFilter(categoryID).then(
            response =>{
                console.log(response.data.productList);
                setProducts(response.data.productList);
                console.log(categoryID);
                setcategoryID(categoryID);
            }
        )
    }

    const handleSort=(e,categoryid,conditionStr)=>{
        e.preventDefault();
        if(categoryid==null){
            ProductService.getSort(conditionStr).then(
                response=>{
                    console.log(response.data.productList);
                    setProducts(response.data.productList);
                }
            )
        }else{
            ProductService.getFilterAndSort(categoryid,conditionStr).then(
                response=>{
                    console.log(response.data.productList);
                    setProducts(response.data.productList);
                }
            )
        }

    }

    return (
        <div className={localStyles["browse-page"]}>
            <div className={localStyles["showMobileOnly"]}
                 style={{marginTop: "4.1rem", marginLeft: "0px", marginRight: "0px"}}>
                <div className={`text-center`}
                     style={{
                         width: "-webkit-fill-available",
                         borderRightWidth: "1.5px",
                         borderStyle: "solid",
                         padding: "2% 10%"
                     }}>
                    {/*<Dropdown id={localStyles['dropdownMenu']}>*/}
                    {/*    <Dropdown.Toggle className="dropdown-basic" id={localStyles['dropdown-basic']}>*/}
                    <a>Category</a>
                    {/*    </Dropdown.Toggle>*/}
                    {/*    <Dropdown.Menu className={`text-center`} style={{inset:"unset"}}>*/}
                    {/*        <a href="" >All Categories</a><br/>*/}
                    {/*        <a href="#bedframes">Bed Frames</a><br/>*/}
                    {/*        <a href="#chairs">Chairs</a><br/>*/}
                    {/*        <a href="#diningTables">Dining Tables</a><br/>*/}
                    {/*        <a href="#sideTables">Side Tables</a><br/>*/}
                    {/*        <a href="#sofas">Sofas</a><br/>*/}
                    {/*        <a href="#stools">Stools</a>*/}
                    {/*    </Dropdown.Menu>*/}
                    {/*</Dropdown>*/}
                </div>
                <div style={{
                    width: "-webkit-fill-available",
                    borderLeftWidth: "1.5px",
                    borderStyle: "solid",
                    padding: "2% 10%"
                }} className={`text-center`}>
                    <a>Sort</a>
                </div>
            </div>

            <div className={localStyles["float_left"]} style={{
                left: "0",
                position: "fixed",
            }}>
                {/*<Link as={Link} to={`/browse`}>*/}
                {/*    <h3>All Categories</h3>*/}
                {/*</Link>*/}
                <h3>All Categories</h3>
                {category.map((val)=>(
                    <a onClick={(e) => handleFilter(e,val.categoryID)}>{val.name}<br/></a>
                ))}
            </div>

            <div className={localStyles["middleSection"]}>
                <div id="bedframes">
                    <div className="container">
                        <div className="row d-flex justify-content-around">
                            <Product products={products}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={localStyles["float_right"]}>
                <h3>Sort</h3>
                <a onClick={(e) => handleSort(e,categoryid,"publishedDate,DESC")}>Latest Arrivals</a> <br/>
                <a onClick={(e) => handleSort(e,categoryid,"sellingPrice")}>Price: Low to High</a> <br/>
                <a onClick={(e) => handleSort(e,categoryid,"sellingPrice,DESC")}>Price: High to Low</a>
            </div>
        </div>
    )
}

export default Browse;