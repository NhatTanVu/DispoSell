import React, {useState, useEffect} from "react";
import localStyles from "../../scss/pages/OrderDetail.module.scss";
import {Button, Card, Table} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import OrderService from "../services/order.service";
import moment from 'moment';

function OrderDetail() {
    let {id} = useParams();
    const [orderDetail, setOrderDetail] = useState({});
    // const [orderDate, setOrderDate]=useState("");

    const params = useParams();
    const navigate = useNavigate();

    // var moment = require('moment');
    // var a = moment().toString();
    // console.log(a);

    useEffect(() => {
        console.log(params.id);
        OrderService.getOnePurchaseOrder(params.id).then(
            response => {
                console.log(response.data);
                setOrderDetail(response.data);
                // setOrderDate(response.data.orderedDate);
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

    return (
        <div className={localStyles["order-detail-page"]}>
            <h2 className={localStyles["orderID"]}>Order ID: {orderDetail.orderID}</h2>
            <Button className={localStyles["btn-track-order"]} variant="outline-primary" size="sm"
                    href="https://track-delivery-demo.herokuapp.com/">Track Order</Button>
            <div className={localStyles["order-date"]}>Order Date: {moment(orderDetail.orderedDate).format("MMMM d, YYYY")}</div>
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
                                            <td><img src={`${detail.product.productMedia.find(media => media.isDefault == true)?.url}`} alt={detail.product.name}
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