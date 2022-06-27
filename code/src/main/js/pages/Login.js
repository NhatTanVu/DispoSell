import React, {useState} from "react";
import AuthService from "../services/auth.service";
import {Link, useNavigate} from "react-router-dom";
import localStyles from "../../scss/pages/login.module.scss";
import {Nav} from "react-bootstrap";

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

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
                navigate("/profile");
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

    return (
        <div className={`${localStyles["login"]} jumbotron d-flex align-items-center`}>
            <div className={localStyles["float_left"]}></div>
            <div className={`${localStyles["float_right"]}`}>
                <div className="col-md-12 text-center">
                    <div className={`card card-container`} id={localStyles['cardBackground']}>
                        {/*<img*/}
                        {/*    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"*/}
                        {/*    alt="profile-img"*/}
                        {/*    className="profile-img-card"*/}
                        {/*/>*/}

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
                                    className="btn btn-primary btn-block"
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
                    </div>

                    <p>Don't have an account? Sign up <a href='/register' style={{textDecoration:"underline"}}>here</a>.</p>
                </div>
            </div>
        </div>
    );
}