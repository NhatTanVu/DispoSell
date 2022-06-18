import React, {useState, useEffect} from "react";
import UserService from "../../services/test.service";
import EventBus from "../../common/EventBus";

export default function DeliveryContent() {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getDeliveryContent().then(
            response => {
                setContent(response.data);
            },
            error => {
                setContent(
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                );

                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
}
