import React, {useEffect, useState} from "react";
import {Row, Col, Container, Form, Button, Alert, Table} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllOrders, getProfile, updateProfile} from "./store/actioncreators";
import LoadingPage from "../loading";


export default function Profile(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {id} = props.match.params;
    const {currentUser, profile, updateLoading, updateError, allOrders, allOrdersLoading, allOrdersError} = useSelector(state => state.login);

    useEffect(() => {
        if (!currentUser) {
            props.history.push("/login");
        }else{
            if (!profile) {
                dispatch(getProfile(id));
                dispatch(getAllOrders());
            } else {
                setName(profile.name);
                setEmail(profile.email);
            }
        }

    }, [dispatch, id, profile, currentUser])


    const handleUpdate = (e) => {
        e.preventDefault()
        if (confirmPassword !== password) {
            setMessage("password do not match")
        }
        dispatch(updateProfile({name, email, password}))
    }
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h4 className='mb-3'>MY PROFILE</h4>
                    {
                        updateLoading ? <LoadingPage/> : null
                    }
                    {
                        updateError ? <Alert variant='danger'>{updateError}</Alert> : null
                    }
                    {
                        message ? <Alert variant='danger'>{message}</Alert> : null
                    }
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder='name'
                                          value={name}
                                          type='text'
                                          onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control placeholder='email'
                                          value={email}
                                          type='email'
                                          onChange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control placeholder='password'
                                          type='password'
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control placeholder='confirm password'
                                          type='password'
                                          value={confirmPassword}
                                          onChange={(e) => setConfirmPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button type='submit' variant='dark'
                                    onClick={(e) => handleUpdate(e)}>
                                UPDATE
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={9}>
                    <h4 className='mb-4'>MY ORDRES</h4>
                    {
                        allOrdersError ? <Alert varaint='danger'>{allOrdersError}</Alert> : null
                    }
                    <Table striped bordered hover style={{fontSize: ".8rem"}} responsive>
                        <thead>
                        <tr className='text-center'>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className='text-center'>
                        {
                            allOrdersLoading
                                ? <tr>
                                    <td colSpan={6}>
                                        <LoadingPage/>
                                    </td>
                                </tr>
                                : allOrdersError ?
                                <td colSpan={6}>
                                    <Alert variant='danger'>{allOrdersError}</Alert>
                                </td> :
                                allOrders.length == 0 ? <tr>
                                        <td colSpan={6}>
                                            YOUR ORDER IS EMPTY
                                        </td>
                                    </tr> :
                                    allOrders.map((order, index) => {
                                        return <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substr(0, 10)}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{order.ispaid ? order.paidat :
                                                <i className='fas fa-times' style={{color: "red"}}/>
                                            }</td>
                                            <td>{order.deliver ?
                                                order.deliverat
                                                : <i className='fas fa-times' style={{color: "red"}}/>}</td>
                                            <td>
                                                <Button as={Link} to={`/order/${order._id}`}
                                                        size='sm'
                                                        className='btn btn-block' bg='dark' variant='dark'>
                                                    Details
                                                </Button>
                                            </td>
                                        </tr>
                                    })
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}