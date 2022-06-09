import React from 'react';
import localStyles from '../../scss/pages/Leadership.module.scss';

function Leadership() {
    return (
        <div className={localStyles["leadership"]}>
            <h2>Executive Profiles</h2>
            <ul>
                <li>
                    {/* Ferry */}
                    <a href="https://www.linkedin.com/in/ferryalviantotjahjadi/" target="_blank">
                        <img src="images/Leadership/avatar_Ferry.jpg" alt="Ferry Tjahjadi" />
                    </a>
                    <a href="https://www.linkedin.com/in/ferryalviantotjahjadi/" target="_blank">Ferry Tjahjadi (CEO)</a>
                </li>
                <li>
                    {/* Mariana */}
                    <a href="https://www.linkedin.com/in/mariana-meneses-del-valle/" target="_blank">
                        <img src="images/Leadership/avatar_Mariana.jpg" alt="Mariana" />
                    </a>
                    <a href="https://www.linkedin.com/in/mariana-meneses-del-valle/" target="_blank">
                        Mariana Meneses (Data Analyst)</a>
                </li>
                <li>
                    {/* Tan */}
                    <a href="https://www.linkedin.com/in/tanvu/" target="_blank">
                        <img src="images/Leadership/avatar_Tan.jpg" alt="Tan" />
                    </a>
                    <a href="https://www.linkedin.com/in/tanvu/" target="_blank">Nhat Tan Vu (CTO)</a>
                </li>
                <li>
                    {/* Khang */}
                    <img src="images/Leadership/avatar_Khang.jpg" alt="Khang" />
                </li>
            </ul>
        </div>
    )
}

export default Leadership;