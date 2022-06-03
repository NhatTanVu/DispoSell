import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Home from './pages/Home';
import Category from './pages/Category';
import About from './pages/About';

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/category">Category</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/category" element={<Category/>}/>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </div>
        </Router>
    );
}