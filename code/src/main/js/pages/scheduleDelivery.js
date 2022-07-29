import React, {useState, useEffect} from "react";
import localStyles from "../../scss/pages/OrderDetail.module.scss";
import {Button, Card, Table} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import OrderService from "../services/order.service";
import DeliveryService from "../services/delivery.service";

function ScheduleDelivery() {
    let {id} = useParams();
    const params = useParams();
    const navigate = useNavigate();
    const [orderDetail, setOrderDetail] = useState({});
    const [shippers, setShippers] = useState([]);
    //let shippers = [];
    const [carType, setCarType] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [endTime, setEndTime] = useState('');
    const [startTime, setStartTime] = useState('');


    useEffect(() => {
        console.log(params.id);

        DeliveryService.getShippers().then(
            response => {
                console.log(response.data);
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


    function addShippers(e) {
        e.preventDefault()
        let boxvalue;
        boxvalue = document.getElementById('shippersInput').value;
        shippers.push(boxvalue);
        console.log(shippers);
        return false; // stop submission
    }


    function saveDeliveryInfo(e) {
        e.preventDefault();

        if ((shippers || deliveryDate || carNumber || carType || startLocation || endLocation || endTime || startTime) !== '') {
            const addressRegex = /^(\d{1,5}) ([^,]+), ([^,]+), ([A-Z]{2}), ([A-Za-z]\d[A-Za-z][ -]?\d[A-Z]\d)$/;
            if (addressRegex.test(endLocation)) {
                DeliveryService.createScheduleDelivery(params.id,
                    carNumber,
                    carType,
                    startTime,
                    endTime,
                    startLocation,
                    endLocation,
                    shippers).then(
                    (value) => {
                        alert(JSON.stringify(params.id));
                        alert(JSON.stringify(endLocation));
                        alert(JSON.stringify(startLocation));
                    },
                    (reason) => {
                        const resMessage =
                            (reason.response &&
                                reason.response.data &&
                                reason.response.data.message) ||
                            reason.message ||
                            reason.toString();
                        alert("Error when purchasing products");
                        console.log(resMessage);
                    });
            } else {
                alert("Suggested format: \n123 Street St, Vancouver, BC, X1X 2X3\n" +
                    "1234 Street St Unit 123, Vancouver, BC, X1X 2X3\n" +
                    "1234 Street St #123, Vancouver, BC, X1X 2X3\n" +
                    "1234 Street St Building ABC, Vancouver, BC, X1X 2X3\n" +
                    "12345 Street St Building ABC #123, Vancouver, BC, X1X 2X3");
            }
        } else {
            alert("Please fill in the required fields.")
        }
    }

    const onDateChange = (e) => {
        setDeliveryDate(e.target.value);
    }

    const onCarTypeChange = (e) => {
        setCarType(e.target.value);
    }

    const onCarNumberChange = (e) => {
        setCarNumber(e.target.value);
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

    return (
        <div className={localStyles["order-detail-page"]}>
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
                                        <td><b>Delivery Date</b>
                                            <br/><input type="date"
                                                        className="form-control"
                                                        id={`deliveryDate${orderDetail.orderID}`}
                                                        onChange={onDateChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Shipper(s)</b>
                                            <br/>
                                            <form onSubmit={addShippers}>
                                                <input type="text" id="shippersInput"/>
                                                <input type="submit" value="Submit"/>
                                            </form>
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
                                            <br/><input
                                                type="text"
                                                className="form-control"
                                                id={`carType${orderDetail.orderID}`}
                                                placeholder={'Required'}
                                                style={{border: "none"}}
                                                onChange={onCarTypeChange}
                                                maxLength={10}

                                            /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Start Location</b>
                                            <br/><input type='text'
                                                        defaultValue={'Warehouse'}
                                                        className="form-control"
                                                        id={`startLocation${orderDetail.orderID}`}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        onChange={onStartLocationChange}
                                                        maxLength={100}
                                            /></td>
                                    </tr>
                                    <tr>
                                        <td><b>End Location/Shipping Address</b>
                                            <br/><input type='text'
                                                        defaultValue={orderDetail.address}
                                                        className="form-control"
                                                        id={`startLocation${orderDetail.orderID}`}
                                                        placeholder={'Required'}
                                                        style={{border: "none"}}
                                                        onChange={onEndLocationChange}
                                                        maxLength={100}
                                            /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Start Time</b>
                                            <br/>
                                            <input type="time"
                                                   className="form-control"
                                                   id={`startTime${orderDetail.orderID}`}
                                                   placeholder={'Required'}
                                                   style={{border: "none"}}
                                                   onChange={onStartTimeChange}
                                                   maxLength={10}
                                            /></td>
                                    </tr>
                                    <tr>
                                        <td><b>End Time</b>
                                            <br/>
                                            <input type="time"
                                                   className="form-control"
                                                   id={`endTime${orderDetail.orderID}`}
                                                   placeholder={'Required'}
                                                   style={{border: "none"}}
                                                   onChange={onEndTimeChange}
                                                   maxLength={10}
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
                            >Save
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
        </div>
    )
}

export default ScheduleDelivery;