import {Container, Nav, Navbar} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="sm">
                <Container>
                    <Navbar.Brand as={Link} to="/">DispoSell</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">

                        <Nav>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/category">Category</Nav.Link>
                            <Nav.Link as={Link} to="/leadership">Leadership</Nav.Link>
                            <Nav.Link as={Link} to="/aboutUs">About Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;