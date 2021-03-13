import React, {useEffect} from 'react';
import {Row, Col, ListGroup, Button, Image, Form, Alert} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {addtocart, removeitems} from "./store/actioncreator";
import {Link} from 'react-router-dom';

export default function Cart(props) {
    const dispatch = useDispatch();
    const {id} = props.match.params;
    const qty = props.location.search.includes("?") ? props.location.search.split("=")[1] : null
    const {cartitems} = useSelector(state => state.cart);

    const handletoshipping = () => {
        props.history.push('/shipping')
    }
    const removeitem = (id) => {
        dispatch(removeitems(id))
    }
    useEffect(() => {
        dispatch(addtocart(id, qty))
    }, [dispatch, id, qty])
    return (
        <>
            <h2 className='my-5'>CART</h2>
            <Row>
                <Col lg={8}>
                    {cartitems.length > 0 ? cartitems.map((product, index) => {
                            return <>
                                <Row className='my-3' key={product._id}>
                                    <Col md={2}>
                                        <Image src={product.image} fluid></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${product._id}`}>
                                            {product.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>${product.price}</Col>
                                    <Col md={3}>
                                        <Form.Control as='select' value={product.qty}
                                                      onChange={(e) =>
                                                          dispatch(addtocart(product._id, Number(e.target.value)))}>
                                            {
                                                [...Array(product.countInStock).keys()].map((item, index) => {
                                                    return <option value={item + 1} key={item + 1}>
                                                        {item + 1}
                                                    </option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <i className='fas fa-trash'
                                           onClick={() => removeitem(product._id)}></i>
                                    </Col>
                                </Row>
                            </>
                        }) : <Alert variant='info'>YOUR CART IS EMPTY</Alert>
                    }
                </Col>
                <Col lg={4}>
                    <ListGroup>
                        <ListGroup.Item className='text-center'>
                            <h3>
                                SUBTOTAL({cartitems.reduce((total, item) => Number(item.qty) + total, 0)})ITEMS
                            </h3>
                            ${cartitems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn-block' variant='dark' bg='dark'
                                    disabled={cartitems.length === 0}
                                    onClick={handletoshipping}>
                                PROCEED TO CHECKOUT
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}