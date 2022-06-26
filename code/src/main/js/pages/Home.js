import React from 'react';
import localStyles from '../../scss/pages/Home.module.scss';
import Product from "../components/Product";

function Home() {
    return (
        <div className={localStyles["home-page"]}>
            <h2>Home</h2>
            <Product/>
        </div>
    )
}

export default Home;