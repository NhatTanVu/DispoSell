import React from 'react';
import localStyles from '../../scss/pages/About.module.scss';

function About() {
    return (
        <div className={localStyles["about-page"]}>
            <h2>About Us</h2>
            <ul>
                <li><a href="https://www.linkedin.com/in/tanvu/" target="_blank">Nhat Tan Vu (CTO)</a></li>
            </ul>
        </div>
    )
}

export default About;