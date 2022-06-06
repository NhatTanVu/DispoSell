import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import '../scss/App.scss';
import Home from './pages/Home';
import Category from './pages/Category';
import About from './pages/About';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container, Nav, Navbar} from "react-bootstrap";

export default function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <main>
                    <Container>
                        <Routes>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/category" element={<Category/>}/>
                            <Route path="/" element={<Home/>}/>
                        </Routes>
                    </Container>
                </main>
                <Footer/>
            </div>
        </Router>
    );
}