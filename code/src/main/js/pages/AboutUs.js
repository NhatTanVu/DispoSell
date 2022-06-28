import React from "react";
import localStyles from '../../scss/pages/AboutUs.module.scss';

import { HashLink as Link } from "react-router-hash-link";

function AboutUs() {
    return (
        <div className={localStyles["aboutUs"]}>
            <div className={`align-top ${localStyles["cover"]}`}>
                <div className={localStyles["float_left"]}>
                    <img className={localStyles["aboutTxt"]} src="/images/AboutUs/abouttxt.png" alt="Our Team"/>
                </div>
                <div className={`justify-content-evenly ${localStyles["div-hover"]}`}>
                        <Link to="#our-team" className={localStyles["anchor"]}>
                            <img className={localStyles["anchorOurTeam"]} src="/images/AboutUs/anchor-ourteam.png" alt="Our Team anchor"/>
                        </Link>
                </div>
                <div className={localStyles["float_right"]}>
                    <div className={localStyles["container"]}>
                        <p>DispoSell is a web application company that is focused on solving the
                            inconveniences of furniture removal and the crippling condition of
                            furniture poverty. We operate in Metro Vancouver, primarily in the cities of Vancouver,
                            Burnaby, and New Westminster.
                            <br/> <br/>
                            We believe that unused furniture in usable condition deserves a second chance.
                            We collect unused furniture, refurbish them, and sell them through our website.
                            First, we collect unused usable furniture from our users.
                            Then, we make sure the furniture is usable by making minor fixes like painting and cleaning.
                            Last but not least, we sell the furniture on our website.
                        </p>
                    </div>
                </div>
            </div>

            <div className={`${localStyles["team"]} justify-content-evenly`} id="our-team">
                <div className={`${localStyles["float_left"]} justify-content-center`}>
                    <img className={localStyles["teamTxt"]} src="/images/AboutUs/ourteamtxt.png" alt="Our Team"/>
                </div>
                <div className={localStyles["float_right"]}>
                    <table>
                        <tr className='justify-content-center'>
                            <td>
                                {/*Ferry */}
                                <a href="https://www.linkedin.com/in/ferryalviantotjahjadi/" target="_blank">
                                    <img src="images/Leadership/avatar_Ferry.jpg" alt="Ferry" width={351}/>
                                </a>
                                <br/>
                                <a href="https://www.linkedin.com/in/ferryalviantotjahjadi/" target="_blank">Ferry
                                    Tjahjadi<br/>CEO</a>
                            </td>
                            <td>
                                {/*Mariana*/}
                                <a href="https://www.linkedin.com/in/mariana-meneses-del-valle/" target="_blank">
                                    <img src="images/Leadership/avatar_Mariana.jpg" alt="Mariana" width={351}/>
                                </a>
                                <br/>
                                <a href="https://www.linkedin.com/in/mariana-meneses-del-valle/" target="_blank">
                                    Mariana Meneses<br/>Data Analyst</a>
                            </td>
                        </tr>
                        <tr className='justify-content-center'>
                            <td>
                                {/*Tan*/}
                                <a href="https://www.linkedin.com/in/tanvu/" target="_blank">
                                    <img src="images/Leadership/avatar_Tan.jpg" alt="Tan" width={351}/>
                                </a>
                                <br/>
                                <a href="https://www.linkedin.com/in/tanvu/" target="_blank">Nhat Tan Vu<br/>CTO</a>
                            </td>
                            <td>
                                {/*Khang*/}
                                <a href="https://www.linkedin.com/in/khangtruong8385/" target="_blank">
                                    <img src="images/Leadership/avatar_Khang.jpg" alt="Khang" width={351}/>
                                </a>
                                <br/>
                                <a href="https://www.linkedin.com/in/khangtruong8385/" target="_blank">Khang
                                    Truong<br/>Junior Developer</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;