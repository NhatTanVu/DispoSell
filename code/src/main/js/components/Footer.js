import React from "react";
import {Link} from "react-router-dom";

import localStyles from '../../scss/components/footer.module.scss';

import {MDBFooter} from 'mdb-react-ui-kit';

function Footer() {
    return (
        // <MDBFooter bgColor='light' className='text-center text-lg-start'>
        <MDBFooter bgColor='light' className={`text-center text-lg-start ${localStyles["sticky"]}`}>
            <section className='border-top'>
                <div className='container text-center text-md-start mt-5'>
                    <div className='row mt-3'>
                        <div className='col-md-4 col-lg-4 col-xl-4 mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Newsletter Sign Up</h6>
                            <form>
                                <div className="form-outline mb-4">
                                    <input type="text" id="form5Example1" className="form-control"
                                           placeholder='First Name'/>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="email" id="form5Example2" className="form-control"
                                           placeholder="Email address"/>
                                </div>

                                <div className="form-check align-content-center mb-4">
                                    <input className="form-check-input me-2" type="checkbox" value=""
                                           id="form5Example3"/>
                                    <label className="form-check-label" htmlFor="form5Example3">
                                        Sign up for promotions and get 10% off your first order* </label>
                                </div>

                                <button type="submit" className={`mb-4 ${localStyles["btnSubscribe"]}`}>Subscribe</button>

                                <p className={localStyles["finePrint"]}>*New users only. You may unsubscribe at any
                                    time.</p>
                            </form>
                        </div>

                        <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Company</h6>
                            <p>
                                <a href="/AboutUs" className='text-reset'>
                                    About
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Contact
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Privacy Policy
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Terms & Conditions
                                </a>
                            </p>
                        </div>

                        <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Buy</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Track Delivery
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Purchases & Returns
                                </a>
                            </p>
                        </div>

                        <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Trade</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Track Pick-up
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Removal Request
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    FAQ
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className={`${localStyles["showMobileOnly"]} text-center p-4`} style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                <p>© 2022 DispoSell</p>
            </div>
            <div className='text-center p-4' style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                © 2022 DispoSell
            </div>
        </MDBFooter>
    )
}

export default Footer;