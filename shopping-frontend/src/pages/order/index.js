import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getOrder, updateDeliver, updatePaypal} from "./store/actioncreators";
import {PayPalButton} from "react-paypal-button-v2";
import axios from 'axios';
import {ORDER_RESET} from "./store/actiontype";
import LoadingPage from "../loading";

export default function Order(props) {
    const dispatch = useDispatch();
    const {id} = props.match.params;
    const {currentUser} = useSelector(state => state.login)
    const {orderDetail, paypal, paypalLoading, paypalError, deliverSuccess, deliverLoading, deliverError} = useSelector(state => state.finalOrder);
    const [sdk, setsdk] = useState("false")


    useEffect(() => {
        if (!currentUser) {
            props.history.push("/login");
            return;
        }
        const createPaypal = async () => {
            const clientId = await axios.get("/config/pay");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId.data}`;
            script.onload = function () {
                setsdk(true)
            }
            document.body.appendChild(script);
        }
        if (!orderDetail || paypal || orderDetail._id !== id || deliverSuccess) {
            dispatch({
                type: ORDER_RESET
            })
            dispatch(getOrder(id))
        } else {
            if (!orderDetail?.ispaid) {
                if (!window.paypal) {
                    createPaypal()
                } else {
                    setsdk(true)
                }
            }
        }

    }, [dispatch, id, orderDetail, paypal, deliverSuccess, currentUser])
    const handleSuccessPay = (paymentresult) => {
        dispatch(updatePaypal(id, paymentresult))
    }
    const handleChangeToDeliver = () => {
        dispatch(updateDeliver(id))
    }
    return (
        <Container>
              <h6>ORDER {orderDetail?._id}</h6>
            <Row className='my-4'>
                <Col md={7}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>SHIPPING</h3>
                            <p>
                                Name:{orderDetail?.user?.name}
                            </p>
                            <p>
                                Email:{orderDetail?.user?.email}
                            </p>
                            <p>
                                Address:{orderDetail?.shippingAddress.address + ","}
                                {orderDetail?.shippingAddress.city + ","}
                                {orderDetail?.shippingAddress.postcode + ","}
                                {orderDetail?.shippingAddress.country}
                            </p>
                            {orderDetail?.deliver
                                ?
                                <Alert variant='success' className='mb-0'>Delivered on {orderDetail?.deliverat}</Alert>
                                : <Alert variant='danger' className='mb-0'>Not Delivered</Alert>
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>PAYMENT METHOD</h3>
                            <p>Method: {orderDetail?.paymentMethod}</p>
                            {orderDetail?.ispaid
                                ? <Alert variant='success' className='mb-0'>Paid on {orderDetail?.paidat}</Alert>
                                : <Alert variant='danger' className='mb-0'>Not Paid</Alert>
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>ORDER ITEMS</h3>
                            <ListGroup variant='flush'>
                                {
                                    orderDetail?.orderItems.map((item, index) => {
                                        return <ListGroup.Item>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} fluid/>
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
                                    ${orderDetail?.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Shipping
                                </Col>
                                <Col width={6}>
                                    ${orderDetail?.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Tax
                                </Col>
                                <Col width={6}>
                                    ${orderDetail?.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Total
                                </Col>
                                <Col width={6}>
                                    ${orderDetail?.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {paypalLoading ? <LoadingPage/> : paypalError ? <Alert variant='danger'>{paypalError}</Alert> :
                            !orderDetail?.ispaid &&
                            <>
                                <ListGroup.Item>
                                    <PayPalButton className='paypalbuttons'
                                                  amount={orderDetail?.totalPrice}
                                                  onSuccess={handleSuccessPay}>
                                    </PayPalButton>
                                </ListGroup.Item>
                            </>
                        }
                        {deliverLoading ? <LoadingPage/> : deliverError ?
                            <Alert variant='danger'>{deliverError}</Alert> :
                            !orderDetail?.deliver && currentUser?.isAdmin &&
                            <>
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' variant='dark' bg='dark'
                                            onClick={handleChangeToDeliver}>
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