import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

import localStyles from '../../scss/components/header.module.scss';

function Header() {
    const [isUser, setIsUser] = useState(false);
    const [isShipper, setIsShipper] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const signOut = () => {
        AuthService.logout();
        setIsUser(false);
        setIsShipper(false);
        setIsAdmin(false);
        setCurrentUser(null);
        navigate("/");
        window.location.reload();
    }

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setIsUser(user.roles.includes("ROLE_USER"));
            setIsAdmin(user.roles.includes("ROLE_ADMINISTRATOR"));
            setIsShipper(user.roles.includes("ROLE_SHIPPER"));
        }

        EventBus.on("logout", () => {
            signOut();
        });

        return () => {
            // Anything in here is fired on component unmount.
            EventBus.remove("logout");
        }
    }, []);

    return (
        <div>
            <header className={`fixed-top ${localStyles["headerStyle"]}`}>
                <Container>
                    <Navbar expand='sm' className={localStyles["showDesktopOnly"]}>
                        <Navbar.Brand href="/" className={localStyles["showAlways"]}>
                            <img height={40} className={localStyles["logoBlack"]} src="images/logos/DispoSellblack.png"
                                 alt="DispoSell Logo"/>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id={`basic-navbar-nav ${localStyles['dropdown']}`}
                                         className='justify-content-end'>
                            <Nav className={`align-items-center`}>
                                <Nav.Link as={Link} to="/browse">Browse</Nav.Link>
                                &nbsp;
                                <Nav.Link as={Link} to="/search">Search</Nav.Link>
                                &nbsp;
                                <NavDropdown title="Account" key="down" drop="down" className={localStyles['dropdownMenu']}>

                                    {/*{isUser && <Nav.Link as={Link} to="/user">User</Nav.Link>}*/}
                                    {/*{isDelivery && <Nav.Link as={Link} to="/delivery">Delivery</Nav.Link>}*/}
                                    {/*{isAdmin && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}*/}

                                    {currentUser ? (<>
                                        <Nav.Link as={Link} to="/profile"
                                                  style={{color: "darkgreen"}}>{currentUser.username}</Nav.Link>
                                        <Nav.Link as={Link} to="/login" onClick={signOut}>Log out</Nav.Link>
                                    </>) : (<>
                                        <Nav.Link as={Link} to="/login">Log in</Nav.Link>
                                        <Nav.Link as={Link} to="/register">Sign up</Nav.Link>
                                    </>)}
                                </NavDropdown>
                                &nbsp;
                                <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                                &nbsp;
                                <Nav.Link as={Link} to="/trade">
                                    <button className={`rounded-pill ${localStyles["btnTrade"]}`}>Trade
                                    </button>
                                </Nav.Link>
                             </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </header>

            <div className={`fixed-bottom ${localStyles["showMobileOnly"]}`}>
                <Container style={{paddingLeft:"0", paddingRight:"0"}}>
                    {/*<Navbar collapseOnSelect expand={false}>*/}
                    <Navbar style={{paddingBottom:"0"}}>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-around">
                            <Nav className={`text-center ${localStyles["navContainer"]}`} style={{maxWidth:"-webkit-fit-content"}}>
                                <Nav.Link as={Link} to="/browse">
                                    <img className={`${localStyles["icon"]}`} src="images/icons/browse.png"
                                         alt="Browse"/>
                                    <span className="nav-link">Browse</span>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/search">
                                    <img className={localStyles["icon"]} src="images/icons/search.png" alt="Search"/>
                                    <span className="nav-link">Search</span>
                                </Nav.Link>
                                <div className={localStyles['accountMobile']}>
                                    <img className={localStyles["icon"]} src="images/icons/account.png" alt="Account" id={localStyles['accountImg']}/>
                                    <NavDropdown title="Account" key="up" drop="up" className={localStyles['dropdownMenu']} id={localStyles["dropdown-basic"]}>
                                        {isUser && <Nav.Link as={Link} to="/user">User</Nav.Link>}
                                        {isShipper && <Nav.Link as={Link} to="/delivery">Delivery</Nav.Link>}
                                        {isAdmin && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
                                        {currentUser ? (<>
                                            <Nav.Link as={Link} to="/profile"
                                                      style={{color: "darkgreen"}}>{currentUser.username}</Nav.Link>
                                            <Nav.Link as={Link} to="/login" onClick={signOut}>Sign out</Nav.Link>
                                        </>) : (<>
                                            <Nav.Link as={Link} to="/login">Log in</Nav.Link>
                                            <Nav.Link as={Link} to="/register">Sign up</Nav.Link>
                                        </>)}
                                    </NavDropdown>
                                </div>


                                {/*<Nav.Link>*/}
                                {/*    <img className={`${localStyles["icon"]}`} src="images/icons/account.png"*/}
                                {/*         alt="Account"/>*/}
                                {/*    <Dropdown drop='up' key='up'>*/}
                                {/*        <Dropdown.Toggle id={localStyles["dropdown-basic"]}>*/}
                                {/*            <a>Account</a>*/}
                                {/*        </Dropdown.Toggle>*/}
                                {/*        <Dropdown.Menu className={`text-center ${localStyles['menuCenter']}`}>*/}
                                {/*            {isUser && <Nav.Link as={Link} to="/user">User</Nav.Link>}*/}
                                {/*            {isDelivery && <Nav.Link as={Link} to="/delivery">Delivery</Nav.Link>}*/}
                                {/*            {isAdmin && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}*/}
                                {/*            {currentUser ? (<>*/}
                                {/*                <Nav.Link as={Link} to="/profile"*/}
                                {/*                          style={{color: "darkgreen"}}>{currentUser.username}</Nav.Link>*/}
                                {/*                <Nav.Link as={Link} to="/login" onClick={signOut}>Sign out</Nav.Link>*/}
                                {/*            </>) : (<>*/}
                                {/*                <Nav.Link as={Link} to="/login">Log in</Nav.Link>*/}
                                {/*                <Nav.Link as={Link} to="/register">Sign up</Nav.Link>*/}
                                {/*            </>)}*/}
                                {/*        </Dropdown.Menu>*/}
                                {/*    </Dropdown>*/}

                                {/*<NavDropdown title="Account" drop='up' className={`${localStyles['dropdown']}`} >*/}
                                {/*</NavDropdown>*/}
                                {/*</Nav.Link>*/}

                                <Nav.Link as={Link} to="/cart">
                                    <img className={`${localStyles["icon"]}`} src="images/icons/cart.png" alt="CartTest"/>
                                    <span className="nav-link">Cart</span>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/trade">
                                    <img className={`${localStyles["icon"]}`} src="images/icons/trade.png" alt="Trade"/>
                                    <span className="nav-link">Trade</span>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </div>
        </div>
    )
}

export default Header;