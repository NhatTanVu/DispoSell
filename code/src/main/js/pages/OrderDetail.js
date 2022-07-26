import React, {useState, useEffect} from "react";
import localStyles from "../../scss/pages/OrderDetail.module.scss";
import {Button, Card, Table} from "react-bootstrap";

function OrderDetail() {

    return (
        <div className={localStyles["order-detail-page"]}>
            <h2 className={localStyles["orderID"]}>Order ID: 334912</h2>
            <Button className={localStyles["btn-track-order"]} variant="outline-primary" size="sm">Track Order</Button>
            <div className={localStyles["order-date"]}>Order Date: July 16, 2022</div>
            <div className={localStyles["content"]}>
                <div className={localStyles["list-product"]}>
                    <Card style={{marginTop:"20px",backgroundColor:"#F8F8FA",borderRadius:"15px"}}>
                        <Card.Header className={localStyles["card-header-class"]} as="h3">Customer's Cart</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Table responsive="sm">
                                    <tbody>
                                    <tr>
                                        <td><img src="/images/products/4.jpeg" alt="White side table" loading="lazy"/>
                                        </td>
                                        <td>White Side Table 1</td>
                                        <td>Qty: 2</td>
                                        <td>$60</td>
                                    </tr>
                                    <tr>
                                        <td><img src="/images/products/1.jpeg" alt="Light Gray Lounge Sofa"
                                                 loading="lazy"/></td>
                                        <td>Light Gray Lounge Sofa</td>
                                        <td>Qty: 1</td>
                                        <td>$99.9</td>
                                    </tr>
                                    <tr>
                                        <td><img src="/images/products/3.jpeg" alt="Thin White Bed Frame"
                                                 loading="lazy"/></td>
                                        <td>Thin White Bed Frame</td>
                                        <td>Qty: 1</td>
                                        <td>$100.99</td>
                                    </tr>
                                    <tr style={{fontWeight:"bold", fontSize:"1.2rem"}}>
                                        <td>Total</td>
                                        <td></td>
                                        <td></td>
                                        <td>$1000</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className={localStyles["user-info"]}>
                    <Card style={{marginTop:"20px",backgroundColor:"#F8F8FA",borderRadius:"15px"}}>
                        <Card.Header className={localStyles["card-header-class"]} as="h3">Customer</Card.Header>
                        <Card.Body>
                            <Card.Title>Tuyet Khang Truong</Card.Title>
                            <Card.Text>
                                <Table responsive="sm">
                                    <tbody>
                                    <tr>
                                        <td> <b> Email</b> <br/>khang@gmail.com</td>
                                    </tr>
                                    <tr>
                                        <td><b> Phone Number</b><br/> 604 888 1234</td>
                                    </tr>
                                    <tr>
                                        <td><b> Shipping Address</b> <br/>1234 Vitoria Drive, Vancouver, BC, Canada V6Y 2V2</td>
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