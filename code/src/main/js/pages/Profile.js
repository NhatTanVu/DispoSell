import React, {useState, useEffect} from "react";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import localStyles from "../../scss/pages/profile.module.scss";
import OrderService from "../services/order.service";
import {Link, useNavigate} from "react-router-dom";

export default function Profile() {
    const [isUserReady, setUserReady] = useState(false);
    const [currentUser, setCurrentUser] = useState({username: ""});
    const [isUser, setIsUser] = useState(false);
    const [isShipper, setIsShipper] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isPurchase, setPurchaseDetails] = useState(true);
    const [date, setDate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [zip, setZIP] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [endTime, setEndTime] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [startLocation, setStartLocation] = useState('');
    const [carType, setCarType] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [shipper, setShipper] = useState([]);
    const [tradeOrders, setTradeOrder] = useState([]);
    const [purchaseOrders, setPurchaseOrder] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [isClicked2, setIsClicked2] = useState(false);
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

        OrderService.getPurchaseOrder().then(
            response => {
                console.log(response.data);
                setPurchaseOrder(response.data);
            }
        )

    }, []);

    const editButton = (e, order, index) => {
        if (index >= 0) {
            document.getElementById(`address${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`address${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`address2${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`address2${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`city${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`city${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`province${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`province${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`zip${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`zip${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`deliveryDate${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`deliveryDate${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`firstName${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`firstName${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`lastName${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`lastName${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`phone${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`phone${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`email${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`email${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`endTime${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`endTime${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`startTime${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`startTime${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`carType${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`carType${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`carNumber${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`carNumber${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`endLocation${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`endLocation${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`startLocation${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`startLocation${order.orderID}${index}`).style.border = "solid";
            document.getElementById(`shipper${order.orderID}${index}`).removeAttribute('readonly')
            document.getElementById(`shipper${order.orderID}${index}`).style.border = "solid";
        } else {
            document.getElementById(`address${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`address${order.orderID}`).style.border = "solid";
            document.getElementById(`address2${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`address2${order.orderID}`).style.border = "solid";
            document.getElementById(`city${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`city${order.orderID}`).style.border = "solid";
            document.getElementById(`province${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`province${order.orderID}`).style.border = "solid";
            document.getElementById(`zip${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`zip${order.orderID}`).style.border = "solid";
            document.getElementById(`deliveryDate${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`deliveryDate${order.orderID}`).style.border = "solid";
            document.getElementById(`firstName${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`firstName${order.orderID}`).style.border = "solid";
            document.getElementById(`lastName${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`lastName${order.orderID}`).style.border = "solid";
            document.getElementById(`phone${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`phone${order.orderID}`).style.border = "solid";
            document.getElementById(`email${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`email${order.orderID}`).style.border = "solid";
            document.getElementById(`endTime${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`endTime${order.orderID}`).style.border = "solid";
            document.getElementById(`startTime${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`startTime${order.orderID}`).style.border = "solid";
            document.getElementById(`carType${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`carType${order.orderID}`).style.border = "solid";
            document.getElementById(`carNumber${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`carNumber${order.orderID}`).style.border = "solid";
            document.getElementById(`endLocation${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`endLocation${order.orderID}`).style.border = "solid";
            document.getElementById(`startLocation${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`startLocation${order.orderID}`).style.border = "solid";
            document.getElementById(`shipper${order.orderID}`).removeAttribute('readonly')
            document.getElementById(`shipper${order.orderID}`).style.border = "solid";
        }
        if (isClicked === false) {
            setIsClicked(true);
            document.getElementById(`editBtn`).innerText = 'Save';
            console.log(isClicked);
        }
        if (isClicked === true) {
            document.getElementById(`editBtn`).innerText = 'Edit';
            setIsClicked(false);

            if (index >= 0) {
                document.getElementById(`address${order.orderID}${index}`).readOnly = true;
                document.getElementById(`address${order.orderID}${index}`).style.border = "none";
                document.getElementById(`address2${order.orderID}${index}`).readOnly = true;
                document.getElementById(`address2${order.orderID}${index}`).style.border = "none";
                document.getElementById(`city${order.orderID}${index}`).readOnly = true;
                document.getElementById(`city${order.orderID}${index}`).style.border = "none";
                document.getElementById(`province${order.orderID}${index}`).readOnly = true;
                document.getElementById(`province${order.orderID}${index}`).style.border = "none";
                document.getElementById(`zip${order.orderID}${index}`).readOnly = true;
                document.getElementById(`zip${order.orderID}${index}`).style.border = "none";
                document.getElementById(`deliveryDate${order.orderID}${index}`).readOnly = true;
                document.getElementById(`deliveryDate${order.orderID}${index}`).style.border = "none";
                document.getElementById(`firstName${order.orderID}${index}`).readOnly = true;
                document.getElementById(`firstName${order.orderID}${index}`).style.border = "none";
                document.getElementById(`lastName${order.orderID}${index}`).readOnly = true;
                document.getElementById(`lastName${order.orderID}${index}`).style.border = "none";
                document.getElementById(`phone${order.orderID}${index}`).readOnly = true;
                document.getElementById(`phone${order.orderID}${index}`).style.border = "none";
                document.getElementById(`email${order.orderID}${index}`).readOnly = true;
                document.getElementById(`email${order.orderID}${index}`).style.border = "none";
                document.getElementById(`endTime${order.orderID}${index}`).readOnly = true;
                document.getElementById(`endTime${order.orderID}${index}`).style.border = "none";
                document.getElementById(`startTime${order.orderID}${index}`).readOnly = true;
                document.getElementById(`startTime${order.orderID}${index}`).style.border = "none";
                document.getElementById(`carType${order.orderID}${index}`).readOnly = true;
                document.getElementById(`carType${order.orderID}${index}`).style.border = "none";
                document.getElementById(`carNumber${order.orderID}${index}`).readOnly = true;
                document.getElementById(`carNumber${order.orderID}${index}`).style.border = "none";
                document.getElementById(`endLocation${order.orderID}${index}`).readOnly = true;
                document.getElementById(`endLocation${order.orderID}${index}`).style.border = "none";
                document.getElementById(`startLocation${order.orderID}${index}`).readOnly = true;
                document.getElementById(`startLocation${order.orderID}${index}`).style.border = "none";
                document.getElementById(`shipper${order.orderID}${index}`).readOnly = true;
                document.getElementById(`shipper${order.orderID}${index}`).style.border = "none";

            } else {
                document.getElementById(`address${order.orderID}`).readOnly = true;
                document.getElementById(`address${order.orderID}`).style.border = "none";
                document.getElementById(`address2${order.orderID}`).readOnly = true;
                document.getElementById(`address2${order.orderID}`).style.border = "none";
                document.getElementById(`city${order.orderID}`).readOnly = true;
                document.getElementById(`city${order.orderID}`).style.border = "none";
                document.getElementById(`province${order.orderID}`).readOnly = true;
                document.getElementById(`province${order.orderID}`).style.border = "none";
                document.getElementById(`zip${order.orderID}`).readOnly = true;
                document.getElementById(`zip${order.orderID}`).style.border = "none";
                document.getElementById(`deliveryDate${order.orderID}`).readOnly = true;
                document.getElementById(`deliveryDate${order.orderID}`).style.border = "none";
                document.getElementById(`firstName${order.orderID}`).readOnly = true;
                document.getElementById(`firstName${order.orderID}`).style.border = "none";
                document.getElementById(`lastName${order.orderID}`).readOnly = true;
                document.getElementById(`lastName${order.orderID}`).style.border = "none";
                document.getElementById(`phone${order.orderID}`).readOnly = true;
                document.getElementById(`phone${order.orderID}`).style.border = "none";
                document.getElementById(`email${order.orderID}`).readOnly = true;
                document.getElementById(`email${order.orderID}`).style.border = "none";
                document.getElementById(`endTime${order.orderID}`).readOnly = true;
                document.getElementById(`endTime${order.orderID}`).style.border = "none";
                document.getElementById(`startTime${order.orderID}`).readOnly = true;
                document.getElementById(`startTime${order.orderID}`).style.border = "none";
                document.getElementById(`carType${order.orderID}`).readOnly = true;
                document.getElementById(`carType${order.orderID}`).style.border = "none";
                document.getElementById(`carNumber${order.orderID}`).readOnly = true;
                document.getElementById(`carNumber${order.orderID}`).style.border = "none";
                document.getElementById(`endLocation${order.orderID}`).readOnly = true;
                document.getElementById(`endLocation${order.orderID}`).style.border = "none";
                document.getElementById(`startLocation${order.orderID}`).readOnly = true;
                document.getElementById(`startLocation${order.orderID}`).style.border = "none";
                document.getElementById(`shipper${order.orderID}`).readOnly = true;
                document.getElementById(`shipper${order.orderID}`).style.border = "none";
            }
        }

    }

    const editQtyItem = (e, order, item) => {
        if (isClicked2 === false) {
            setIsClicked2(true);
            document.getElementById(`editQtyBtn${item.product.productID}`).innerText = 'Save Quantity & Item';
            document.getElementById(`item${order.orderID}${item.product.productID}${item.product.name}`).removeAttribute('readonly')
            document.getElementById(`item${order.orderID}${item.product.productID}${item.product.name}`).style.border = "solid";
            document.getElementById(`qty${order.orderID}${item.product.productID}${item.quantity}`).removeAttribute('readonly')
            document.getElementById(`qty${order.orderID}${item.product.productID}${item.quantity}`).style.border = "solid";
        }
        if (isClicked2 === true) {
            document.getElementById(`editQtyBtn${item.product.productID}`).innerText = 'Edit Quantity & Item';
            setIsClicked2(false);
            document.getElementById(`item${order.orderID}${item.product.productID}${item.product.name}`).readOnly = true;
            document.getElementById(`item${order.orderID}${item.product.productID}${item.product.name}`).style.border = "none";
            document.getElementById(`qty${order.orderID}${item.product.productID}${item.quantity}`).readOnly = true;
            document.getElementById(`qty${order.orderID}${item.product.productID}${item.quantity}`).style.border = "none";
        }
    }

    //const saveQtyItem = (e, order, item) => {}

    const onDateChange = (e) => {
        setDate(e.target.value);
    }

    const onAddressLine1Change = (e) => {
        setAddressLine1(e.target.value);
    }

    const onAddressLine2Change = (e) => {
        setAddressLine2(e.target.value);
    }

    const onCityChange = (e) => {
        setCity(e.target.value);
    }

    const onProvinceChange = (e) => {
        setProvince(e.target.value);
    }

    const onZIPChange = (e) => {
        setZIP(e.target.value);
    }

    const onEndTimeChange = (e) => {
        setEndTime(e.target.value);
    }

    const onStartTimeChange = (e) => {
        setStartTime(e.target.value);
    }

    const onEndLocationChange = (e) => {
        setEndLocation(e.target.value);
    }

    const onStartLocationChange = (e) => {
        setStartLocation(e.target.value);
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onCarTypeChange = (e) => {
        setCarType(e.target.value);
    }

    const onCarNumberChange = (e) => {
        setCarNumber(e.target.value);
    }

    const onShipperChange = (e) => {
        setShipper(e.target.value);
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

    const onPhoneChange = (e) => {
        setPhoneNumber(e.target.value);
    }

    const cancelButton = (e, order) => {
        if (confirm('Are you sure you want to cancel the order?')) {
            document.getElementById(`orderStatus${order.orderID}`).innerText = 'Cancelled';
            alert(`Order ${order.orderID} is cancelled.`);
        }
    }

    const showPurchaseOrder = () => {
        setPurchaseDetails(true);
    }

    const showTradeOrder = () => {
        setPurchaseDetails(false);
    }

    return (
        <div style={{marginTop: "5rem", marginBottom: "2rem", marginRight: "2rem", marginLeft: "2rem"}}>
            {(isUserReady) ?
                <>
                    <h2>Hello, <strong>{currentUser.username}</strong>!</h2>
                    {(isAdmin) ?
                        <div style={{marginTop: "1rem", marginBottom: "0.5rem"}}>
                            <div>
                                <button className={`btn ${localStyles['btnProfile']}`}
                                        style={{cursor: "pointer", width: "48.5%", marginRight: "1.5%"}}
                                        onClick={showPurchaseOrder}>Purchase Orders
                                </button>
                                <button className={`btn ${localStyles['btnProfile']}`}
                                        style={{cursor: "pointer", width: "48.5%", marginLeft: "1.5%"}}
                                        onClick={showTradeOrder}>Trade Orders
                                </button>
                            </div>
                            {(isPurchase) ? (<>
                                    <div style={{marginTop: "1rem", marginBottom: "0.5rem"}}>
                                        <h3>Purchase Order Details</h3>
                                    </div>
                                    <div className={localStyles['orderTable']} style={{overflowX: "auto"}}>
                                        <table style={{marginTop: "1rem", marginBottom: "0.5rem"}}
                                               className={`overflow-auto`}>
                                            <div>
                                                <tr style={{fontWeight: "bold", borderBottomStyle: "solid"}}>
                                                    {/*<th></th>*/}
                                                    <th>Order ID</th>
                                                    <th>Order Status</th>
                                                    <th>Order Date</th>
                                                    <th>Total</th>
                                                    {/*<th>Username</th>*/}
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email Address</th>
                                                    <th>Phone Number</th>
                                                    <th>Items</th>
                                                    <th>Quantity</th>
                                                    <th>Delivery</th>
                                                    {/*<th>Address Line 1</th>*/}
                                                    {/*<th>Address Line 2</th>*/}
                                                    {/*<th>City</th>*/}
                                                    {/*<th>Province</th>*/}
                                                    {/*<th>ZIP Code</th>*/}
                                                    {/*<th>Delivery Date</th>*/}
                                                    {/*<th>Shipper(s)</th>*/}
                                                    {/*<th>Vehicle Number</th>*/}
                                                    {/*<th>Vehicle Type</th>*/}
                                                    {/*<th>Start Location</th>*/}
                                                    {/*<th>End Location</th>*/}
                                                    {/*<th>Start Time</th>*/}
                                                    {/*<th>End Time</th>*/}
                                                </tr>
                                                <hr/>
                                            </div>

                                            <div style={{height: "50vh", overflowWrap: 'break-word'}}
                                                 className='align-items-baseline align-self-baseline'>
                                                {purchaseOrders.map((purchaseorder, index) => (
                                                    <>
                                                        <tr key={purchaseorder.orderID}>
                                                            {/*<td>*/}
                                                            {/*    <button className={`btn ${localStyles['btnProfile']}`}*/}
                                                            {/*            id={`editBtn`}*/}
                                                            {/*            style={{cursor: "pointer"}}*/}
                                                            {/*            onClick={(e) => {*/}
                                                            {/*                editButton(e, purchaseorder, index)*/}
                                                            {/*            }}>Edit*/}
                                                            {/*    </button>*/}
                                                            {/*</td>*/}
                                                            <td><Link as={Link}
                                                                      to={`/orderDetails/${purchaseorder.orderID}`}>{purchaseorder.orderID}</Link>
                                                            </td>
                                                            <td id={`orderStatus${purchaseorder.orderID}`}>
                                                                {purchaseorder.status.statusID === 1 ? ('New Order') : purchaseorder.status.statusID === 2 ? ('Approved') : purchaseorder.status.statusID === 3 ? ('Rejected') : purchaseorder.status.statusID === 4 ? ('Paid') : purchaseorder.status.statusID === 5 ? ('Scheduled') : purchaseorder.status.statusID === 6 ? ('In Delivery') : purchaseorder.status.statusID === 7 ? ('Done') : purchaseorder.status.statusID === 8 ? ('Cancelled') : ('Status N/A')}
                                                            </td>
                                                            <td>
                                                                {purchaseorder.orderedDate}
                                                            </td>
                                                            <td>
                                                                {purchaseorder.paymentAmount === null ? ('$0') : (`$${purchaseorder.paymentAmount}`)}
                                                            </td>
                                                            {/*<td>username</td>*/}
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id={`firstName${purchaseorder.orderID}${index}`}
                                                                    defaultValue={purchaseorder.firstName === null ? ('null') : (purchaseorder.firstName)}
                                                                    placeholder={'Required'}
                                                                    style={{border: "none", backgroundColor: "transparent"}}
                                                                    onChange={onFirstNameChange}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td><input
                                                                type="text"
                                                                className="form-control"
                                                                id={`lastName${purchaseorder.orderID}${index}`}
                                                                defaultValue={purchaseorder.lastName === null ? ('null') : (purchaseorder.lastName)}
                                                                placeholder={'Required'}
                                                                style={{border: "none", backgroundColor: "transparent"}}
                                                                onChange={onLastNameChange}
                                                                readOnly
                                                            /></td>
                                                            <td><textarea
                                                                type="text"
                                                                className="form-control"
                                                                id={`email${purchaseorder.orderID}${index}`}
                                                                defaultValue={purchaseorder.email}
                                                                placeholder={'Required'}
                                                                maxLength={70}
                                                                style={{
                                                                    border: "none",
                                                                    backgroundColor: "transparent",
                                                                    wordBreak: "break-word",
                                                                    resize: "none",
                                                                    overflow: "auto"
                                                                }} onChange={onEmailChange}
                                                                readOnly
                                                            /></td>
                                                            <td><input
                                                                type="text"
                                                                className="form-control"
                                                                id={`phone${purchaseorder.orderID}${index}`}
                                                                defaultValue={purchaseorder.contactNumber}
                                                                placeholder={'Required'}
                                                                maxLength={10}
                                                                style={{border: "none", backgroundColor: "transparent"}}
                                                                onChange={onPhoneChange}
                                                                readOnly
                                                            /></td>
                                                            <td>
                                                                <>
                                                                    {purchaseorder.orderDetails.map((purchaseitem, index) => (
                                                                        <>
                                                                      <textarea
                                                                          type="text"
                                                                          className="form-control"
                                                                          id={`item${purchaseorder.orderID}${purchaseitem.product.productID}${purchaseitem.product.name}`}
                                                                          defaultValue={purchaseitem.product.name}
                                                                          placeholder={'Required'}
                                                                          maxLength={70}
                                                                          style={{
                                                                              border: "none",
                                                                              backgroundColor: "transparent",
                                                                              wordBreak: "break-word",
                                                                              resize: "none",
                                                                              overflow: "auto"
                                                                          }}
                                                                          onChange={onItemNameChange}
                                                                          readOnly
                                                                      />
                                                                            {/*<button*/}
                                                                            {/*    className={`btn ${localStyles['btnProfile']}`}*/}
                                                                            {/*    style={{*/}
                                                                            {/*        cursor: "pointer",*/}
                                                                            {/*        marginTop: "0",*/}
                                                                            {/*        fontSize: "small",*/}
                                                                            {/*        visibility: "hidden"*/}
                                                                            {/*    }}>Save Quantity & Item*/}
                                                                            {/*</button>*/}
                                                                        </>
                                                                    ))}
                                                                </>
                                                            </td>
                                                            <td>
                                                                {purchaseorder.orderDetails.map((purchaseitem, index) => (
                                                                    <>
                                                                   <textarea
                                                                       type="text"
                                                                       className="form-control"
                                                                       id={`qty${purchaseorder.orderID}${purchaseitem.product.productID}${purchaseitem.quantity}`}
                                                                       defaultValue={purchaseitem.quantity}
                                                                       placeholder={'Required'}
                                                                       maxLength={2}
                                                                       style={{
                                                                           border: "none",
                                                                           backgroundColor: "transparent",
                                                                           wordBreak: "break-word",
                                                                           resize: "none",
                                                                           overflow: "auto"
                                                                       }}
                                                                       onChange={onItemQuantityChange}
                                                                       readOnly
                                                                   />
                                                                        {/*<button*/}
                                                                        {/*    className={`btn ${localStyles['btnProfile']}`}*/}
                                                                        {/*    style={{*/}
                                                                        {/*        cursor: "pointer",*/}
                                                                        {/*        marginTop: "0",*/}
                                                                        {/*        fontSize: "small"*/}
                                                                        {/*    }}*/}
                                                                        {/*    id={`editQtyBtn${purchaseitem.product.productID}`}*/}
                                                                        {/*    onClick={(e) => {*/}
                                                                        {/*        editQtyItem(e, purchaseorder, purchaseitem)*/}
                                                                        {/*    }}>Edit Quantity & Item*/}
                                                                        {/*</button>*/}
                                                                    </>
                                                                ))}
                                                            </td>
                                                            <td>
                                                                {purchaseorder.status.statusID === 4 ? (
                                                                        <button className={`btn ${localStyles['btnProfile']}`}
                                                                                id={`editBtn`}
                                                                                style={{cursor: "pointer"}}
                                                                                onClick={(e) => {
                                                                                    navigate(`/scheduleDelivery/${purchaseorder.orderID}`)
                                                                                }}>Schedule
                                                                        </button>) :
                                                                    <button className={`btn ${localStyles['btnProfile']}`}
                                                                            id={`editBtn`}
                                                                            style={{cursor: "pointer"}}
                                                                            disabled
                                                                    >Already Scheduled
                                                                    </button>}
                                                            </td>
                                                            {/*<td><textarea*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`address${purchaseorder.orderID}${index}`}*/}
                                                            {/*    defaultValue={purchaseorder.address}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    maxLength={50}*/}
                                                            {/*    style={{*/}
                                                            {/*        border: "none",*/}
                                                            {/*        backgroundColor: "transparent",*/}
                                                            {/*        wordBreak: "break-word",*/}
                                                            {/*        resize: "none",*/}
                                                            {/*        overflow: "auto"*/}
                                                            {/*    }}*/}
                                                            {/*    onChange={onAddressLine1Change}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><textarea*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`address2${purchaseorder.orderID}${index}`}*/}
                                                            {/*    defaultValue={purchaseorder.addressLine2 === null ? null : purchaseorder.addressLine}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    maxLength={50}*/}
                                                            {/*    style={{*/}
                                                            {/*        border: "none",*/}
                                                            {/*        backgroundColor: "transparent",*/}
                                                            {/*        wordBreak: "break-word",*/}
                                                            {/*        resize: "none",*/}
                                                            {/*        overflow: "auto"*/}
                                                            {/*    }}*/}
                                                            {/*    onChange={onAddressLine2Change}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`city${purchaseorder.orderID}${index}`}*/}
                                                            {/*    defaultValue={purchaseorder.city === null ? null : purchaseorder.city}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    maxLength={31}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onCityChange}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`province${purchaseorder.orderID}${index}`}*/}
                                                            {/*    defaultValue={purchaseorder.province === null ? null : purchaseorder.province}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    maxLength={2}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onProvinceChange}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`zip${purchaseorder.orderID}${index}`}*/}
                                                            {/*    defaultValue={purchaseorder.zip === null ? null : purchaseorder.zip}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    maxLength={7}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onZIPChange}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`deliveryDate${purchaseorder.orderID}${index}`}*/}
                                                            {/*    defaultValue={purchaseorder.scheduledDate}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onDateChange}*/}
                                                            {/*    maxLength={10}*/}
                                                            {/*    readOnly*/}
                                                            {/*/>*/}
                                                            {/*</td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`shipper${purchaseorder.orderID}${index}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onShipperChange}*/}
                                                            {/*    maxLength={10}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`carNumber${purchaseorder.orderID}${index}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onCarNumberChange}*/}
                                                            {/*    maxLength={10}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`carType${purchaseorder.orderID}${index}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onCarTypeChange}*/}
                                                            {/*    maxLength={10}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`startLocation${purchaseorder.orderID}${index}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onStartLocationChange}*/}
                                                            {/*    maxLength={100}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`endLocation${purchaseorder.orderID}${index}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onEndLocationChange}*/}
                                                            {/*    maxLength={100}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`startTime${purchaseorder.orderID}${index}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onStartTimeChange}*/}
                                                            {/*    maxLength={5}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`endTime${purchaseorder.orderID}${index}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    maxLength={5}*/}
                                                            {/*    onChange={onEndTimeChange}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                        </tr>
                                                        <hr/>
                                                    </>
                                                ))}
                                            </div>
                                        </table>
                                    </div>
                                </>)
                                : (<>
                                    <div style={{marginTop: "1rem", marginBottom: "0.5rem"}}>
                                        <h3>Trade Order Details</h3>
                                    </div>
                                    <div className={localStyles['orderTable']} style={{overflowX: "auto"}}>
                                        <table style={{marginTop: "1rem", marginBottom: "0.5rem"}}
                                               className={`overflow-auto`}>
                                            <div>
                                                <tr style={{fontWeight: "bold", borderBottomStyle: "solid"}}>
                                                    {/*<th></th>*/}
                                                    <th>Order ID</th>
                                                    <th>Order Status</th>
                                                    <th>Order Date</th>
                                                    <th>Total Credit</th>
                                                    {/*<th>Username</th>*/}
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email Address</th>
                                                    <th>Phone Number</th>
                                                    <th>Items</th>
                                                    <th>Quantity</th>
                                                    {/*<th>Delivery</th>*/}
                                                    {/*<th>Address Line 1</th>*/}
                                                    {/*<th>Address Line 2</th>*/}
                                                    {/*<th>City</th>*/}
                                                    {/*<th>Province</th>*/}
                                                    {/*<th>ZIP Code</th>*/}
                                                    {/*<th>Delivery Date</th>*/}
                                                    {/*<th>Shipper(s)</th>*/}
                                                    {/*<th>Vehicle Number</th>*/}
                                                    {/*<th>Vehicle Type</th>*/}
                                                    {/*<th>Start Location</th>*/}
                                                    {/*<th>End Location</th>*/}
                                                    {/*<th>Start Time</th>*/}
                                                    {/*<th>End Time</th>*/}
                                                </tr>
                                                <hr/>
                                            </div>

                                            <div style={{overflowY: "auto", height: "50vh", overflowWrap: 'break-word'}}
                                                 className='align-items-baseline align-self-baseline'>
                                                {tradeOrders.map((order, index) => (
                                                    <>
                                                        <tr key={order.orderID}>
                                                            {/*<td>*/}
                                                            {/*    <button className={`btn ${localStyles['btnProfile']}`}*/}
                                                            {/*            style={{cursor: "pointer"}}*/}
                                                            {/*            id={`editBtn`}*/}
                                                            {/*            onClick={(e) => {*/}
                                                            {/*                editButton(e, order)*/}
                                                            {/*            }}>Edit*/}
                                                            {/*    </button>*/}
                                                            {/*    <button*/}
                                                            {/*        className={`btn ${localStyles['btnProfile']}`}*/}
                                                            {/*        onClick={(e) => {*/}
                                                            {/*            cancelButton(e, order)*/}
                                                            {/*        }}*/}
                                                            {/*        style={{marginRight: "1rem"}}>Cancel*/}
                                                            {/*        Order*/}
                                                            {/*    </button>*/}
                                                            {/*</td>*/}
                                                            <td><Link as={Link}
                                                                      to={`/orderDetails/${order.orderID}`}>{order.orderID}</Link>
                                                            </td>
                                                            <td id={`orderStatus${order.orderID}`}>
                                                                {order.status.statusID === 1 ? ('New Order') : order.status.statusID === 2 ? ('Approved') : order.status.statusID === 3 ? ('Rejected') : order.status.statusID === 4 ? ('Paid') : order.status.statusID === 5 ? ('Scheduled') : order.status.statusID === 6 ? ('In Delivery') : order.status.statusID === 7 ? ('Done') : order.status.statusID === 8 ? ('Cancelled') : ('Status N/A')}
                                                            </td>
                                                            <td>
                                                                {order.orderedDate}
                                                            </td>
                                                            <td>
                                                                {order.credit === null ? ('0') : order.credit}
                                                            </td>
                                                            {/*<td>username</td>*/}
                                                            <td><input
                                                                type="text"
                                                                className="form-control"
                                                                id={`firstName${order.orderID}`}
                                                                defaultValue={order.firstName === null ? ('null') : (order.firstName)}
                                                                placeholder={'Required'}
                                                                maxLength={30}
                                                                style={{border: "none", backgroundColor: "transparent"}}
                                                                onChange={onFirstNameChange}
                                                                readOnly
                                                            /></td>
                                                            <td><input
                                                                type="text"
                                                                className="form-control"
                                                                id={`lastName${order.orderID}`}
                                                                defaultValue={order.lastName === null ? ('null') : (order.lastName)}
                                                                maxLength={30}
                                                                style={{border: "none", backgroundColor: "transparent"}}
                                                                onChange={onLastNameChange}
                                                                readOnly
                                                            /></td>
                                                            <td><textarea
                                                                type="text"
                                                                className="form-control"
                                                                id={`email${order.orderID}`}
                                                                defaultValue={order.email}
                                                                placeholder={'Required'}
                                                                maxLength={70}
                                                                style={{
                                                                    border: "none",
                                                                    backgroundColor: "transparent",
                                                                    wordBreak: "break-word",
                                                                    resize: "none",
                                                                    overflow: "auto"
                                                                }}
                                                                onChange={onEmailChange}
                                                                readOnly
                                                            /></td>
                                                            <td><input
                                                                type="text"
                                                                className="form-control"
                                                                id={`phone${order.orderID}`}
                                                                defaultValue={order.contactNumber}
                                                                placeholder={'Required'}
                                                                maxLength={10}
                                                                style={{border: "none", backgroundColor: "transparent"}}
                                                                onChange={onPhoneChange}
                                                                readOnly
                                                            /></td>
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
                                                                                    backgroundColor: "transparent",
                                                                                    wordBreak: "break-word",
                                                                                    resize: "none",
                                                                                    overflow: "auto",
                                                                                    display: "list-item",
                                                                                }}
                                                                                maxLength={200}
                                                                                onChange={onItemNameChange}
                                                                                readOnly
                                                                            />
                                                                            {/*<button*/}
                                                                            {/*    className={`btn ${localStyles['btnProfile']}`}*/}
                                                                            {/*    style={{*/}
                                                                            {/*        cursor: "pointer",*/}
                                                                            {/*        marginTop: "0",*/}
                                                                            {/*        fontSize: "small",*/}
                                                                            {/*        visibility: 'hidden'*/}
                                                                            {/*    }}>Edit Quantity & Item*/}
                                                                            {/*</button>*/}
                                                                        </>
                                                                    ))}
                                                                </>
                                                            </td>
                                                            <td>
                                                                {order.orderDetails.map((item, index) => (
                                                                    <>
                                                                        <textarea
                                                                            type="number"
                                                                            className="form-control"
                                                                            id={`qty${order.orderID}${item.product.productID}${item.quantity}`}
                                                                            defaultValue={item.quantity}
                                                                            placeholder={'Required'}
                                                                            style={{
                                                                                border: "none",
                                                                                backgroundColor: "transparent",
                                                                                wordBreak: "break-word",
                                                                                resize: "none",
                                                                                overflow: "auto", display: "list-item",
                                                                            }}
                                                                            onChange={onItemQuantityChange}
                                                                            maxLength={2}
                                                                            readOnly
                                                                        />
                                                                        {/*<button*/}
                                                                        {/*    className={`btn ${localStyles['btnProfile']}`}*/}
                                                                        {/*    style={{*/}
                                                                        {/*        cursor: "pointer",*/}
                                                                        {/*        marginTop: "0",*/}
                                                                        {/*        fontSize: "small"*/}
                                                                        {/*    }}*/}
                                                                        {/*    id={`editQtyBtn${item.product.productID}`}*/}
                                                                        {/*    onClick={(e) => {*/}
                                                                        {/*        editQtyItem(e, order, item)*/}
                                                                        {/*    }}>Edit Quantity & Item*/}
                                                                        {/*</button>*/}
                                                                    </>
                                                                ))}
                                                            </td>
                                                            {/*<td>*/}
                                                            {/*    <button className={`btn ${localStyles['btnProfile']}`}*/}
                                                            {/*            id={`editBtn`}*/}
                                                            {/*            style={{cursor: "pointer"}}*/}
                                                            {/*            onClick={(e) => {*/}
                                                            {/*                navigate(`/scheduleDelivery/${order.orderID}`)*/}
                                                            {/*            }}>Schedule*/}
                                                            {/*    </button>*/}
                                                            {/*</td>*/}
                                                            {/*<td><textarea*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`address${order.orderID}`}*/}
                                                            {/*    defaultValue={order.address}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{*/}
                                                            {/*        border: "none",*/}
                                                            {/*        backgroundColor: "transparent",*/}
                                                            {/*        wordBreak: "break-word",*/}
                                                            {/*        resize: "none",*/}
                                                            {/*        overflow: "auto",*/}
                                                            {/*        display: "list-item",*/}
                                                            {/*    }}*/}
                                                            {/*    maxLength={50}*/}
                                                            {/*    onChange={onAddressLine1Change}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><textarea*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`address2${order.orderID}`}*/}
                                                            {/*    defaultValue={order.addressLine2 === null ? null : order.addressLine2}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{*/}
                                                            {/*        border: "none",*/}
                                                            {/*        backgroundColor: "transparent",*/}
                                                            {/*        wordBreak: "break-word",*/}
                                                            {/*        resize: "none",*/}
                                                            {/*        overflow: "auto",*/}
                                                            {/*        display: "list-item",*/}
                                                            {/*    }}*/}
                                                            {/*    maxLength={50}*/}
                                                            {/*    onChange={onAddressLine2Change}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`city${order.orderID}`}*/}
                                                            {/*    defaultValue={order.city === null ? null : order.city}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    maxLength={31}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onCityChange}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`province${order.orderID}`}*/}
                                                            {/*    defaultValue={order.province === null ? null : order.province}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    maxLength={2}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onProvinceChange}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`zip${order.orderID}`}*/}
                                                            {/*    defaultValue={order.zip === null ? null : order.zip}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    maxLength={7}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onZIPChange}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`deliveryDate${order.orderID}`}*/}
                                                            {/*    defaultValue={order.scheduledDate}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onDateChange}*/}
                                                            {/*    maxLength={10}*/}
                                                            {/*    readOnly*/}
                                                            {/*/>*/}
                                                            {/*</td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`shipper${order.orderID}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onShipperChange}*/}
                                                            {/*    maxLength={10}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`carNumber${order.orderID}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onCarNumberChange}*/}
                                                            {/*    maxLength={10}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`carType${order.orderID}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onCarTypeChange}*/}
                                                            {/*    maxLength={10}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`startLocation${order.orderID}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onStartLocationChange}*/}
                                                            {/*    maxLength={100}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`endLocation${order.orderID}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onEndLocationChange}*/}
                                                            {/*    maxLength={100}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`startTime${order.orderID}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    onChange={onStartTimeChange}*/}
                                                            {/*    maxLength={5}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                            {/*<td><input*/}
                                                            {/*    type="text"*/}
                                                            {/*    className="form-control"*/}
                                                            {/*    id={`endTime${order.orderID}`}*/}
                                                            {/*    placeholder={'Required'}*/}
                                                            {/*    style={{border: "none", backgroundColor: "transparent"}}*/}
                                                            {/*    maxLength={5}*/}
                                                            {/*    onChange={onEndTimeChange}*/}
                                                            {/*    readOnly*/}
                                                            {/*/></td>*/}
                                                        </tr>
                                                        <hr/>
                                                    </>
                                                ))}
                                            </div>
                                        </table>
                                    </div>
                                </>)}
                        </div>
                        : <> {(isShipper) ?
                            <h1>You are a shipper</h1>
                            : <> {(isUser) ?
                                <>
                                    <h1>You are a user</h1>
                                    {/*<div style={{marginTop: "1rem", marginBottom: "0.5rem"}}>*/}
                                    {/*    <h3>Order Details</h3>*/}
                                    {/*</div>*/}
                                    {/*<div className={localStyles['orderTable']} style={{overflowX: "auto"}}>*/}
                                    {/*    <table style={{marginTop: "1rem", marginBottom: "0.5rem", width: "100%"}}>*/}
                                    {/*        <div>*/}
                                    {/*            <tr style={{fontWeight: "bold", borderBottomStyle: "solid"}}>*/}
                                    {/*                <th>Order ID</th>*/}
                                    {/*                <th>Order Status</th>*/}
                                    {/*                <th>Order Date</th>*/}
                                    {/*                <th>Total</th>*/}
                                    {/*                <th></th>*/}
                                    {/*                /!*<th>Username</th>*!/*/}
                                    {/*            </tr>*/}
                                    {/*            <hr/>*/}
                                    {/*        </div>*/}

                                    {/*        <div style={{overflowY: "auto", height: "50vh", overflowWrap: 'break-word'}}*/}
                                    {/*             className='align-items-baseline align-self-baseline'>*/}
                                    {/*            {purchaseOrders.map((purchaseorder, index) => (*/}
                                    {/*                <>*/}
                                    {/*                    <tr key={purchaseorder.orderID}>*/}
                                    {/*                        <td><Link as={Link}*/}
                                    {/*                                  to={`/orderDetails/${purchaseorder.orderID}`}>{purchaseorder.orderID}</Link>*/}
                                    {/*                        </td>*/}
                                    {/*                        <td id={`orderStatus${purchaseorder.orderID}`}>*/}
                                    {/*                            {purchaseorder.status.statusID === 1 ? ('New') : purchaseorder.status.statusID === 2 ? ('Approved') : purchaseorder.status.statusID === 3 ? ('Rejected') : purchaseorder.status.statusID === 4 ? ('Paid') : purchaseorder.status.statusID === 5 ? ('Scheduled') : purchaseorder.status.statusID === 6 ? ('In Delivery') : purchaseorder.status.statusID === 7 ? "Done" : purchaseorder.status.statusID === 8 ? "Cancelled" : ('N/A')}*/}
                                    {/*                        </td>*/}
                                    {/*                        <td>*/}
                                    {/*                            {purchaseorder.orderedDate}*/}
                                    {/*                        </td>*/}
                                    {/*                        <td>*/}
                                    {/*                            {purchaseorder.paymentAmount === null ? ('$0') : (`$${purchaseorder.paymentAmount}`)}*/}
                                    {/*                        </td>*/}
                                    {/*                        <td>*/}
                                    {/*                            <button className={`btn ${localStyles['btnProfile']}`}*/}
                                    {/*                                    style={{cursor: "pointer"}}*/}
                                    {/*                                    onClick={(e) => {*/}
                                    {/*                                        navigate(`/orderDetails/${purchaseorder.orderID}`)*/}
                                    {/*                                    }}> View Order*/}
                                    {/*                            </button>*/}
                                    {/*                        </td>*/}
                                    {/*                        /!*<td>username</td>*!/*/}
                                    {/*                    </tr>*/}
                                    {/*                    <hr/>*/}
                                    {/*                </>*/}
                                    {/*            ))}*/}
                                    {/*        </div>*/}
                                    {/*    </table>*/}
                                    {/*</div>*/}
                                </>
                                : null}
                            </>}
                        </>}
                </>
                : null
            }
        </div>
    );
}


// const saveButton = (e, order, index) => {
//     if (index >= 0) {
//         document.getElementById(`address${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`address${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`address2${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`address2${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`city${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`city${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`province${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`province${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`zip${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`zip${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`deliveryDate${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`deliveryDate${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`firstName${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`firstName${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`lastName${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`lastName${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`phone${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`phone${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`email${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`email${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`endTime${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`endTime${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`startTime${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`startTime${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`carType${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`carType${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`carNumber${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`carNumber${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`endLocation${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`endLocation${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`startLocation${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`startLocation${order.orderID}${index}`).style.border = "none";
//         document.getElementById(`shipper${order.orderID}${index}`).readOnly = true;
//         document.getElementById(`shipper${order.orderID}${index}`).style.border = "none";
//
//     } else {
//         document.getElementById(`address${order.orderID}`).readOnly = true;
//         document.getElementById(`address${order.orderID}`).style.border = "none";
//         document.getElementById(`address2${order.orderID}`).readOnly = true;
//         document.getElementById(`address2${order.orderID}`).style.border = "none";
//         document.getElementById(`city${order.orderID}`).readOnly = true;
//         document.getElementById(`city${order.orderID}`).style.border = "none";
//         document.getElementById(`province${order.orderID}`).readOnly = true;
//         document.getElementById(`province${order.orderID}`).style.border = "none";
//         document.getElementById(`zip${order.orderID}`).readOnly = true;
//         document.getElementById(`zip${order.orderID}`).style.border = "none";
//         document.getElementById(`deliveryDate${order.orderID}`).readOnly = true;
//         document.getElementById(`deliveryDate${order.orderID}`).style.border = "none";
//         document.getElementById(`firstName${order.orderID}`).readOnly = true;
//         document.getElementById(`firstName${order.orderID}`).style.border = "none";
//         document.getElementById(`lastName${order.orderID}`).readOnly = true;
//         document.getElementById(`lastName${order.orderID}`).style.border = "none";
//         document.getElementById(`phone${order.orderID}`).readOnly = true;
//         document.getElementById(`phone${order.orderID}`).style.border = "none";
//         document.getElementById(`email${order.orderID}`).readOnly = true;
//         document.getElementById(`email${order.orderID}`).style.border = "none";
//         document.getElementById(`endTime${order.orderID}`).readOnly = true;
//         document.getElementById(`endTime${order.orderID}`).style.border = "none";
//         document.getElementById(`startTime${order.orderID}`).readOnly = true;
//         document.getElementById(`startTime${order.orderID}`).style.border = "none";
//         document.getElementById(`carType${order.orderID}`).readOnly = true;
//         document.getElementById(`carType${order.orderID}`).style.border = "none";
//         document.getElementById(`carNumber${order.orderID}`).readOnly = true;
//         document.getElementById(`carNumber${order.orderID}`).style.border = "none";
//         document.getElementById(`endLocation${order.orderID}`).readOnly = true;
//         document.getElementById(`endLocation${order.orderID}`).style.border = "none";
//         document.getElementById(`startLocation${order.orderID}`).readOnly = true;
//         document.getElementById(`startLocation${order.orderID}`).style.border = "none";
//         document.getElementById(`shipper${order.orderID}`).readOnly = true;
//         document.getElementById(`shipper${order.orderID}`).style.border = "none";
//     }
// }