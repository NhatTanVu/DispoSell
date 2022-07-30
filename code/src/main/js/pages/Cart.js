import React, {useEffect, useState} from "react";
import Payment from "../components/Payment";
import {Button} from "react-bootstrap";
import OrderService from "../services/order.service";
import AuthService from "../services/auth.service";
import {Link, useNavigate} from "react-router-dom";
import localStyles from "../../scss/pages/cart.module.scss";
import EventBus from "../common/EventBus";
import {useDispatch, useSelector} from "react-redux";
import store from '../redux/store';
import {addCartItem, clearCart, initialState, removeCartItem, setUserInfo} from "../redux/cartSlice";

export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [isInputReady, setIsInputReady] = useState(false);
    let [totalPrice, setTotalPrice] = useState(0);
    let cart = useSelector((state) => state.cart);

    useEffect(() => {
        const localUser = AuthService.getCurrentUser();

        console.log(store.getState().cart.orderDetails);

        if (cart === initialState || store.getState().cart.orderDetails.length === 0) {
            setCartReady(false);
            console.log("cart is empty " + cart);
        } else {
            setCartReady(true);
            let currentCart = store.getState().cart;
            calculateTotal(currentCart);
        }

        EventBus.on("logout", () => {
            signOut();
        });

        if (localUser && localUser.id) {
            setUserReady(true);
            setReadyCheckout(true);
            setCurrentUser(localUser);
            setFirstName(localUser.firstName);
            setLastName(localUser.lastName);
            setEmail(localUser.email);
            setDeliveryAddress(localUser.deliveryAddress);
            setPhoneNumber(localUser.phoneNumber);
        }

        return () => {
            // Anything in here is fired on component unmount.
            EventBus.remove("logout");
        }
    }, []);

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

    function onPaymentCompleted(paymentAmount, transactionID) {
        setPaymentAmount(paymentAmount);
        setPaymentTransactionID(transactionID);
        setCanPay(false);
        setCanCheckout(true);
    }

    function onPaymentError(error) {
        alert(error);
        setCanCheckout(false);
    }

    function onCheckoutClick(e) {
        setCanCheckout(false);
        dispatch(setUserInfo(firstName,
            lastName,
            phoneNumber,
            deliveryAddress,
            email,
            paymentTransactionID,
            paymentAmount,
            currentUser.id ? {
                "id": currentUser.id
            } : null));
        const localCart = store.getState().cart;
        OrderService.createPurchaseOrder(localCart).then(
            (value) => {
                alert("Successfully Purchased");
                localStorage.removeItem("savedCart");
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

    function calculateTotal(currentCart) {
        let total = 0;
        for (let i in currentCart.orderDetails) {
            setTotalPrice(total += currentCart.orderDetails[i].price * currentCart.orderDetails[i].quantity);
        }
        return totalPrice.toFixed(2);
    }

    function onInputCheck() {
        if ((firstName && lastName && deliveryAddress && email && phoneNumber) !== '') {
            const phoneNumRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
            const addressRegex = /^(\d{1,5}) ([^,]+), ([^,]+), ([A-Z]{2}), ([A-Za-z]\d[A-Za-z][ -]?\d[A-Z]\d)$/;
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailRegex.test(email.toLowerCase())) {
                if(addressRegex.test(deliveryAddress)){
                    if (phoneNumRegex.test(phoneNumber)) {
                        setIsInputReady(true);
                    } else {
                        setIsInputReady(false);
                        alert("Accepted format: \n(123) 456-7890\n" +
                            "+(123) 456-7890\n" +
                            "+(123)-456-7890\n" +
                            "+(123) - 456-7890\n" +
                            "+(123) - 456-78-90\n" +
                            "123-456-7890\n" +
                            "123.456.7890\n" +
                            "1234567890\n" +
                            "+31636363634\n" +
                            "075-63546725");
                    }
                }
                else{
                    setIsInputReady(false);
                    alert("Suggested format: \n123 Street St, Vancouver, BC, X1X 2X3\n" +
                        "1234 Street St Unit 123, Vancouver, BC, X1X 2X3\n" +
                        "1234 Street St #123, Vancouver, BC, X1X 2X3\n" +
                        "1234 Street St Building ABC, Vancouver, BC, X1X 2X3\n" +
                        "12345 Street St Building ABC #123, Vancouver, BC, X1X 2X3");
                }
            } else {
                setIsInputReady(false);
                alert("Email format is not valid.")
            }
        } else {
            alert("Please fill in the required fields.")
        }
    }

    const decreaseQuantity = (e, index, item) => {
        dispatch(removeCartItem(item.product.productID, 1));

        let qty = parseInt(document.getElementById(`qty${item.product.productID}`).value, 10);
        qty = isNaN(qty) ? 0 : ((qty < 2) ? 2 : qty);
        qty--;

        document.getElementById(`qty${item.product.productID}`).value = qty;
        document.getElementById(`price${item.product.productID}`).value = parseInt(item.price).toFixed(2) * qty;

        console.log(cart);
        console.log(store.getState().cart);

        let currentCart = store.getState().cart;
        calculateTotal(currentCart);

        if (store.getState().cart.orderDetails.length === 0) {
            setCartReady(false);
        }
    }

    const addQuantity = (e, item) => {
        let qty = parseInt(document.getElementById(`qty${item.product.productID}`).value, 10);
        qty = isNaN(qty) ? 0 : qty;
        if (qty === 10) {
            qty = 10;
        } else {
            dispatch(addCartItem(item.product.productID, item.product.productName, item.product.productMedia, item.price, 1));
            qty++;
        }

        document.getElementById(`qty${item.product.productID}`).value = qty;
        document.getElementById(`price${item.product.productID}`).value = parseInt(item.price).toFixed(2) * qty;

        console.log(cart);
        console.log(store.getState().cart);

        let currentCart = store.getState().cart;
        calculateTotal(currentCart);
    }

    const removeItem = (e, item) => {
        dispatch(removeCartItem(item.product.productID, item.quantity));
        console.log(cart);
        console.log(store.getState().cart);

        let currentCart = store.getState().cart;
        calculateTotal(currentCart);

        if (store.getState().cart.orderDetails.length === 0) {
            setCartReady(false);
        }
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

    return (
        <>
            {(cartReady) ?
                <>
                    <div style={{}} className={`${localStyles['cartListContainer']} d-flex justify-content-between`}>
                        <div className={` ${localStyles['cartList']} justify-content-between`}>
                            <div className="justify-content-between d-inline-flex" style={{width: "100%"}}>
                                <div style={{backgroundColor: "transparent"}}
                                     className={localStyles['whiteSpace']}></div>
                                <h6 className={`text-uppercase fw-bold ${localStyles['qtyTitle']} text-center`}>QTY</h6>
                                <h6 className={`text-uppercase fw-bold ${localStyles['itemTitle']}`}>ITEM</h6>
                                <h6 className={`text-uppercase fw-bold ${localStyles['priceTitle']}`}>PRICE</h6>
                            </div>
                            <hr/>

                            {store.getState().cart.orderDetails.map((item, index) => (
                                <>
                                    <div className="justify-content-between d-inline-flex" style={{width: "100%"}}>
                                        <div className={localStyles['whiteSpace']}>
                                            <img src={`${item.product.productMedia[0].url}`}
                                                 loading="lazy"
                                                 style={{
                                                     display: "block",
                                                     width: "100%"
                                                 }}/>
                                        </div>
                                        <div
                                            className={`d-inline  align-baseline justify-content-start${localStyles['qtyTitle']}`}>
                                            <div style={{display: "inline-flex", width: "100%"}}
                                                 className='text-center'>
                                                <Button id={`minusBtn`} style={{
                                                    padding: "auto",
                                                    border: "black",
                                                    backgroundColor: "transparent",
                                                    color: "black"
                                                }} onClick={(e) => decreaseQuantity(e, index, item)}>-</Button>
                                                <input
                                                    id={`qty${item.product.productID}`}
                                                    className='text-center'
                                                    type="text"
                                                    min={item.quantity}
                                                    max={10}
                                                    defaultValue={item.quantity}
                                                    style={{
                                                        border: "none",
                                                        minWidth: "auto",
                                                        maxWidth: "27px",
                                                        padding: "auto"
                                                    }}
                                                    readOnly
                                                />
                                                <Button style={{
                                                    padding: "auto",
                                                    border: "black",
                                                    backgroundColor: "transparent",
                                                    color: "black"
                                                }}
                                                        onClick={(e) => addQuantity(e, item)}>+</Button>
                                            </div>
                                            <div style={{width: "100%"}} className='text-center'>
                                                <a onClick={(e) => removeItem(e, item)}>Remove</a>
                                            </div>
                                        </div>
                                        <h6 className={`text-uppercase ${localStyles['itemTitle']}`}> {item.product.productName} </h6>
                                        <h6 className={`text-uppercase ${localStyles['priceTitle']}`}
                                            id={`price${item.product.productID}`}>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</h6>
                                    </div>
                                    <hr/>
                                </>
                            ))}

                            <div className="justify-content-between d-inline-flex" style={{width: "100%"}}>
                                <div style={{backgroundColor: "transparent"}}
                                     className={localStyles['whiteSpace']}></div>
                                <h6 className={`text-uppercase fw-bold ${localStyles['qtyTitle']}`}>TOTAL</h6>
                                <h6 className={`text-uppercase fw-bold ${localStyles['itemTitle']}`}></h6>
                                <h6 className={`text-uppercase fw-bold ${localStyles['priceTitle']}`}
                                    id='totalPrice'> ${totalPrice.toFixed(2)} </h6>
                            </div>
                        </div>

                        <div className={localStyles["rightColumn"]}>
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
                                            value={firstName}
                                            placeholder={'First name'}
                                            onChange={onChangeFirstName}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="name" className="form-label text-start">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            value={lastName}
                                            placeholder={'Last name'}
                                            onChange={onChangeLastName}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label text-start">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            placeholder={'address@email.com'}
                                            onChange={onChangeEmail}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="deliveryAddress" className="form-label text-start">Delivery
                                            Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            value={deliveryAddress}
                                            placeholder={'123 Delivery St, Vancouver, BC, X1X 2X3'}
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
                                            value={phoneNumber}
                                            placeholder={'123 456 7890'}
                                            onChange={onChangePhoneNumber}
                                        />
                                    </div>

                                    <Button
                                        type="primary"
                                        id={localStyles['btn']}
                                        onClick={onInputCheck}
                                        style={{marginLeft: "0"}}
                                    >
                                        Submit Shipping Information
                                    </Button>

                                    {(isInputReady) ?
                                        <>
                                            <Payment show={true} canPay={canPay}
                                                     paymentAmountProps={totalPrice.toFixed(2)}
                                                     onPaymentCompleted={onPaymentCompleted}
                                                     onPaymentError={onPaymentError}/>

                                            <Button
                                                type="primary"
                                                id={localStyles['btn']}
                                                disabled={!canCheckout}
                                                onClick={onCheckoutClick}
                                                style={{marginLeft: "0"}}
                                            >
                                                Checkout
                                            </Button>
                                        </>
                                        : <></>}

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
                </>
                : (
                    <div
                        className={`${localStyles["emptyCart"]} d-flex text-center justify-content-center align-content-center`}>
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