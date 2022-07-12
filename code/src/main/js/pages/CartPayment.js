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
                        "productID": 4,
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
                        "productID": 14
                    },
                    "quantity": 10
                }
            ]
        };
        if (user && user.id) {
            cart.user = {
                "id": user.id
            };
        }
        setCart(cart);
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
        setCanCheckout(false);
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

    return (
        <div style={{margin: "4rem 2rem 2rem 2rem"}}>
            <Payment show={true} canPay={canPay} onPaymentCompleted={onPaymentCompleted} onPaymentError={onPaymentError}/>
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