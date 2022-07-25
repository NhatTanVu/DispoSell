import React, {useState, useEffect} from "react";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import localStyles from "../../scss/pages/profile.module.scss";
import OrderService from "../services/order.service";
import {useNavigate} from "react-router-dom";

export default function Profile() {
    const [isUserReady, setUserReady] = useState(false);
    const [currentUser, setCurrentUser] = useState({username: ""});
    const [isUser, setIsUser] = useState(false);
    const [isShipper, setIsShipper] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [date, setDate] = useState('');
    const [tradeOrders, setTradeOrder] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            EventBus.dispatch("logout");
        } else {
            setCurrentUser(currentUser);
            setUserReady(true);
            setIsUser(currentUser.roles.includes("ROLE_USER"));
            setIsAdmin(currentUser.roles.includes("ROLE_ADMINISTRATOR"));
            setIsShipper(currentUser.roles.includes("ROLE_SHIPPER"));
        }

        OrderService.getTradeOrder().then(
            response=>{
                console.log(response.data);
                setTradeOrder(response.data);
            }
        )

    }, []);

    const editButton = () => {
        document.getElementById('testInput').removeAttribute('readonly')
    }

    const saveButton = () => {
        document.getElementById('testInput').readOnly = true;
    }

    const onDateChange = (e) => {
        setDate(e.target.value);
    }

    return (
        <div style={{marginTop: "5rem", marginBottom: "2rem", marginRight: "2rem", marginLeft: "2rem"}}>
            {(isUserReady) ?
                <>
                    <h2>Hello, <strong>{currentUser.username}</strong>!</h2>
                    {(isAdmin) ?
                        <div style={{marginTop: "1rem", marginBottom: "0.5rem"}}>
                            <div>
                                <h3>Order Details</h3>
                                <p style={{cursor: "pointer"}} onClick={editButton}>Edit</p>
                                <p style={{cursor: "pointer"}} onClick={saveButton}>Save</p>
                            </div>
                            <div className={localStyles['orderTable']} style={{overflowX: "auto"}}>
                                <table style={{marginTop: "1rem", marginBottom: "0.5rem"}} className={`overflow-auto`}>
                                    <div>
                                        <tr style={{fontWeight: "bold", borderBottomStyle: "solid"}}>
                                            <th>Order ID</th>
                                            <th>Order Type</th>
                                            <th>Total Credit</th>
                                            <th>Username</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email Address</th>
                                            <th>Phone Number</th>
                                            <th>Quantity</th>
                                            <th>Items</th>
                                            <th>Shipping Address</th>
                                            <th>Delivery Date</th>
                                            <th>Shipper(s)</th>
                                            <th>Vehicle Number</th>
                                            <th>Vehicle Type</th>
                                            <th>Start Location</th>
                                            <th>End Location</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                        </tr>
                                        <hr/>
                                    </div>

                                    <div style={{overflowY: "auto", height: "50vh"}}>
                                        <tr>
                                            <td>1</td>
                                            <td>Purchase</td>
                                            <td></td>
                                            <td>asdf</td>
                                            <td>Asdf</td>
                                            <td>Jkl</td>
                                            <td>asdf@gmail.com</td>
                                            <td>123412341</td>
                                            <td>
                                                <ul>
                                                    <li>1</li>
                                                    <li>4</li>
                                                    <li>2</li>
                                                </ul>
                                            </td>
                                            <td>
                                                <ul>
                                                    <li>Chair</li>
                                                    <li>Bed Frame</li>
                                                    <li>Table</li>
                                                </ul>
                                            </td>
                                            <td>123 Street</td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                id="testInput"
                                                defaultValue={'July 7, 2022'}
                                                placeholder={'First name is required'}
                                                style={{border: "none"}}
                                                onChange={onDateChange}
                                                readOnly
                                            />
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <hr/>
                                    </div>
                                </table>
                            </div>
                        </div>
                        : <> {(isShipper) ?
                            <h1>shipper</h1>
                            : <> {(isUser) ?
                                <div>
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
                            </>}
                        </>}
                </> : null
            }
        </div>
    );
}
