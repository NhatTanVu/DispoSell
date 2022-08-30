import React, {useState, useEffect, useRef} from "react";
import localStyles from "../../scss/pages/OrderDetail.module.scss";
import {Button, Card, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import OrderService from "../services/order.service";
import moment from 'moment';
import TrackingMap from "../components/TrackingMap";
import AuthService from "../services/auth.service";
import DeliveryService from "../services/delivery.service";

function OrderDetail() {
    let {id} = useParams();
    const [orderDetail, setOrderDetail] = useState({});
    // const [orderDate, setOrderDate]=useState("");
    const isShipper = useRef(false);
    const isAdmin = useRef(false);
    const [delivery, setDelivery] = useState({});
    const [startCoordinate, setStartCoordinate] = useState("");
    const [endCoordinate, setEndCoordinate] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    // var moment = require('moment');
    // var a = moment().toString();
    // console.log(a);

    const handleError = (error) => {
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
    const getOrderDetails = (id) => {
        return OrderService.getOnePurchaseOrder(id).then(
            response => {
                console.log(response.data);
                setOrderDetail(response.data);
                return response;
            },
            error => {
                handleError(error);
            }
        );
    };
    const getDelivery = (orderResponse) => {
        if (orderResponse.data?.status?.name === 'ORDER_STATUS_IN_DELIVERY') {
            DeliveryService.getDeliveryByOrderID(params.id).then(deliveryResponse => {
                    console.log(deliveryResponse.data);
                    setDelivery(deliveryResponse.data);
                    setStartCoordinate((deliveryResponse.data.currentLocation != "" && deliveryResponse.data.currentLocation != null)
                        ? deliveryResponse.data.currentLocation
                        : deliveryResponse.data.startLocation);
                    setEndCoordinate(deliveryResponse.data.endLocation);
                },
                error => {
                    handleError(error);
                });
        }
    }

    useEffect(() => {
        console.log(params.id);

        const currentUser = AuthService.getCurrentUser();
        isShipper.current = (currentUser != null) && currentUser.roles.includes("ROLE_SHIPPER");
        isAdmin.current = (currentUser != null) && currentUser.roles.includes("ROLE_ADMINISTRATOR");
        getOrderDetails(params.id).then(getDelivery);
    }, []);

    const startDelivery = (e) => {
        DeliveryService.startDelivery(orderDetail.orderID).then(response => {
                alert("Successfully Started Delivery");
                setOrderDetail(response.data);
            },
            error => {
                handleError(error);
            });
    };

    return (
        <div className={localStyles["order-detail-page"]}>
            <h2 className={localStyles["orderID"]}>Order ID: {orderDetail.orderID}</h2>
            {(isShipper.current || isAdmin.current) && orderDetail?.status?.name === 'ORDER_STATUS_SCHEDULED' &&
                <Button className={localStyles["btn-track-order"]} variant="outline-primary" size="sm"
                        onClick={(e) => startDelivery(e)}>Start Delivery</Button>}
            <div className={localStyles["order-date"]}>Order
                Date: {moment(orderDetail.orderedDate).format("MMM D, YYYY")}</div>
            <div className={localStyles["content"]}>
                <div className={localStyles["list-product"]}>
                    <Card style={{marginTop: "20px", backgroundColor: "#F8F8FA", borderRadius: "15px"}}>
                        <Card.Header className={localStyles["card-header-class"]} as="h3">Customer's Cart</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Table responsive="sm">
                                    <tbody>
                                    {orderDetail.orderDetails?.map((detail, index) => (
                                        <tr>
                                            <td><img
                                                src={`${detail.product.productMedia.find(media => media.isDefault == true)?.url}`}
                                                alt={detail.product.name}
                                                loading="lazy"/>
                                            </td>
                                            <td>{detail.product.name.toUpperCase()}</td>
                                            <td>Qty: {detail.quantity}</td>
                                            <td>${detail.product.sellingPrice}</td>
                                        </tr>
                                    ))}
                                    {/*<tr>*/}
                                    {/*    <td><img src="/images/products/4.jpeg" alt="White side table" loading="lazy"/>*/}
                                    {/*    </td>*/}
                                    {/*    <td>White Side Table 1</td>*/}
                                    {/*    <td>Qty: 2</td>*/}
                                    {/*    <td>$60</td>*/}
                                    {/*</tr>*/}
                                    {/*<tr>*/}
                                    {/*    <td><img src="/images/products/1.jpeg" alt="Light Gray Lounge Sofa"*/}
                                    {/*             loading="lazy"/></td>*/}
                                    {/*    <td>Light Gray Lounge Sofa</td>*/}
                                    {/*    <td>Qty: 1</td>*/}
                                    {/*    <td>$99.9</td>*/}
                                    {/*</tr>*/}
                                    {/*<tr>*/}
                                    {/*    <td><img src="/images/products/3.jpeg" alt="Thin White Bed Frame"*/}
                                    {/*             loading="lazy"/></td>*/}
                                    {/*    <td>Thin White Bed Frame</td>*/}
                                    {/*    <td>Qty: 1</td>*/}
                                    {/*    <td>$100.99</td>*/}
                                    {/*</tr>*/}
                                    <tr style={{fontWeight: "bold", fontSize: "1.2rem"}}>
                                        <td>Total</td>
                                        <td></td>
                                        <td></td>
                                        <td>${orderDetail.paymentAmount}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    {orderDetail?.status?.name === 'ORDER_STATUS_IN_DELIVERY' && <TrackingMap
                        isEditable={isShipper.current || isAdmin.current}
                        startCoordinate={startCoordinate}
                        endCoordinate={endCoordinate}
                        key={startCoordinate + "_" + endCoordinate}
                        deliveryID={delivery.deliveryID}/>}
                </div>
                <div className={localStyles["user-info"]}>
                    <Card style={{marginTop: "20px", backgroundColor: "#F8F8FA", borderRadius: "15px"}}>
                        <Card.Header className={localStyles["card-header-class"]} as="h3">Customer</Card.Header>
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
                                    <tr>
                                        <td><b> Shipping Address</b> <br/>{orderDetail.address}</td>
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

export default OrderDetail;