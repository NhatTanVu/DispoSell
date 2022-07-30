import React, {useState, useEffect} from "react";
import localStyles from "../../scss/pages/OrderDetail.module.scss";
import {Button, Card, Table} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import OrderService from "../services/order.service";
import DeliveryService from "../services/delivery.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

let shippersToGo = [];

function ScheduleDelivery() {
    let {id} = useParams();
    const params = useParams();
    const navigate = useNavigate();
    const [orderDetail, setOrderDetail] = useState({});
    const [shippers, setShippers] = useState([]);
    // const [carType, setCarType] = useState('');
    let carType = '';
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [carNumber, setCarNumber] = useState('');
    //const [startLocation, setStartLocation] = useState('');
    //const [endLocation, setEndLocation] = useState('');
    let endLocation = '';
    let startLocation = '';
    const [endTime, setEndTime] = useState('');
    const [startTime, setStartTime] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        console.log(params.id);

        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            EventBus.dispatch("logout");
        } else {
            setIsUser(currentUser.roles.includes("ROLE_USER"));
            setIsAdmin(currentUser.roles.includes("ROLE_ADMINISTRATOR"));
        }

        DeliveryService.getShippers().then(
            response => {
                console.log(response.data);
                setShippers(response.data);
            },
            error => {
                console.log(
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
        )

        OrderService.getOnePurchaseOrder(params.id).then(
            response => {
                console.log(response.data);
                setOrderDetail(response.data);
            },
            error => {
                setOrderDetail(
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

    // function addShippers(e) {
    //     e.preventDefault()
    //     let value;
    //     value = document.getElementById('shippersInput').value;
    //     shippers.push(Number(value));
    //     console.log(shippers);
    //     return false; // stop submission
    // }

    function saveDeliveryInfo(e) {
        e.preventDefault();

        startLocation = 'Warehouse';
        endLocation = orderDetail.address;
        carType = document.getElementById(`vehicleSelected`).value;

        if ((shippersToGo || carNumber || carType || startLocation || endLocation || endTime || startTime) !== '') {
            DeliveryService.createScheduleDelivery(Number(orderDetail.orderID), shippersToGo, startLocation, endLocation, startTime, endTime, carNumber, carType).then(
                () => {
                    alert('Successfully Scheduled')
                    navigate("/profile");
                },
                (reason) => {
                    const resMessage =
                        (reason.response &&
                            reason.response.data &&
                            reason.response.data.message) ||
                        reason.message ||
                        reason.toString();
                    alert("Error");
                    console.log(resMessage);
                });
            // const addressRegex = /^(\d{1,5}) ([^,]+), ([^,]+), ([A-Z]{2}), ([A-Za-z]\d[A-Za-z][ -]?\d[A-Z]\d)$/;
            // if (addressRegex.test(endLocation)) {
            //
            // } else {
            //     alert("Suggested format: \n123 Street St, Vancouver, BC, X1X 2X3\n" +
            //         "1234 Street St Unit 123, Vancouver, BC, X1X 2X3\n" +
            //         "1234 Street St #123, Vancouver, BC, X1X 2X3\n" +
            //         "1234 Street St Building ABC, Vancouver, BC, X1X 2X3\n" +
            //         "12345 Street St Building ABC #123, Vancouver, BC, X1X 2X3");
            // }
        } else {
            alert("Please fill in the required fields.")
        }
    }

    // const onCarTypeChange = (e) => {
    //     setCarType(e.target.value);
    // }

    const onCarNumberChange = (e) => {
        setCarNumber(e.target.value);
    }

    const onEndTimeChange = (e) => {
        setEndTime(e.target.value);
    }

    const onStartTimeChange = (e) => {
        setStartTime(e.target.value);
    }

    // const onEndLocationChange = (e) => {
    //     setEndLocation(e.target.value);
    // }

    // const onStartLocationChange = (e) => {
    //     setStartLocation(e.target.value);
    // }

    function addShippers(e) {
        e.preventDefault()
        if(shippersToGo.includes(Number(document.getElementById(`shipperUsernameSelected`).value))){
            document.getElementById(`currentShippers`).innerText = '\nYou have selected this shipper\n' + 'Current shipper id(s): ' + shippersToGo;
        } else{
            shippersToGo.push(Number(document.getElementById(`shipperUsernameSelected`).value));
            console.log(shippersToGo);
            document.getElementById(`currentShippers`).innerText = '\nCurrent shipper id(s): ' + shippersToGo;
            return false; // stop submission
        }
    }

    function addVehicle(e) {
        e.preventDefault();
        carType = document.getElementById(`vehicleSelected`).value;
        console.log(carType);
        document.getElementById(`currentCar`).innerText = '\nChosen vehicle type: ' + carType;
        return false; // stop submission
    }

    return (
        <div className={localStyles["order-detail-page"]}>
            {(isAdmin) ?
                <>
                    <h2 className={localStyles["orderID"]}>Schedule Delivery for order #{orderDetail.orderID}</h2>
                    <div className={localStyles["order-date"]} style={{marginTop: "1rem"}}>Order
                        Date: {orderDetail.orderedDate}</div>
                    <div className={localStyles["content"]}>
                        <div className={localStyles["list-product"]}>
                            <Card style={{marginTop: "20px", backgroundColor: "#F8F8FA", borderRadius: "15px"}}>
                                <Card.Header className={localStyles["card-header-class"]} as="h3">Delivery
                                    Information</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <Table responsive="sm">
                                            <tbody>
                                            <tr>
                                                <td><b>Shipper(s)</b>
                                                    <br/>
                                                    {/*<form onSubmit={addShippers}>*/}
                                                    {/*    <input type="text" id="shippersInput"/>*/}
                                                    {/*    <input type="submit" value="Submit"/>*/}
                                                    {/*</form>*/}
                                                    <select id='shipperUsernameSelected'
                                                            className='form-control'>
                                                        {shippers.map((shipper) => (
                                                            <option value={shipper.id}>{shipper.username}</option>
                                                        ))}
                                                    </select>
                                                    <button className={`btn ${localStyles['btnProfile']}`}
                                                            id={`editBtn`}
                                                            style={{cursor: "pointer"}}
                                                            onClick={(e) => {
                                                                addShippers(e)
                                                            }}
                                                    >Add Shipper
                                                    </button>
                                                    <h6 id='currentShippers'></h6>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><b>Vehicle Number</b>
                                                    <br/>
                                                    <input type="text"
                                                           className="form-control"
                                                           id={`carNumber${orderDetail.orderID}`}
                                                           placeholder={'AB1 23C'}
                                                           style={{border: "none"}}
                                                           onChange={onCarNumberChange}
                                                           maxLength={10}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><b>Vehicle Type</b>
                                                    <br/>
                                                    {/*<input*/}
                                                    {/*    type="text"*/}
                                                    {/*    className="form-control"*/}
                                                    {/*    id={`carType${orderDetail.orderID}`}*/}
                                                    {/*    placeholder={'Required'}*/}
                                                    {/*    style={{border: "none"}}*/}
                                                    {/*    onChange={onCarTypeChange}*/}
                                                    {/*    maxLength={10}*/}
                                                    {/*/>*/}
                                                    <select id='vehicleSelected' className='form-control'>
                                                        <option value={'Van'}>Van</option>
                                                        <option value={'Truck'}>Truck</option>
                                                    </select>
                                                    <button className={`btn ${localStyles['btnProfile']}`}
                                                            id={`editBtn`}
                                                            style={{cursor: "pointer"}}
                                                            onClick={(e) => {
                                                                addVehicle(e)
                                                            }}
                                                    >Submit
                                                    </button>
                                                    <h6 id='currentCar'></h6>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><b>Start Location</b>
                                                    <br/><input type='text'
                                                                defaultValue={'Warehouse'}
                                                                className="form-control"
                                                                id={`startLocation${orderDetail.orderID}`}
                                                                placeholder={'Required'}
                                                                style={{border: "none"}}
                                                                //onChange={onStartLocationChange}
                                                                maxLength={100}
                                                                readOnly
                                                    /></td>
                                            </tr>
                                            <tr>
                                                <td><b>End Location/Shipping Address</b>
                                                    <br/><input type='text'
                                                                value={orderDetail.address}
                                                                className="form-control"
                                                                id={`startLocation${orderDetail.orderID}`}
                                                                placeholder={'Required'}
                                                                style={{border: "none"}}
                                                                //onChange={onEndLocationChange}
                                                                maxLength={100}
                                                                readOnly
                                                    /></td>
                                            </tr>
                                            <tr>
                                                <td><b>Start Time</b>
                                                    <br/>
                                                    <input type="datetime-local"
                                                           step='1'
                                                           className="form-control"
                                                           id={`startTime${orderDetail.orderID}`}
                                                           placeholder={'Required'}
                                                           style={{border: "none"}}
                                                           onChange={onStartTimeChange}
                                                    /></td>
                                            </tr>
                                            <tr>
                                                <td><b>End Time</b>
                                                    <br/>
                                                    <input type="datetime-local"
                                                           className="form-control"
                                                           step='1'
                                                           id={`endTime${orderDetail.orderID}`}
                                                           placeholder={'Required'}
                                                           style={{border: "none"}}
                                                           onChange={onEndTimeChange}
                                                    /></td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Text>
                                    <button className={`btn ${localStyles['btnProfile']}`}
                                            id={`editBtn`}
                                            style={{cursor: "pointer"}}
                                            onClick={(e) => {
                                                saveDeliveryInfo(e)
                                            }}
                                    >Schedule
                                    </button>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className={localStyles["user-info"]}>
                            <Card style={{marginTop: "20px", backgroundColor: "#F8F8FA", borderRadius: "15px"}}>
                                <Card.Header className={localStyles["card-header-class"]} as="h3">Customer
                                    Information</Card.Header>
                                <Card.Body>
                                    <Card.Title>{orderDetail.firstName} {orderDetail.lastName}</Card.Title>
                                    <Card.Text>
                                        <Table responsive="sm">
                                            <tbody>
                                            <tr>
                                                <td><b>Email</b> <br/>{orderDetail.email}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Phone Number</b><br/>{orderDetail.contactNumber}</td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </>
                : <>{(isUser) ?
                    <>
                        <h1>user</h1>
                    </>
                    : null}</>
            }
        </div>
    )
}

export default ScheduleDelivery;