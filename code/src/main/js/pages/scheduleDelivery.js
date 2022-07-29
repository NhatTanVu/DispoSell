import React, {useState, useEffect} from "react";
import localStyles from "../../scss/pages/OrderDetail.module.scss";
import {Button, Card, Table} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import OrderService from "../services/order.service";
import DeliveryService from "../services/delivery.service";
import {clearCart, setUserInfo} from "../redux/cartSlice";
import store from "../redux/store";

function ScheduleDelivery() {
    let {id} = useParams();
    const [orderDetail, setOrderDetail] = useState({});
    const [shippers, setShippers] = useState({});
    const [carType, setCarType] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(params.id);

        DeliveryService.getShippers().then(
            response => {
                console.log(response.data);
                setShippers(response.data);
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

    function saveDeliveryInfo(e) {
        const deliveryInfo =
            {
                "orderID": params.id,
                "vehicleNumber": "12345",
                "vehicleType": "van",
                "startTime": "2022-07-26T10:54:00-07:00",
                "endTime": "2022-07-26T15:54:00-07:00",
                "startLocation": "from somewhere",
                "endLocation": "to somewhere",
                "shippers": [3]
            }
        DeliveryService.createScheduleDelivery(deliveryInfo).then(
            (value) => {
                alert(JSON.stringify(deliveryInfo));
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
    }

    const onCarTypeChange = (e) => {
        setCarType(e.target.value);
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
                                        <td><b>Shipping Address</b>
                                            <br/>
                                            {orderDetail.address}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Delivery Date</b>
                                            <br/><input type="date" defaultValue=""/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Shipper(s)</b>
                                            <br/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Vehicle Number</b>
                                            <br/>
                                            <input type='text'/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Vehicle Type</b>
                                            <br/><input
                                                type="text"
                                                className="form-control"
                                                id={`carType${orderDetail.orderID}`}
                                                placeholder={'Required'}
                                                style={{border: "none", backgroundColor: "transparent"}}
                                                onChange={onCarTypeChange}
                                                maxLength={10}
                                                readOnly
                                            /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Start Location</b>
                                            <br/>{orderDetail.contactNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><b>End Location</b>
                                            <br/>{orderDetail.contactNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Start Time</b>
                                            <br/>
                                            <input type="time" required/></td>
                                    </tr>
                                    <tr>
                                        <td><b>End Time</b>
                                            <br/>
                                            <input type="time" required/></td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Text>
                            <button className={`btn ${localStyles['btnProfile']}`}
                                    id={`editBtn`}
                                    style={{cursor: "pointer"}}
                            >Edit
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
                                        <td><b> Email</b> <br/>{orderDetail.email}</td>
                                    </tr>
                                    <tr>
                                        <td><b> Phone Number</b><br/>{orderDetail.contactNumber}</td>
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