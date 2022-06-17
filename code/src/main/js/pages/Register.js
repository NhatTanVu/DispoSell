import React, {useState} from "react";
import AuthService from "../services/auth.service";

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
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <form className="row g-3"
                      onSubmit={handleRegister}
                >
                    {!successful && (
                        <>
                            <div className="col-12">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="deliveryAddress" className="form-label">Delivery Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="deliveryAddress"
                                    value={deliveryAddress}
                                    onChange={onChangeDeliveryAddress}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={onChangePhoneNumber}
                                />
                            </div>

                            <div className="col-12">
                                <button className="btn btn-primary btn-block">Sign Up</button>
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
        </div>
    );
}
