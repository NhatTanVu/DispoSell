import React from 'react';
import localStyles from '../../scss/pages/Browse.module.scss';
import Product from "../components/Product";

function Browse() {
    return (
        <div className={localStyles["browse-page"]}>

            <div className={localStyles["float_left"]}>
                <h3>All Categories</h3>
                <a href="#bedframe">Bed Frames</a>
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
                <div className={localStyles["showMobileOnly"]}>
                    <h3>Sort</h3>
                    <p>Latest Arrivals</p>
                    <p>Price: Low to High</p>
                    <p>Price: High to Low</p>
                </div>
            </div>
            <div className={localStyles["middleSection"]}>
                <div id="bedframe">
                    <h2>Bed Frame</h2>
                    <div className="container">
                        <div className="row align-items-center text-start">
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="chairs">
                    <h2>Chairs</h2>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="diningTables">
                    <h2>Dining Tables</h2>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="sideTables">
                    <h2>Side Tables</h2>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="sofas">
                    <h2>Sofas</h2>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="stools">
                    <h2>Stools</h2>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                            <div className="col-lg">
                                <Product/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={localStyles["float_right"]}>
                <h3>Sort</h3>
                <p>Latest Arrivals</p>
                <p>Price: Low to High</p>
                <p>Price: High to Low</p>
            </div>
        </div>

    )
}

export default Browse;