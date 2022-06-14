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
import UserBoard from "./pages/UserBoard";
import DeliveryBoard from "./pages/DeliveryBoard";
import AdminBoard from "./pages/AdminBoard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

export default function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <main>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/category" element={<Category/>}/>
                            <Route path="/leadership" element={<Leadership/>}/>
                            <Route path="/user" element={<UserBoard/>}/>
                            <Route path="/delivery" element={<DeliveryBoard/>}/>
                            <Route path="/admin" element={<AdminBoard/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/register" element={<Register/>}/>
                        </Routes>
                    </Container>
                </main>
                <Footer/>
            </div>
        </Router>
    );
}