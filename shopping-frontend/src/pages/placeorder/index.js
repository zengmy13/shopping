import React from 'react';
import Checkout from "../../components/checksteps";
import {Button, Col, Container, Image, Row, ListGroup, Alert} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createorder} from "./store/actioncreator";
import Loadingpage from "../loading";


export default function Placeorder(props) {
    const dispatch = useDispatch();
    const {shippingaddress} = useSelector(state => state.address);
    const {paymentmethod} = useSelector(state => state.payment);
    const {cartitems} = useSelector(state => state.cart);
    const {currentuser} = useSelector(state => state.login)

    const {order, orderloading, ordererror, successorder} = useSelector(state => state.order)
    const itemsprice = cartitems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    const shippingprice = (itemsprice > 100 ? 0 : 100).toFixed(2);
    const taxprice = Number((itemsprice * 0.15).toFixed(2));
    const totalprice = (Number(taxprice) + Number(shippingprice) + Number(itemsprice)).toFixed(2);
    const orderitems = cartitems.map((item, index) => {
        return {
            name: item.name,
            image: item.image,
            price: item.price,
            qty: item.qty,
            productid: item._id
        }
    })
    if (!currentuser) {
        props.history.push("/login")
    }
    if (successorder) {
        props.history.push(`/order/${order._id}`)
    }
    const handlesubmit = () => {
        const order = {
            itemsprice, shippingprice, taxprice, totalprice, shippingaddress, paymentmethod, orderitems
        }
        dispatch(createorder(order));
    }
    return (
        <Container>
            <Checkout step1 step2 step3 step4/>
            <Row className='my-4'>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>SHIPPING</h3>
                            <p className='mb-0'>Address: {shippingaddress.address + ","}
                                {shippingaddress.city + ","}
                                {shippingaddress.postcode + ","}
                                {shippingaddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>PAYMENT METHOD</h3>
                            <p className='mb-0'>Method: {paymentmethod}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>ORDER ITEMS</h3>
                            <ListGroup variant='flush'>
                                {
                                    cartitems.map((item, index) => {
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
                <Col md={4}>
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
                                    ${itemsprice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Shipping
                                </Col>
                                <Col width={6}>
                                    ${shippingprice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Tax
                                </Col>
                                <Col width={6}>
                                    ${taxprice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Total
                                </Col>
                                <Col width={6}>
                                    ${totalprice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {
                            ordererror ? <ListGroup.Item>
                                <Alert variant='danger'>{ordererror}</Alert>
                            </ListGroup.Item> : null
                        }
                        {
                            orderloading ? <Loadingpage/> : null
                        }
                        <ListGroup.Item>
                            <Button bg='dark' className='btn btn-block' variant='dark'
                                    disabled={cartitems.length === 0}
                                    onClick={handlesubmit}>
                                PLACE ORDER
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}