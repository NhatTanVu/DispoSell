import React, {useState, useEffect} from "react";
import AuthService from "../services/auth.service";
import {Navigate} from 'react-router-dom';

export default function Profile() {
    const [redirect, setRedirect] = useState(null);
    const [isUserReady, setUserReady] = useState(false);
    const [currentUser, setCurrentUser] = useState({username: ""});

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) setRedirect("/");
        setCurrentUser(currentUser);
        setUserReady(true);
    }, []);

    return (
        (redirect) ?
            <Navigate to={redirect}/>
            :
            <div className="container">
                {(isUserReady) ?
                    <div>
                        <header className="jumbotron">
                            <h3>
                                <strong>{currentUser.username}</strong> Profile
                            </h3>
                        </header>
                        <p>
                            <strong>Token:</strong>{" "}
                            {currentUser.accessToken.substring(0, 20)} ...{" "}
                            {currentUser.accessToken.substring(currentUser.accessToken.length - 20)}
                        </p>
                        <p>
                            <strong>Id:</strong>{" "}
                            {currentUser.id}
                        </p>
                        <p>
                            <strong>Email:</strong>{" "}
                            {currentUser.email}
                        </p>
                        <p>
                            <strong>Delivery Address:</strong>{" "}
                            {currentUser.deliveryAddress}
                        </p>
                        <p>
                            <strong>Phone Number:</strong>{" "}
                            {currentUser.phoneNumber}
                        </p>
                        <strong>Authorities:</strong>
                        <ul>
                            {currentUser.roles &&
                                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                        </ul>
                    </div> : null}
            </div>
    );
}
