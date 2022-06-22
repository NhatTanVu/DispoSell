import React from 'react';
import localStyles from '../../scss/pages/Home.module.scss';
import {HashLink as Link} from "react-router-hash-link";

function Home() {
    return (
        <div>
            <div className={`align-top ${localStyles["cover"]}`}>
                <div className='justify-content-center text-center'>
                    <h2 style={{fontStyle:'italic', color:'white', fontFamily:"SFProDisplay, sans-serif, Fallback"}}>HOME SWEET HOME</h2>
                    <img className={localStyles["disposellLogo"]} src="/images/logos/DispoSellblack.png" alt="DispoSell"/>
                    <h2 style={{fontStyle:'italic', color:'white', fontFamily:"SFProDisplay, sans-serif, Fallback"}}>BUY AND TRADE PRE-LOVED FURNITURE</h2>
                </div>
                <div className={`justify-content-evenly ${localStyles["div-hover"]}`}>
                    <Link to="#" className={localStyles["anchor"]}>
                        <img className={localStyles["anchorScrollDown"]} src="/images/home/anchor-scrolldown.png" alt="Scroll anchor"/>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Home;