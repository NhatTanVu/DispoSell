import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import '../scss/App.scss';
import Home from './pages/Home';
import Category from './pages/Category';
import Leadership from './pages/Leadership';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from "react-bootstrap";

export default function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <main>
                    <Container>
                        <Routes>
                            <Route path="/leadership" element={<Leadership/>}/>
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