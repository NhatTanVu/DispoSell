import {Button, Container, Dropdown, DropdownButton, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

import localStyles from '../../scss/components/header.module.scss';

function Header() {
    const [isUser, setIsUser] = useState(false);
    const [isDelivery, setIsDelivery] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const signOut = () => {
        AuthService.logout();
        setIsUser(false);
        setIsDelivery(false);
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
            setIsAdmin(user.roles.includes("ROLE_ADMIN"));
            setIsDelivery(user.roles.includes("ROLE_DELIVERY"));
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
                        <Navbar.Collapse id="basic-navbar-nav"
                                         className='justify-content-end'>
                            <Nav className={`align-items-center`}>
                                <Nav.Link as={Link} to="/">Browse</Nav.Link>
                                &nbsp;
                                <Nav.Link as={Link} to="/search">Search</Nav.Link>
                                &nbsp;
                                <NavDropdown title="Account" key="down" drop="down">
                                    {isUser && <Nav.Link as={Link} to="/user">User</Nav.Link>}
                                    {isDelivery && <Nav.Link as={Link} to="/delivery">Delivery</Nav.Link>}
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
                <Container>
                    <Navbar>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center'>
                            <Nav className="text-center">
                                <Nav.Link as={Link} to="/">
                                    <img className={`${localStyles["icon"]}`} src="images/icons/browse.png"
                                         alt="Browse"/>
                                    <br/>Browse
                                </Nav.Link>
                                &nbsp;
                                <Nav.Link as={Link} to="/search">
                                    <img className={localStyles["icon"]} src="images/icons/search.png" alt="Search"/>
                                    <br/>Search
                                </Nav.Link>
                                &nbsp;

                                <div>
                                    <img className={`${localStyles["icon"]}`} src="images/icons/account.png"
                                         alt="Account"/>

                                    <NavDropdown title="Account" drop='up' className={localStyles['dropdown']}>
                                        {isUser && <Nav.Link as={Link} to="/user">User</Nav.Link>}
                                        {isDelivery && <Nav.Link as={Link} to="/delivery">Delivery</Nav.Link>}
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


                                &nbsp;
                                <Nav.Link as={Link} to="/cart">
                                    <img className={`${localStyles["icon"]}`} src="images/icons/cart.png" alt="Cart"/>
                                    <br/>
                                    Cart</Nav.Link>
                                &nbsp;
                                <Nav.Link as={Link} to="/trade">
                                    <img className={`${localStyles["icon"]}`} src="images/icons/trade.png" alt="Trade"/>
                                    <br/>
                                    Trade
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
