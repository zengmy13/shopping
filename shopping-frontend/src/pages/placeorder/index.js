import React from 'react';
import Checkout from "../../components/checksteps";
import {Button, Col, Container, Image, Row, ListGroup, Alert} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "./store/actioncreator";
import LoadingPage from "../loading";


export default function PlaceOrder(props) {
    const dispatch = useDispatch();
    const {shippingAddress} = useSelector(state => state.address);
    const {paymentMethod} = useSelector(state => state.payment);
    const {cartItems} = useSelector(state => state.cart);
    const {currentUser} = useSelector(state => state.login)

    const {order, orderLoading, orderError, successOrder} = useSelector(state => state.order)
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    const shippingPrice = (itemsPrice > 100 ? 0 : 100).toFixed(2);
    const taxPrice = Number((itemsPrice * 0.15).toFixed(2));
    const totalPrice = (Number(taxPrice) + Number(shippingPrice) + Number(itemsPrice)).toFixed(2);
    const orderItems = cartItems.map((item, index) => {
        return {
            name: item.name,
            image: item.image,
            price: item.price,
            qty: item.qty,
            productId: item._id
        }
    })
    if (!currentUser) {
        props.history.push("/login")
    }
    if (successOrder) {
        props.history.push(`/order/${order._id}`)
    }
    const handleSubmit = () => {
        const order = {
            itemsPrice, shippingPrice, taxPrice, totalPrice, shippingAddress, paymentMethod, orderItems
        }
        dispatch(createOrder(order));
    }
    return (
        <Container>
            <Checkout step1 step2 step3 step4/>
            <Row className='my-4'>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>SHIPPING</h3>
                            <p className='mb-0'>Address: {shippingAddress.address + ","}
                                {shippingAddress.city + ","}
                                {shippingAddress.postcode + ","}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>PAYMENT METHOD</h3>
                            <p className='mb-0'>Method: {paymentMethod}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>ORDER ITEMS</h3>
                            <ListGroup variant='flush'>
                                {
                                    cartItems.map((item, index) => {
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
                                    ${itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Shipping
                                </Col>
                                <Col width={6}>
                                    ${shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Tax
                                </Col>
                                <Col width={6}>
                                    ${taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col width={6}>
                                    Total
                                </Col>
                                <Col width={6}>
                                    ${totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {
                            orderError ? <ListGroup.Item>
                                <Alert variant='danger'>{orderError}</Alert>
                            </ListGroup.Item> : null
                        }
                        {
                            orderLoading ? <LoadingPage/> : null
                        }
                        <ListGroup.Item>
                            <Button bg='dark' className='btn btn-block' variant='dark'
                                    disabled={cartItems.length === 0}
                                    onClick={handleSubmit}>
                                PLACE ORDER
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}