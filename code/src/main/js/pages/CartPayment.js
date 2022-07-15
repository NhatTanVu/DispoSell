import React, {useState, useEffect} from "react";
import Payment from "../components/Payment";
import {Button} from "react-bootstrap";
import OrderService from "../services/order.service";
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";

export default function CartPayment() {
    const [canPay, setCanPay] = useState(true);
    const [canCheckout, setCanCheckout] = useState(false);
    const [cart, setCart] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        let cart =
            {
                "firstName": "",
                "lastName": "",
                "contactNumber": "1213123",
                "address": "asdfasdf",
                "email": "asdfasdf",
                "status": {"statusID": 1},
                "orderDetails": []
            };
        if (user && user.id) {
            cart.id = {
                "id": user.id
            };
        }
        setCart(cart);
        alert(cart);
    }, []);

    function onPaymentCompleted(paymentAmount, paymentTransactionID) {
        setCart(prevState => ({
            ...prevState,
            "firstName": 'firstName',
            "lastName": "lastName",
            "contactNumber": "phoneNumber",
            "address": "deliveryAddress",
            "email": "email",
            "status": {
                "statusID": 2
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

    return (
        <div style={{margin: "4rem 2rem 2rem 2rem"}}>
            <Payment show={true} canPay={canPay} onPaymentCompleted={onPaymentCompleted}
                     onPaymentError={onPaymentError}/>
            <Button
                type="primary"
                className="ms-2"
                disabled={!canCheckout}
                onClick={onCheckoutClick}
            >
                Checkout
            </Button>
        </div>
    );
}