import React, {useState} from "react";
import AuthService from "../services/auth.service";

import localStyles from '../../scss/pages/login.module.scss';
import DeliveryService from "../services/delivery.service";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
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

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onChangeDeliveryAddress(e) {
        setDeliveryAddress(e.target.value);
    }

    function onChangePhoneNumber(e) {
        setPhoneNumber(e.target.value);
    }

    function handleRegister(e) {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        const addressRegex = /^(\d{1,5}) ([^,]+), ([^,]+), ([A-Z]{2}), ([A-Za-z]\d[A-Za-z][ -]?\d[A-Z]\d)$/;
        if (addressRegex.test(deliveryAddress)) {
            AuthService.register(
                username,
                firstName,
                lastName,
                email,
                password,
                deliveryAddress,
                phoneNumber
            ).then(
                response => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        } else {
            alert("Suggested format: \n123 Street St, Vancouver, BC, X1X 2X3\n" +
                "1234 Street St Unit 123, Vancouver, BC, X1X 2X3\n" +
                "1234 Street St #123, Vancouver, BC, X1X 2X3\n" +
                "1234 Street St Building ABC, Vancouver, BC, X1X 2X3\n" +
                "12345 Street St Building ABC #123, Vancouver, BC, X1X 2X3");
        }
    }

    return (
        <div className={`${localStyles["login"]} jumbotron d-flex align-items-center`} id={localStyles['signup']}>
            <div className={localStyles["float_left"]}
                 style={{alignContent: "center", alignSelf: "center", display: "block"}}>
                <img style={{maxWidth: "90%", minWidth: "85%", marginLeft: "7%", marginRight: "5%"}}
                     src="/images/login/hello.gif" alt="Hello"/>
            </div>
            <div className={`${localStyles["float_right"]}`}>
                <div className="col-md-12 text-center">
                    <div className={`card card-container`} id={localStyles['cardBackground']}>
                        <form className="row g-3"
                              onSubmit={handleRegister}
                        >
                            {!successful && (
                                <>
                                    <div className="col-12">
                                        <label htmlFor="name" className="form-label text-start">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="First Name"
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
                                            name="Last Name"
                                            value={lastName}
                                            placeholder={'Last name'}
                                            onChange={onChangeLastName}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="username" className="form-label text-start">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={username}
                                            placeholder={'username'}
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
                                            placeholder={'password'}
                                            onChange={onChangePassword}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label text-start">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={email}
                                            placeholder={'email@address.com'}
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
                                            value={deliveryAddress}
                                            placeholder={'123 Street St, Vancouver, BC, X1X 2X3'}
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
                                            value={phoneNumber}
                                            placeholder={'123 456 7890'}
                                            onChange={onChangePhoneNumber}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <button
                                            className={`btn ${localStyles['btnLogin']}`}
                                        >Sign Up
                                        </button>
                                    </div>
                                </>
                            )}

                            {message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful
                                                ? "alert alert-success"
                                                : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                    <p>Already have an account? Sign in <a href='/login' style={{textDecoration: "underline"}}>here</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
