import React, {useState} from "react";
import AuthService from "../services/auth.service";

import localStyles from '../../scss/pages/login.module.scss';

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

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

        AuthService.register(
            username,
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

                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label text-start">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
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
                                            name="deliveryAddress"
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
                                            name="phoneNumber"
                                            value={phoneNumber}
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
