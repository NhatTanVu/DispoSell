import React, {useEffect, useState} from 'react'
import dropin from "braintree-web-drop-in"
import {Button} from "react-bootstrap";
import axios from "axios";

export default function Payment(props) {
    const {show, onPaymentCompleted} = props;
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [braintreeInstance, setBraintreeInstance] = useState(undefined)

    useEffect(() => {
        if (show) {
            axios.get("/api/payment/client_token").then((token) => {
                const initializeBraintree = () => dropin.create({
                    // insert your tokenization key or client token here
                    authorization: token.data,
                    container: '#braintree-drop-in-div',
                }, function (error, instance) {
                    if (error)
                        console.error(error)
                    else
                        setBraintreeInstance(instance);
                });

                if (braintreeInstance) {
                    braintreeInstance
                        .teardown()
                        .then(() => {
                            initializeBraintree();
                        });
                } else {
                    initializeBraintree();
                }
            });

        }
    }, [show])

    function onChangePaymentAmount(e) {
        setPaymentAmount(parseInt(e.target.value) ?? 0);
    }

    return (
        <div
            style={{display: `${show ? "block" : "none"}`, margin: "4rem 2rem 0 2rem"}}
        >
            <div className="col-12">
                <label htmlFor="paymentAmount" className="form-label">Amount</label>
                <input
                    type="text"
                    className="form-control"
                    name="paymentAmount"
                    value={paymentAmount}
                    onChange={onChangePaymentAmount}
                />
            </div>

            <div
                id={"braintree-drop-in-div"}
            />

            <Button
                className={"braintreePayButton"}
                type="primary"
                disabled={!braintreeInstance}
                onClick={() => {
                    if (braintreeInstance && paymentAmount > 0) {
                        braintreeInstance.requestPaymentMethod(
                            (error, payload) => {
                                if (error) {
                                    console.error(error);
                                } else {
                                    const paymentMethodNonce = payload.nonce;
                                    console.log("payment method nonce", paymentMethodNonce);

                                    axios.post('/api/payment/checkout', {
                                        chargeAmount: paymentAmount,
                                        nonce: paymentMethodNonce
                                    }).then(function (response) {
                                        console.log(response.data);
                                        alert("Transaction ID = " + response.data.id);
                                    }).catch(function (error) {
                                        console.log(error);
                                    });

                                    if (onPaymentCompleted)
                                        onPaymentCompleted();
                                }
                            });
                    }
                }}
            >
                {
                    "Pay"
                }
            </Button>
        </div>
    )
}