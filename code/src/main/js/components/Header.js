import {Container, Nav, Navbar} from "react-bootstrap";
import React from "react";

function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="sm">
                <Container>
                    <Navbar.Brand href="/">DispoSell</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/category">Category</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;