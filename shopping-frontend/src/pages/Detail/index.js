import React, {useEffect, useState} from 'react';
import {addnewreviews, getproduct} from "./store/actioncreators";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row, Button, ListGroup, Container, Image, Form, Alert} from 'react-bootstrap'
import Rating from "../../components/rating";
import Loadingpage from "../loading";
import {Link} from 'react-router-dom';


export default function Productdetail(props) {
    const {id} = props.match.params;
    const dispatch = useDispatch();
    const {product, productloading, addreviewsuccess, addreviewloading, addreviewerror, producterror} = useSelector(state => state.detail);
    const {currentuser} = useSelector(state => state.login)
    const [qty, setqty] = useState(1);
    const [rating, setrating] = useState("5");
    const [comment, setcomment] = useState("");
    useEffect(() => {
        dispatch(getproduct(id))
    }, [dispatch, id, props.history, addreviewsuccess])
    const goback = () => {
        props.history.push('/');
    }
    const handlechooseproduct = (qty) => {
        props.history.push(`/cart/${id}?qty=${qty}`)
    }
    const handlesubmit = () => {
        const create = {
            rating: rating,
            comment: comment
        }
        dispatch(addnewreviews(id, create))
    }
    return (
        <Container>
            <Button bd='dark' variant='dark' className='my-4' onClick={goback}>
                GO BACK
            </Button>
            {
                productloading ? <Loadingpage/> : producterror ?
                    <Alert variant='danger' style={{margin: "100px auto"}}>{producterror}</Alert> :
                    <>
                        <Row>
                            <Col md={4}>
                                <Image src={product?.image} fluid></Image>
                            </Col>
                            <Col md={4}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        {product?.name}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product?.rating}
                                                text={`${product?.numreviews} reviews`}></Rating>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: ${product?.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product?.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={4}>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col width={6}>Price</Col>
                                            <Col width={6}>${product?.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col width={6}>Status</Col>
                                            <Col width={6}>{product?.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {
                                        product?.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qyt</Col>
                                                    <Col>
                                                        <Form.Control as='select' value={qty}
                                                                      onChange={(e) => setqty(e.target.value)}>
                                                            {
                                                                [...Array(product?.countInStock).keys()].map((item, index) => {
                                                                    return <option value={item + 1} key={item + 1}>
                                                                        {item + 1}
                                                                    </option>
                                                                })
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    }
                                    <ListGroup.Item>
                                        <Button variant='dark' bg='dark' className='btn-block' type='button'
                                                onClick={() => handlechooseproduct(qty)}
                                                disabled={product?.countInStock === 0}>
                                            ADD TO CART
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <h4 className='my-3'>REVIEWS</h4>
                                {product?.reviews.length === 0
                                    ? <Alert variant='info'>No Reviews</Alert>
                                    : <ListGroup variant='flush'>
                                        {
                                            product?.reviews.map((review, index) => {
                                                return <ListGroup.Item key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating}/>
                                                    <p>{review.createdAt.substr(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            })
                                        }
                                    </ListGroup>
                                }
                                <h4 className='my-4'>WRITE A CUSTOMER REVIEW</h4>
                                {addreviewloading && <Loadingpage/>}
                                {addreviewerror && <Alert variant='danger'>{addreviewerror}</Alert>}
                                {currentuser ? <Form>
                                            <Form.Group>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select' onChange={(e) => setrating(e.target.value)}>
                                                    <option value=''>select...</option>
                                                    <option value='1'>1-Poor</option>
                                                    <option value='2'>2-Fair</option>
                                                    <option value='3'>3-Good</option>
                                                    <option value='4'>4-Very Godd</option>
                                                    <option value='5'>5-Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea' rows={3}
                                                              onChange={(e) => setcomment(e.target.value)}>
                                                </Form.Control>
                                            </Form.Group>
                                            <Button variant='dark' bg='dark' type='submit'
                                                    onClick={(e) => handlesubmit(e)}>Submit</Button>
                                        </Form> :<Alert variant='info'>Please <Link to='/login'>sign in</Link> to write a review</Alert>}
                            </Col>
                        </Row>
                    </>
            }
        </Container>
    )
}