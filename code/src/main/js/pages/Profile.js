import React, {useState, useEffect} from "react";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

export default function Profile() {
    const [isUserReady, setUserReady] = useState(false);
    const [currentUser, setCurrentUser] = useState({username: ""});

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            EventBus.dispatch("logout");
        } else {
            setCurrentUser(currentUser);
            setUserReady(true);
        }
    }, []);

    return (
        <div className="container" style={{marginTop:"5rem", marginBottom:"2rem"}}>
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
