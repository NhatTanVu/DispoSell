import React from 'react';
import localStyles from '../../scss/pages/About.module.scss';

function About() {
    return (
        <div className={localStyles["about-page"]}>
            <h2>About Us</h2>
            <ul>
                <li>
                    {/* Ferry */}
                    <img src="images/about/avatar_Ferry.jpg" alt="Ferry" />
                </li>
                <li>
                    {/* Mariana */}
                    <img src="images/about/avatar_Mariana.jpg" alt="Mariana" />
                </li>
                <li>
                    {/* Tan */}
                    <a href="https://www.linkedin.com/in/tanvu/" target="_blank">
                        <img src="images/about/avatar_Tan.jpg" alt="Tan" />
                    </a>
                    <a href="https://www.linkedin.com/in/tanvu/" target="_blank">Nhat Tan Vu (CTO)</a>
                </li>
                <li>
                    {/* Khang */}
                    <img src="images/about/avatar_Khang.jpg" alt="Khang" />
                </li>
            </ul>
        </div>
    )
}

export default About;