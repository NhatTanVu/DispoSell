import React, {useState, useEffect} from "react";
import UserService from "../../services/test.service";
import {useNavigate} from "react-router-dom";

export default function UserContent() {
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getUserContent().then(
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

                if (error.response && (error.response.status == 401 || error.response.status == 403)) {
                    navigate("/");
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
