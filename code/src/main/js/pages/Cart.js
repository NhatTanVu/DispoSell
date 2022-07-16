import React, {useState, useEffect} from "react";
import Payment from "../components/Payment";
import {Button, Nav} from "react-bootstrap";
import OrderService from "../services/order.service";
import AuthService from "../services/auth.service";
import {Link, useNavigate} from "react-router-dom";
import localStyles from "../../scss/pages/cart.module.scss";
import EventBus from "../common/EventBus";
import {useDispatch, useSelector} from "react-redux";
import {setCartInfo} from "../redux/cartSlice";
import {getElement, getElementFromSelector} from "bootstrap/js/src/util";

export default function Cart() {
    const [canPay, setCanPay] = useState(true);
    const [canCheckout, setCanCheckout] = useState(false);

    const [cart, setCart] = useState([]);

    const navigate = useNavigate();

    const [readyCheckout, setReadyCheckout] = useState(false);

    const [isUserReady, setUserReady] = useState(false);
    const [currentUser, setCurrentUser] = useState({username: ""});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cartReady, setCartReady] = useState(false);

    function onChangeFirstName(e) {
        setFirstName(e.target.value);
    }

    function onChangeLastName(e) {
        setLastName(e.target.value);
    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangeDeliveryAddress(e) {
        setDeliveryAddress(e.target.value);
    }

    function onChangePhoneNumber(e) {
        setPhoneNumber(e.target.value);
    }

    const signOut = () => {
        AuthService.logout();
        setIsUser(false);
        setIsShipper(false);
        setIsAdmin(false);
        setCurrentUser(null);
        navigate("/");
        window.location.reload();
    }

    let cartRedux;

    useSelector(state =>
        cartRedux = state.cart
    );

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();


        let cart = JSON.parse(JSON.stringify(cartRedux));

        if (cartRedux.orderDetails.length > 0) {
            setCart(cart);
            setCartReady(true);
            alert(cart);
            console.log(cart)

        } else {
            setCartReady(false);
        }

        if (currentUser && currentUser.id) {
            setCurrentUser(currentUser);
            setUserReady(true);
            setReadyCheckout(true);
        }

        EventBus.on("logout", () => {
            signOut();
        });

        return () => {
            // Anything in here is fired on component unmount.
            EventBus.remove("logout");
        }

    }, []);

    function onPaymentCompleted(paymentAmount, paymentTransactionID) {
        setCart(prevState => ({
            ...prevState,
            "firstName": document.getElementById("firstName").value,
            "lastName": document.getElementById("lastName").value,
            "contactNumber": document.getElementById("phoneNumber").value,
            "address": document.getElementById("address").value,
            "email": document.getElementById("email").value,
            "status": {
                "statusID": 3
            },
            "paymentAmount": paymentAmount,
            "paymentTransactionID": paymentTransactionID
        }));
        setCanPay(false);
        setCanCheckout(true);
    }

    function onPaymentError(error) {
        alert(error);
        setCanCheckout(false);
    }

    function onCheckoutClick(e) {
        OrderService.createPurchaseOrder(cart).then(
            (value) => {
                alert(JSON.stringify(cart));
                //navigate("/");
            },
            (reason) => {
                const resMessage =
                    (reason.response &&
                        reason.response.data &&
                        reason.response.data.message) ||
                    reason.message ||
                    reason.toString();
                alert("Error when purchasing products");
                console.log(resMessage);
            });
    }

    function checkoutGuest() {
        setReadyCheckout(true);
    }

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleLogin(e) {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        AuthService.login(username, password).then(
            () => {
                navigate("/cart");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    }

    return (
        <>
            {(cartReady) ?
                <div style={{
                    marginBottom: "2rem",
                    marginLeft: "2rem",
                    marginRight: "2rem",
                    minHeight: "150vh",
                    marginTop: "7rem",
                    maxHeight: "auto",
                    display: "block",
                }} className="d-flex">
                    <div style={{width: "80vw", paddingRight: "2rem", paddingLeft: "1rem"}}>
                        <div className="justify-content-between d-inline-flex" style={{}}>
                            <div style={{width: "10vw", backgroundColor: "transparent"}}></div>
                            <h6 className='text-uppercase fw-bold'
                                style={{width: "40vw", paddingLeft: "1rem"}}> ITEM </h6>
                            <h6 className='text-uppercase fw-bold'
                                style={{width: "10vw", paddingLeft: "1rem"}}> PRICE </h6>
                        </div>
                        <hr/>
                        {console.log(cart)}

                        {cart.map((item)=>(

                            <div className="justify-content-between d-inline-flex" style={{}} key={item}>
                                {console.log(item)}
                                    <div style={{width: "10vw"}}>
                                        <img src="images/test_for_browse/white_side_table.jpeg"
                                             loading="lazy"
                                             style={{
                                                 display: "block",
                                                 width: "inherit"
                                             }}/>
                                    </div>
                                    <h6 className='text-uppercase' style={{width: "40vw", paddingLeft: "1rem"}}> White
                                        Side
                                        Table </h6>
                                    <h6 className='text-uppercase'
                                        style={{width: "10vw", paddingLeft: "1rem"}}>$2 {item.orderDetails}</h6>
                            </div>

                        ))}

                        <hr/>
                        <div className="justify-content-between d-inline-flex" style={{}}>
                            <div style={{width: "10vw", backgroundColor: "transparent"}}></div>
                            <h6 className='text-uppercase fw-bold'
                                style={{width: "40vw", paddingLeft: "1rem"}}> TOTAL </h6>
                            <h6 className='text-uppercase fw-bold'
                                style={{width: "10vw", paddingLeft: "1rem"}}>$30</h6>
                        </div>
                    </div>

                    <div className={localStyles[""]}
                         style={{width: "20vw", paddingRight: "1rem", paddingLeft: "1rem"}}>
                        {(readyCheckout) ?
                            <div className={`text-start`}>
                                {(isUserReady) ?
                                    <>
                                        <h5>Logged in as <Link as={Link} to={"/profile"}
                                                               style={{textDecoration: "underline"}}>{currentUser.username}</Link>
                                        </h5>
                                        <p>Not {currentUser.username}? Sign in as another user <Link
                                            as={Link} to="/cart"
                                            style={{textDecoration: "underline", cursor: "pointer"}}
                                            onClick={signOut}>here</Link>.
                                        </p>
                                    </>
                                    :
                                    <>
                                        <h5>Checking out as a guest</h5>
                                        <p>Have an account? Click <Link
                                            as={Link} to="/cart"
                                            style={{textDecoration: "underline", cursor: "pointer"}}
                                            onClick={signOut}>here</Link> to login.
                                        </p>
                                    </>
                                }

                                <div className="col-12">
                                    <label htmlFor="name" className="form-label text-start">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        defaultValue={currentUser.firstName}
                                        onChange={onChangeFirstName}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="name" className="form-label text-start">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        defaultValue={currentUser.lastName}
                                        onChange={onChangeLastName}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="email" className="form-label text-start">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        defaultValue={currentUser.email}
                                        onChange={onChangeEmail}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="deliveryAddress" className="form-label text-start">Delivery
                                        Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        defaultValue={currentUser.deliveryAddress}
                                        onChange={onChangeDeliveryAddress}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="phoneNumber" className="form-label text-start">Phone
                                        Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phoneNumber"
                                        defaultValue={currentUser.phoneNumber}
                                        onChange={onChangePhoneNumber}
                                    />
                                </div>

                                <Payment show={true} canPay={canPay} onPaymentCompleted={onPaymentCompleted}
                                         onPaymentError={onPaymentError}/>

                                <Button
                                    type="primary"
                                    className="ms-2"
                                    id={localStyles['btn']}
                                    disabled={!canCheckout}
                                    onClick={onCheckoutClick}
                                >
                                    Checkout
                                </Button>

                            </div> : (<>
                                <h5 className={`text-start`}>You are not logged in</h5>
                                <p className={`text-start`}>Log in to check out or check out as guest <a
                                    style={{textDecoration: "underline", cursor: "pointer"}}
                                    onClick={checkoutGuest}>here</a>.
                                </p>
                                <form className="row g-3"
                                      onSubmit={handleLogin}
                                >
                                    <div className="col-12">
                                        <label htmlFor="username" className="form-label text-start">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={username}
                                            onChange={onChangeUsername}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label text-start">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={password}
                                            onChange={onChangePassword}
                                        />
                                    </div>

                                    <div className="col-12 text-start">
                                        <button
                                            className={`btn ${localStyles['btn']}`}
                                            disabled={loading}
                                        >
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Login</span>
                                        </button>
                                    </div>

                                    {message && (
                                        <div className="col-12">
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </>)}
                    </div>
                </div>
                : (
                    <div style={{
                        marginBottom: "2rem",
                        marginLeft: "2rem",
                        marginRight: "2rem",
                        minHeight: "auto",
                        marginTop: "6rem",
                        maxHeight: "50rem",
                        width: "100%",
                        display: "block",
                    }} className="d-flex text-center justify-content-center align-content-center">
                        <div>
                            <h1>cart empty</h1>
                            <Button
                                id={localStyles['btn']}
                                href="/browse">
                                Browse
                            </Button>
                        </div>
                    </div>
                )}
        </>
    );
}
