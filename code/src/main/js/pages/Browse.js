import React from 'react';
import localStyles from '../../scss/pages/Browse.module.scss';
import Product from "../components/Product";
import {Dropdown} from "react-bootstrap";

function Browse() {
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
                <h3>All Categories</h3>
                <a href="#bedframes">Bed Frames</a>
                <br/>
                <a href="#chairs">Chairs</a>
                <br/>
                <a href="#diningTables">Dining Tables</a>
                <br/>
                <a href="#sideTables">Side Tables</a>
                <br/>
                <a href="#sofas">Sofas</a>
                <br/>
                <a href="#stools">Stools</a>
            </div>

            <div className={localStyles["middleSection"]}>
                <div id="bedframes">
                    <div className="container">
                        <h2>Bed Frames</h2>
                        <div className="row d-flex justify-content-around">
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="chairs">
                    <div className="container">
                        <br/>
                        <h2>Chairs</h2>
                        <div className="row d-flex justify-content-around">
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="diningTables">
                    <div className="container">
                        <br/>
                        <h2>Dining Tables</h2>
                        <div className="row d-flex justify-content-around">
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="sideTables">
                    <div className="container">
                        <br/>
                        <h2>Side Tables</h2>
                        <div className="row d-flex justify-content-around">
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="sofas">
                    <div className="container">
                        <br/>
                        <h2>Sofas</h2>
                        <div className="row d-flex justify-content-around">
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="stools">
                    <div className="container">
                        <br/>
                        <h2>Stools</h2>
                        <div className="row d-flex justify-content-around">
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                            <div className="col-lg-auto">
                                <Product/>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>

            <div className={localStyles["float_right"]}>
                <h3>Sort</h3>
                <a>Latest Arrivals</a> <br/>
                <a>Price: Low to High</a> <br/>
                <a>Price: High to Low</a>
            </div>
        </div>
    )
}

export default Browse;