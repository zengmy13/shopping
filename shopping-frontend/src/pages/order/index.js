import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getorder, updatedeliver, updatepaypal} from "./store/actioncreators";
import {PayPalButton} from "react-paypal-button-v2";
import axios from 'axios';
import {ORDER_RESET} from "./store/actiontype";
import Loadingpage from "../loading";

export default function Order(props) {
    const dispatch = useDispatch();
    const {id} = props.match.params;
    const {currentuser} = useSelector(state => state.login)
    const {orderdetail, paypal, paypalloading, paypalerror, deliversuccess, deliverloading, delivererror} = useSelector(state => state.finalorder);
    const [sdk, setsdk] = useState("false")


    useEffect(() => {
        if (!currentuser) {
            props.history.push("/login");
            return;
        }
        const createpaypal = async () => {
            const clientid = await axios.get("/config/pay");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientid.data}`;
            script.onload = function () {
                setsdk(true)
            }
            document.body.appendChild(script);
        }
        if (!orderdetail || paypal || orderdetail._id !== id || deliversuccess) {
            dispatch({
                type: ORDER_RESET
            })
            dispatch(getorder(id))
        } else {
            if (!orderdetail?.ispaid) {
                if (!window.paypal) {
                    createpaypal()
                } else {
                    setsdk(true)
                }
            }
        }

    }, [dispatch, id, orderdetail, paypal, deliversuccess, currentuser])
    const handlesuccesspay = (paymentresult) => {
        dispatch(updatepaypal(id, paymentresult))
    }
    const handlechangetodeliver = () => {
        dispatch(updatedeliver(id))
    }
    return (
        <Container>
              <h6>ORDER {orderdetail?._id}</h6>
            <Row className='my-4'>
                <Col md={7}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>SHIPPING</h3>
                            <p>
                                Name:{orderdetail?.user?.name}
                            </p>
                            <p>
                                Email:{orderdetail?.user?.email}
                            </p>
                            <p>
                                Address:{orderdetail?.shippingaddress.address + ","}
                                {orderdetail?.shippingaddress.city + ","}
                                {orderdetail?.shippingaddress.postcode + ","}
                                {orderdetail?.shippingaddress.country}
                            </p>
                            {orderdetail?.deliver
                                ?
                                <Alert variant='success' className='mb-0'>Delivered on {orderdetail?.deliverat}</Alert>
                                : <Alert variant='danger' className='mb-0'>Not Delivered</Alert>
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>PAYMENT METHOD</h3>
                            <p>Method: {orderdetail?.paymentmethod}</p>
                            {orderdetail?.ispaid
                                ? <Alert variant='success' className='mb-0'>Paid on {orderdetail?.paidat}</Alert>
                                : <Alert variant='danger' className='mb-0'>Not Paid</Alert>
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>ORDER ITEMS</h3>
                            <ListGroup variant='flush'>
                                {
                                    orderdetail?.orderitems.map((item, index) => {
                                        return <ListGroup.Item>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} fluid></Image>
                                                </Col>
                                                <Col md={7}>
                                                    {item.name}
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty}×${(item.price).toFixed(2)}=${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    })
                                }
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={5} >
                    <ListGroup>
                        <ListGroup.Item className='text-center'>
                            <h5>ORDER SUMMARY</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Items
                                </Col>
                                <Col width={6}>
                                    ${orderdetail?.itemsprice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Shipping
                                </Col>
                                <Col width={6}>
                                    ${orderdetail?.shippingprice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Tax
                                </Col>
                                <Col width={6}>
                                    ${orderdetail?.taxprice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Total
                                </Col>
                                <Col width={6}>
                                    ${orderdetail?.totalprice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {paypalloading ? <Loadingpage/> : paypalerror ? <Alert variant='danger'>{paypalerror}</Alert> :
                            !orderdetail?.ispaid &&
                            <>
                                <ListGroup.Item>
                                    <PayPalButton className='paypalbuttons'
                                                  amount={orderdetail?.totalprice}
                                                  onSuccess={handlesuccesspay}>
                                    </PayPalButton>
                                </ListGroup.Item>
                            </>
                        }
                        {deliverloading ? <Loadingpage/> : delivererror ?
                            <Alert variant='danger'>{delivererror}</Alert> :
                            !orderdetail?.deliver && currentuser?.isAdmin &&
                            <>
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' variant='dark' bg='dark'
                                            onClick={handlechangetodeliver}>
                                        MARK AS DELIVERED
                                    </Button>
                                </ListGroup.Item>
                            </>
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}