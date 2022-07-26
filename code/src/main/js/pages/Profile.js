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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
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
            response => {
                console.log(response.data);
                setTradeOrder(response.data);
            }
        )

    }, []);

    const editButton = (e, order) => {
        document.getElementById(`address${order.orderID}`).removeAttribute('readonly')
        document.getElementById(`deliveryDate${order.orderID}`).removeAttribute('readonly')
        document.getElementById(`firstName${order.orderID}`).removeAttribute('readonly')
        document.getElementById(`lastName${order.orderID}`).removeAttribute('readonly')
        document.getElementById(`phone${order.orderID}`).removeAttribute('readonly')
        document.getElementById(`email${order.orderID}`).removeAttribute('readonly')
    }

    const editQtyItem = (e, order, item) => {
        document.getElementById(`item${order.orderID}${item.product.productID}${item.product.name}`).removeAttribute('readonly')
        document.getElementById(`qty${order.orderID}${item.product.productID}${item.quantity}`).removeAttribute('readonly')
    }

    const saveButton = (e, order) => {
        document.getElementById(`address${order.orderID}`).readOnly = true;
        document.getElementById(`deliveryDate${order.orderID}`).readOnly = true;
        document.getElementById(`firstName${order.orderID}`).readOnly = true;
        document.getElementById(`lastName${order.orderID}`).readOnly = true;
        document.getElementById(`phone${order.orderID}`).readOnly = true;
        document.getElementById(`email${order.orderID}`).readOnly = true;
    }

    const saveQtyItem = (e, order, item) => {
        document.getElementById(`item${order.orderID}${item.product.productID}${item.product.name}`).readOnly = true;
        document.getElementById(`qty${order.orderID}${item.product.productID}${item.quantity}`).readOnly = true;
    }

    const onDateChange = (e) => {
        setDate(e.target.value);
    }

    const onAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const onItemNameChange = (e) => {
        setItemName(e.target.value);
    }

    const onItemQuantityChange = (e) => {
        setItemQuantity(e.target.value);
    }

    const onFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const onLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const cancelButton = (e, order) => {
        if (confirm('Are you sure you want to cancel the order?')) {
            document.getElementById(`orderStatus${order.orderID}`).innerText = 'Cancelled';
            alert(`Order ${order.orderID} is cancelled.`);
        }
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
                            </div>
                            <div className={localStyles['orderTable']} style={{overflowX: "auto"}}>
                                <table style={{marginTop: "1rem", marginBottom: "0.5rem"}} className={`overflow-auto`}>
                                    <div>
                                        <tr style={{fontWeight: "bold", borderBottomStyle: "solid"}}>
                                            <th></th>
                                            <th>Order ID</th>
                                            <th>Order Status</th>
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

                                    <div style={{overflowY: "auto", height: "50vh"}}
                                         style={{overflowWrap: 'break-word'}}>
                                        {tradeOrders.map((order, index) => (
                                            <>
                                                <tr>
                                                    <td>
                                                        <button className={`btn ${localStyles['btnProfile']}`}
                                                                style={{cursor: "pointer"}}
                                                                onClick={(e) => {
                                                                    editButton(e, order)
                                                                }}>Edit
                                                        </button>
                                                        <button className={`btn ${localStyles['btnProfile']}`}
                                                                style={{cursor: "pointer"}}
                                                                onClick={(e) => {
                                                                    saveButton(e, order)
                                                                }}>Save
                                                        </button>
                                                        {order.purchaseOrder === false ? (
                                                            <button className={`btn ${localStyles['btnProfile']}`}
                                                                    onClick={(e) => {
                                                                        cancelButton(e, order)
                                                                    }}
                                                                    style={{marginRight: "1rem"}}>Cancel</button>) : ('')}
                                                    </td>
                                                    <td>{order.orderID}</td>
                                                    <td id={`orderStatus${order.orderID}`}>
                                                        {order.status.statusID === 1 ? ('New Order') : order.status.statusID === 2 ? ('Scheduled') : order.status.statusID === 3 ? ('Paid') : order.status.statusID === 4 ? ('In Delivery') : order.status.statusID === 5 ? ('Order Fulfilled') : order.status.statusID === 6 ? ('Cancelled') : ('Status N/A')}
                                                    </td>
                                                    <td>
                                                        {order.purchaseOrder === false ? ('Trade') : ('Purchase')}
                                                    </td>
                                                    <td>
                                                        {order.credit === null ? ('0') : order.credit}
                                                    </td>
                                                    <td>username</td>
                                                    <td>{order.firstName === null ? (<textarea
                                                        type="text"
                                                        className="form-control"
                                                        id={`firstName${order.orderID}`}
                                                        defaultValue={order.firstName}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        onChange={onFirstNameChange}
                                                        readOnly
                                                    />) : (<textarea
                                                        type="text"
                                                        className="form-control"
                                                        id={`firstName${order.orderID}`}
                                                        defaultValue={order.firstName}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        onChange={onFirstNameChange}
                                                        readOnly
                                                    />)}</td>
                                                    <td>{order.lastName === null ? (<textarea
                                                        type="text"
                                                        className="form-control"
                                                        id={`lastName${order.orderID}`}
                                                        defaultValue={order.lastName}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        onChange={onLastNameChange}
                                                        readOnly
                                                    />) : (<textarea
                                                        type="text"
                                                        className="form-control"
                                                        id={`lastName${order.orderID}`}
                                                        defaultValue={order.lastName}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        onChange={onLastNameChange}
                                                        readOnly
                                                    />)}</td>
                                                    <td><textarea
                                                        type="text"
                                                        className="form-control"
                                                        id={`email${order.orderID}`}
                                                        defaultValue={order.email}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        onChange={onAddressChange}
                                                        readOnly
                                                    /></td>
                                                    <td><textarea
                                                        type="text"
                                                        className="form-control"
                                                        id={`phone${order.orderID}`}
                                                        defaultValue={order.contactNumber}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        onChange={onAddressChange}
                                                        readOnly
                                                    /></td>
                                                    <td>
                                                        {order.orderDetails.map((item, index) => (
                                                            <>
                                                                   <textarea
                                                                       type="text"
                                                                       className="form-control"
                                                                       id={`qty${order.orderID}${item.product.productID}${item.quantity}`}
                                                                       defaultValue={item.quantity}
                                                                       placeholder={'Required'}
                                                                       style={{
                                                                           border: "none",
                                                                           display: "list-item",
                                                                           marginBottom: "1rem",
                                                                           width: ""
                                                                       }}
                                                                       onChange={onItemQuantityChange}
                                                                       readOnly
                                                                   />
                                                                <p
                                                                    style={{cursor: "pointer",textDecoration:"underline"}}
                                                                    onClick={(e) => {
                                                                        editQtyItem(e, order, item)
                                                                    }}>Edit quantity & item</p>
                                                            </>
                                                        ))}
                                                    </td>
                                                    <td>
                                                        <>
                                                            {order.orderDetails.map((item, index) => (
                                                                <>
                                                                      <textarea
                                                                          type="text"
                                                                          className="form-control"
                                                                          id={`item${order.orderID}${item.product.productID}${item.product.name}`}
                                                                          defaultValue={item.product.name}
                                                                          placeholder={'Required'}
                                                                          style={{
                                                                              border: "none",
                                                                              display: "list-item",
                                                                              marginBottom: "1rem"
                                                                          }}
                                                                          onChange={onItemNameChange}
                                                                          readOnly
                                                                      />
                                                                    <p
                                                                        style={{cursor: "pointer", textDecoration:"underline"}}
                                                                        onClick={(e) => {
                                                                            saveQtyItem(e, order, item)
                                                                        }}>Save quantity & item</p>
                                                                </>
                                                            ))}
                                                        </>
                                                    </td>
                                                    <td><textarea
                                                        type="text"
                                                        className="form-control"
                                                        id={`address${order.orderID}`}
                                                        defaultValue={order.address}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        onChange={onAddressChange}
                                                        readOnly
                                                    /></td>
                                                    <td><textarea
                                                        type="text"
                                                        className="form-control"
                                                        id={`deliveryDate${order.orderID}`}
                                                        defaultValue={order.scheduledDate}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        onChange={onDateChange}
                                                        readOnly
                                                    />
                                                    </td>
                                                    <td><textarea
                                                        type="text"
                                                        className="form-control"
                                                        // id={`deliveryDate${order.orderID}`}
                                                        // defaultValue={order.scheduledDate}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        // onChange={onDateChange}
                                                        readOnly
                                                    /></td>
                                                    <td><textarea
                                                        type="text"
                                                        className="form-control"
                                                        // id={`deliveryDate${order.orderID}`}
                                                        // defaultValue={order.scheduledDate}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        // onChange={onDateChange}
                                                        readOnly
                                                    /></td>
                                                    <td><textarea
                                                        type="text"
                                                        className="form-control"
                                                        // id={`deliveryDate${order.orderID}`}
                                                        // defaultValue={order.scheduledDate}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        // onChange={onDateChange}
                                                        readOnly
                                                    /></td>
                                                    <td><textarea
                                                        type="text"
                                                        className="form-control"
                                                        // id={`deliveryDate${order.orderID}`}
                                                        // defaultValue={order.scheduledDate}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        // onChange={onDateChange}
                                                        readOnly
                                                    /></td>
                                                    <td><textarea
                                                        type="text"
                                                        className="form-control"
                                                        // id={`deliveryDate${order.orderID}`}
                                                        // defaultValue={order.scheduledDate}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        // onChange={onDateChange}
                                                        readOnly
                                                    /></td>
                                                    <td><textarea
                                                        type="text"
                                                        className="form-control"
                                                        // id={`deliveryDate${order.orderID}`}
                                                        // defaultValue={order.scheduledDate}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        // onChange={onDateChange}
                                                        readOnly
                                                    /></td>
                                                    <td><textarea
                                                        type="text"
                                                        className="form-control"
                                                        // id={`deliveryDate${order.orderID}`}
                                                        // defaultValue={order.scheduledDate}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        // onChange={onDateChange}
                                                        readOnly
                                                    /></td>
                                                </tr>
                                                <hr/>
                                            </>
                                        ))}
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
