import React, {useState, useEffect} from "react";
import Payment from "../components/Payment";
import {Button, Nav} from "react-bootstrap";
import OrderService from "../services/order.service";
import AuthService from "../services/auth.service";
import {Link, useNavigate} from "react-router-dom";
import localStyles from "../../scss/pages/cart.module.scss";
import EventBus from "../common/EventBus";

export default function Cart() {
    const [canPay, setCanPay] = useState(true);
    const [canCheckout, setCanCheckout] = useState(false);
    const [cart, setCart] = useState(undefined);
    const navigate = useNavigate();

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

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        let cart = {
            "contactNumber": "1465987722",
            "address": "1465987722 delivery address",
            "email": "onchua2006@gmail.com",
            "status": {
                "statusID": 1
            },
            "orderDetails": [
                {
                    "product": {
                        "productID": 1,
                        "productMedia": [
                            {
                                "url": "image 1.jpg",
                                "fileType": "jpg"
                            }
                        ]
                    },
                    "quantity": 5
                },
                {
                    "product": {
                        "productID": 2
                    },
                    "quantity": 10
                }
            ]
        };

        EventBus.on("logout", () => {
            signOut();
        });

        if (currentUser && currentUser.id) {
            cart.user = {
                "id": currentUser.id
            };
            setCurrentUser(currentUser);
            setUserReady(true);
            setCanCheckout(true);
            setCanPay(true);
        }
        setCart(cart);

        return () => {
            // Anything in here is fired on component unmount.
            EventBus.remove("logout");
        }

    }, []);

    function onPaymentCompleted(paymentAmount, paymentTransactionID) {
        setCart(prevState => ({
            ...prevState,
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
        setCanCheckout(true);
    }

    function onCheckoutClick(e) {
        OrderService.createPurchaseOrder(cart).then(
            (value) => {
                alert("Purchase products successfully");
                navigate("/");
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
        setCanCheckout(true);
        setCanPay(true);
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
        <div
            style={{
                marginBottom: "2rem",
                marginLeft: "2rem",
                marginRight: "2rem",
                minHeight: "150vh",
                maxHeight: "auto"
            }}>
            <div className={localStyles["float_right"]}
                 style={{position: "absolute", width: "20%", paddingRight: "2rem"}}>
                {(canCheckout) ?
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
                                name="First Name"
                                value={currentUser.firstName}
                                onChange={onChangeFirstName}
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="name" className="form-label text-start">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Last Name"
                                value={currentUser.lastName}
                                onChange={onChangeLastName}
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="email" className="form-label text-start">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={currentUser.email}
                                onChange={onChangeEmail}
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="deliveryAddress" className="form-label text-start">Delivery
                                Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="deliveryAddress"
                                value={currentUser.deliveryAddress}
                                onChange={onChangeDeliveryAddress}
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="phoneNumber" className="form-label text-start">Phone
                                Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phoneNumber"
                                value={currentUser.phoneNumber}
                                onChange={onChangePhoneNumber}
                            />
                        </div>

                        <Payment show={true} canPay={canPay} onPaymentCompleted={onPaymentCompleted}
                                 onPaymentError={onPaymentError} disabled={!canCheckout}
                                 onClick={onCheckoutClick}/>

                        {/*<Button*/}
                        {/*    type="primary"*/}
                        {/*    className="ms-2"*/}
                        {/*    disabled={!canCheckout}*/}
                        {/*    onClick={onCheckoutClick}*/}
                        {/*>*/}
                        {/*    Checkout*/}
                        {/*</Button>*/}

                    </div> : (<>
                        <h5 className={`text-start`}>You are not logged in</h5>
                        <p className={`text-start`}>Log in to check out or check out as guest <a
                            style={{textDecoration: "underline", cursor: "pointer"}} onClick={checkoutGuest}>here</a>.
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
    );
}
