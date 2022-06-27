import React from 'react';
import localStyles from '../../scss/pages/Home.module.scss';
import Product from "../components/Product";
import {HashLink as Link} from "react-router-hash-link";

function Home() {
    return (
        <div className={localStyles["home"]}>
            <div className={localStyles['shadow']}>
                <div className={`align-content-center justify-content-center text-center ${localStyles["cover"]}`}>
                    <h2 style={{color: "white", fontStyle: "italic"}}>HOME SWEET HOME<br/>
                        <img src="/images/logos/DispoSellblack.png" alt="DispoSell Logo"
                             className={localStyles['disposellLogo']} loading='lazy'/>
                        <br/>BUY & TRADE PRE-LOVED FURNITURE</h2>
                    <div className={`justify-content-evenly ${localStyles["div-hover"]}`}>
                        <Link to="#featured-products" className={localStyles["anchor"]}>
                            <img className={localStyles["anchorScrollDown"]} src="/images/home/anchor-scrolldown.png"
                                 alt="Featured Products anchor" loading='lazy'/>
                        </Link>
                    </div>
                </div>
            </div>


            <div id="featured-products" className={`text-center align-content-center justify-content-center ${localStyles['featuredProducts']}`}>
                <div className='align-self-baseline text-center' style={{position:"absolute", paddingTop:"2em"}}><h2>Featured Products</h2></div>
                <div className='container text-center text-md-start mt-5'>
                    <div className='row mt-3'>
                        <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                        test
                        </div>

                        <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                        test
                        </div>

                        <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                        test
                        </div>

                        <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                        test
                        </div>

                        </div>
                </div>
            </div>

            <div className={localStyles['trade']}>
                <div className={`align-content-center justify-content-center text-center`}>
                    <h2 style={{color: "white", fontStyle: "italic"}}>TRYING TO GET RID OF YOUR FURNITURE?<br/>
                        <img src="/images/home/request.png" alt="Request a pick-up"
                             className={localStyles['request']} loading='lazy'/>
                        <br/>FREE REMOVAL SERVICE, TRADE & GET STORE CREDIT*
                        <div style={{padding:"1.5em"}}>
                            <button className={`mb-4 ${localStyles["btnTrade"]}`}>Trade Now</button>
                        </div>
                    </h2>
                    <div className='text-start'>
                        <p style={{fontSize:"x-small", marginLeft:"3em"}}>*<a style={{textDecoration:"underline"}} href="">Terms & Conditions</a> applied.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;