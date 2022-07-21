import React, {useState, useEffect} from "react";
import Payment from "../components/Payment";
import {Button} from "react-bootstrap";
import OrderService from "../services/order.service";
import AuthService from "../services/auth.service";
import {Link, useNavigate} from "react-router-dom";
import localStyles from "../../scss/pages/cart.module.scss";
import EventBus from "../common/EventBus";
import {useDispatch, useSelector} from "react-redux";
import store from '../redux/store';
import {setUserInfo, initialState, clearCart, removeCartItem, addCartItem} from "../redux/cartSlice";

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
                alert(JSON.stringify(localCart));
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

    const decreaseQuantity = (e, item) => {
        dispatch(removeCartItem(item.product.productID, 1));

        let qty = parseInt(document.getElementById(`qty${item.product.productID}`).value, 10);
        qty = isNaN(qty) ? 0 : ((qty < 1) ? 1 : qty);
        qty--;
        document.getElementById(`qty${item.product.productID}`).value = qty;

        let price = '$' + `<span>${(item.price).toFixed(2)}</span>`;
        document.getElementById(`price${item.product.productID}`).innerHTML = price;
        price = '$' + `<span>${(item.price).toFixed(2) * qty}</span>`;
        document.getElementById(`price${item.product.productID}`).innerHTML = price;

        console.log(cart);
        console.log(store.getState().cart);

        let currentCart = store.getState().cart;
        calculateTotal(currentCart);

        if (store.getState().cart.orderDetails.length === 0) {
            setCartReady(false);
        }
    }

    const addQuantity = (e, item) => {
        dispatch(addCartItem(item.product.productID, item.product.productName, item.product.productMedia, item.price, 1));

        let price = '$' + `<span>${item.price}</span>`;
        document.getElementById(`price${item.product.productID}`).innerHTML = price;

        let qty = parseInt(document.getElementById(`qty${item.product.productID}`).value, 10);
        qty = isNaN(qty) ? 0 : ((qty > 9) ? 9 : qty);
        qty++;
        document.getElementById(`qty${item.product.productID}`).value = qty;
        price = '$' + `<span>${item.price * qty}</span>`;
        document.getElementById(`price${item.product.productID}`).innerHTML = price;

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


                        {store.getState().cart.orderDetails.map((item, index) => (
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
                                            }} onClick={(e) => decreaseQuantity(e, item)}>-</Button>
                                            <input
                                                id={`qty${item.product.productID}`}
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
                                                    onClick={(e) => addQuantity(e, item)}>+</Button>
                                        </div>
                                        <div style={{width: "10vw"}} className='text-center'>
                                            <a onClick={(e) => removeItem(e, item)}>Remove</a>
                                        </div>
                                    </div>
                                    <h6 className='text-uppercase' style={{
                                        width: "40vw",
                                        paddingLeft: "1rem"
                                    }}> {item.product.productName} </h6>
                                    <h6 className='text-uppercase'
                                        style={{
                                            width: "10vw",
                                            paddingLeft: "1rem"
                                        }}
                                        id={`price${item.product.productID}`}> ${(Number(item.price) * Number(item.quantity)).toFixed(2)} </h6>
                                </div>
                                <hr/>
                            </>
                        ))}

                        <div className="justify-content-between d-inline-flex" style={{}}>
                            <div style={{width: "17vw", backgroundColor: "transparent"}}></div>
                            <h6 className='text-uppercase fw-bold'
                                style={{width: "40vw", paddingLeft: "1rem"}}> TOTAL </h6>
                            <h6 className='text-uppercase fw-bold'
                                style={{width: "10vw", paddingLeft: "1rem"}}
                                id='totalPrice'> ${totalPrice.toFixed(2)} </h6>
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
                                        value={firstName}
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
                                        onChange={onChangeLastName}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="email" className="form-label text-start">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        value={email}
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
                                        value={deliveryAddress}
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
                                        onChange={onChangePhoneNumber}
                                    />
                                </div>

                                    <Payment show={true} canPay={canPay} paymentAmountProps={totalPrice.toFixed(2)}
                                             onPaymentCompleted={onPaymentCompleted}
                                             onPaymentError={onPaymentError}/>

                                    <Button
                                        type="primary"
                                        //className="ms-2"
                                        id={localStyles['btn']}
                                        disabled={!canCheckout}
                                        onClick={onCheckoutClick}
                                        style={{marginLeft:"0"}}
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
