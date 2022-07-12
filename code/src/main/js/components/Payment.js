import React, {useEffect, useState} from 'react';
import dropin from "braintree-web-drop-in";
import {Button} from "react-bootstrap";
import axios from "axios";
import PaymentService from "../services/payment.service";

import localStyles from "../../scss/pages/cart.module.scss";

export default function Payment(props) {
    const {show, canPay, onPaymentCompleted, onPaymentError} = props;
    const [enablePayment, setEnablePayment] = useState(true);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [braintreeInstance, setBraintreeInstance] = useState(undefined);

    useEffect(() => {
        if (show) {
            setEnablePayment(canPay);
            PaymentService.getClientToken().then((token) => {
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
    }, []);

    function onChangePaymentAmount(e) {
        setPaymentAmount(parseInt(e.target.value) ?? 0);
    }

    function onPaymentClick(e) {
        if (braintreeInstance && paymentAmount > 0) {
            setEnablePayment(false);
            braintreeInstance.requestPaymentMethod(
                (error, payload) => {
                    if (error) {
                        //console.error(error);
                        if (onPaymentError)
                            onPaymentError(error);
                        setEnablePayment(true);
                    } else {
                        const paymentMethodNonce = payload.nonce;
                        //console.log("payment method nonce", paymentMethodNonce);

                        PaymentService.checkout(paymentAmount, paymentMethodNonce).then(function (response) {
                            //console.log(response.data);
                            let paymentTransactionID = response.data.id;
                            if (onPaymentCompleted)
                                onPaymentCompleted(paymentAmount, paymentTransactionID);
                        }).catch(function (error) {
                            //console.log(error);
                            if (onPaymentError)
                                onPaymentError(error);
                            setEnablePayment(true);
                        });
                    }
                });
        } else {
            if (onPaymentError)
                onPaymentError("Error in processing payment");
            setEnablePayment(true);
        }
    }

    return (
        (show == true) &&
        <>
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

            <div id={"braintree-drop-in-div"} className="mb-2" />

            <Button
                className="braintreePayButton" id={localStyles['btn']}
                type="primary"
                disabled={!braintreeInstance || !enablePayment}
                onClick={onPaymentClick}
            >
                Pay
            </Button>
        </>
    )
}