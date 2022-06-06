import {Container, Nav, Navbar} from "react-bootstrap";
import React from "react";

function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark">
                <Nav className="me-auto ps-2">
                    <Navbar.Brand href="/">DispoSell</Navbar.Brand>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/category">Category</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
            </Navbar>
        </header>
    )
}

export default Header;