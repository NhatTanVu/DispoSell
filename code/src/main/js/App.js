import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import '../scss/App.scss';
import Home from './pages/Home';
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Browse from "./pages/Browse"
import {Container} from "react-bootstrap";
import UserContent from "./pages/test/UserContent";
import DeliveryContent from "./pages/test/DeliveryContent";
import AdminContent from "./pages/test/AdminContent";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <main>
                    {/*<Container>*/}
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/aboutUs" element={<AboutUs/>}/>

                            <Route path="/user" element={<UserContent/>}/>
                            <Route path="/delivery" element={<DeliveryContent/>}/>
                            <Route path="/admin" element={<AdminContent/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/productDetail/:id" element={<ProductDetail/>}/>
                            <Route path="/browse" element={<Browse/>}/>
                        </Routes>
                    {/*</Container>*/}
                </main>
                <Footer/>
            </div>
        </Router>
    );
}