import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import '../scss/App.scss';
import Home from './pages/Home';
import Category from './pages/Category';
import About from './pages/About';
import {Container, Nav, Navbar} from "react-bootstrap";

export default function App() {
    return (
        <Router>
            <div className="App">
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Nav className="me-auto">
                            <Navbar.Brand href="/">DispoSell</Navbar.Brand>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/category">Category</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>

                <Container>
                    <Routes>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/category" element={<Category/>}/>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </Container>
            </div>
        </Router>
    );
}