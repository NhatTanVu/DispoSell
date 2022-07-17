import React, {useState, useEffect} from "react";
import Payment from "../components/Payment";
import {Button } from "react-bootstrap";
import OrderService from "../services/order.service";
import AuthService from "../services/auth.service";
import {Link, useNavigate} from "react-router-dom";
import localStyles from "../../scss/pages/cart.module.scss";
import EventBus from "../common/EventBus";
import {useDispatch, useSelector} from "react-redux";
import store from '../redux/store';
import {setUserInfo, initialState, clearCart, addCartItem} from "../redux/cartSlice";

export default function Cart() {
    let savedCart = localStorage.getItem("savedCart");
    let savedCartObj = JSON.parse(savedCart);
    const [canPay, setCanPay] = useState(true);
    const [canCheckout, setCanCheckout] = useState(false);
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
    const [paymentTransactionID, setPaymentTransactionID] = useState(undefined);
    const [isCartNew, setCartNew] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

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

        console.log(JSON.stringify(cart));

        if (savedCart === JSON.stringify(initialState) || savedCart === null) {
            if (cart !== initialState) {
                setCartReady(true);
                setCartNew(true);
                localStorage.setItem("savedCart", JSON.stringify(cart));
                savedCart = localStorage.getItem("savedCart");
                savedCartObj = JSON.parse(savedCart);
                console.log(savedCartObj);
            } else {
                setCartReady(false);
                console.log("cart is empty" + JSON.stringify(cart));
            }
        } else {
            setCartReady(true);

            if ("savedCart" in localStorage && cart === initialState) {
                console.log(cart);
                console.log(savedCartObj);
                console.log("only page refresh");
            }
            if ("savedCart" in localStorage && cart !== initialState) {
                console.log(cart);
                localStorage.setItem("savedCart", JSON.stringify(cart));
                savedCart = localStorage.getItem("savedCart");
                savedCartObj = JSON.parse(savedCart);
                console.log(savedCartObj);
            }
        }

        EventBus.on("logout", () => {
            signOut();
        });

        if (currentUser && currentUser.id) {
            setUserReady(true);
            setReadyCheckout(true);
        }

        return () => {
            // Anything in here is fired on component unmount.
            EventBus.remove("logout");
        }
    }, []);

    function onPaymentCompleted(paymentAmount, transactionID) {
        setPaymentTransactionID(transactionID);
        setCanPay(false);
        setCanCheckout(true);
    }

    function onPaymentError(error) {
        alert(error);
        setCanCheckout(false);
    }

    function onCheckoutClick(e) {
        dispatch(setUserInfo(firstName,
            lastName,
            phoneNumber,
            deliveryAddress,
            email,
            paymentTransactionID));
        const localCart = store.getState().cart;
        OrderService.createPurchaseOrder(localCart).then(
            (value) => {
                alert(JSON.stringify(localCart));
                dispatch(clearCart());
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

    const addQuantity = (id, name, url, type, price) => {
        dispatch(addCartItem(
            Number(id),
            name,
            [{
                "url": url,
                "fileType": type
            }],
            Number(price + price), Number(1)));
    }

    const removeItem = () => {
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
                    <div style={{width: "100vw", paddingRight: "2rem", paddingLeft: "1rem"}}>
                        <div className="justify-content-between d-inline-flex" style={{}}>
                            <div style={{width: "7vw", backgroundColor: "transparent"}}></div>
                            <h6 className='text-uppercase fw-bold'
                                style={{width: "10vw", paddingLeft: "2rem"}}> QTY </h6>
                            <h6 className='text-uppercase fw-bold'
                                style={{width: "40vw", paddingLeft: "1rem"}}> ITEM </h6>
                            <h6 className='text-uppercase fw-bold'
                                style={{width: "10vw", paddingLeft: "1rem"}}> PRICE </h6>
                        </div>
                        <hr/>

                        {(isCartNew) ?
                            <>
                                {store.getState().cart.orderDetails.map(item => (
                                    <>
                                        <div className="justify-content-between d-inline-flex" style={{}}>
                                            <div style={{width: "7vw"}}>
                                                <img src={`${item.product.productMedia[0].url}`}
                                                     loading="lazy"
                                                     style={{
                                                         display: "block",
                                                         width: "inherit"
                                                     }}/>
                                            </div>
                                            <div className='d-inline' style={{width: "10vw"}}>
                                                <div style={{display: "inline-block", width: "10vw"}}
                                                     className='text-center'>
                                                    <Button style={{
                                                        padding: "auto",
                                                        border: "black",
                                                        backgroundColor: "transparent",
                                                        color: "black"
                                                    }}>-</Button>
                                                    <input
                                                        className='text-center'
                                                        type="text"
                                                        min={item.quantity}
                                                        max={10}
                                                        defaultValue={item.quantity}
                                                        style={{border: "none", maxWidth: "20px", padding: "auto"}}
                                                        readOnly
                                                    />
                                                    <Button style={{
                                                        padding: "auto",
                                                        border: "black",
                                                        backgroundColor: "transparent",
                                                        color: "black"
                                                    }}
                                                            onClick={(e) => addQuantity(item.product.productID, item.product.productName,
                                                                item.product.productMedia[0].url, item.product.productMedia[0].fileType,
                                                                item.price)}>+</Button>
                                                </div>
                                                <div style={{width: "10vw"}} className='text-center'>
                                                    <a onClick={removeItem}>Remove</a>
                                                </div>
                                            </div>
                                            <h6 className='text-uppercase' style={{
                                                width: "40vw",
                                                paddingLeft: "1rem"
                                            }}> {item.product.productName} </h6>
                                            <h6 className='text-uppercase'
                                                style={{width: "10vw", paddingLeft: "1rem"}}> ${item.price} </h6>
                                        </div>
                                        <hr/>
                                    </>
                                ))}
                            </>
                            : (
                                <>
                                    {savedCartObj.orderDetails.map(savedItem => (
                                        <>
                                            <div className="justify-content-between d-inline-flex" style={{}}>
                                                <div style={{width: "7vw"}}>
                                                    <img src={`${savedItem.product.productMedia[0].url}`}
                                                         loading="lazy"
                                                         style={{
                                                             display: "block",
                                                             width: "inherit"
                                                         }}/>
                                                </div>
                                                <div className='d-inline' style={{width: "10vw"}}>
                                                    <div style={{display: "inline-block", width: "10vw"}}
                                                         className='text-center'>
                                                        <Button style={{
                                                            padding: "auto",
                                                            border: "black",
                                                            backgroundColor: "transparent",
                                                            color: "black"
                                                        }}>-</Button>
                                                        <input
                                                            className='text-center'
                                                            type="text"
                                                            min={savedItem.quantity}
                                                            max={10}
                                                            defaultValue={savedItem.quantity}
                                                            style={{border: "none", maxWidth: "20px", padding: "auto"}}
                                                            readOnly
                                                        />
                                                        <Button style={{
                                                            padding: "auto",
                                                            border: "black",
                                                            backgroundColor: "transparent",
                                                            color: "black"
                                                        }}
                                                                onClick={(e) => addQuantity(savedItem.product.productID, savedItem.product.productName,
                                                                    savedItem.product.productMedia[0].url, savedItem.product.productMedia[0].fileType,
                                                                    savedItem.price)}>+</Button>
                                                    </div>
                                                    <div style={{width: "10vw"}} className='text-center'>
                                                        <a onClick={removeItem}>Remove</a>
                                                    </div>
                                                </div>

                                                <h6 className='text-uppercase' style={{
                                                    width: "40vw",
                                                    paddingLeft: "1rem"
                                                }}> {savedItem.product.productName} </h6>
                                                <h6 className='text-uppercase'
                                                    style={{
                                                        width: "10vw",
                                                        paddingLeft: "1rem"
                                                    }}> ${savedItem.price} </h6>
                                            </div>
                                            <hr/>
                                        </>
                                    ))}
                                </>
                            )}
                        <div className="justify-content-between d-inline-flex" style={{}}>
                            <div style={{width: "17vw", backgroundColor: "transparent"}}></div>
                            <h6 className='text-uppercase fw-bold'
                                style={{width: "40vw", paddingLeft: "1rem"}}> TOTAL </h6>
                            <h6 className='text-uppercase fw-bold'
                                style={{width: "10vw", paddingLeft: "1rem"}}>$30</h6>
                        </div>
                    </div>

                    {/*<div className={localStyles["float_right"]}*/}
                    {/*     style={{position: "absolute", width: "20%", paddingRight: "2rem"}}>*/}
                    <div className={localStyles[""]}
                         style={{width: "50vw", paddingRight: "1rem", paddingLeft: "1rem"}}>
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
