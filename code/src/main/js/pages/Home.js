import React from 'react';
import localStyles from '../../scss/pages/Home.module.scss';
import Product from "../components/Product";

function Home() {
    return (
        <div className={localStyles["home-page"]}>
            <h1>Home Page</h1>
        </div>
    )
}

export default Home;