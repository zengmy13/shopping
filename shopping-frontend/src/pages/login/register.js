import React, {useEffect, useState} from 'react';
import {Container, Form, Button, Row, Col, Alert} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {register} from "./store/actioncreators";
import LoadingPage from "../loading";
import {REGISTER_RESET} from "./store/actiontype";

export default function Register(props) {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("")
    const dispatch = useDispatch();
    const {registerLoading, registerError, currentUser} = useSelector(state => state.login)
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

    useEffect(() => {
        dispatch({
            type: REGISTER_RESET
        })
        if (currentUser) {
            props.history.push(redirect);
        }
    }, [currentUser, props.history, dispatch])

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("password do not match")
            return;
        }
        dispatch(register(email, password, name));
    }

    return (
        <>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col md={6}>
                        <h2 className='py-4'>REGISTER</h2>
                        {
                            message ? <Alert variant='danger'>{message}</Alert> : null
                        }
                        {
                            registerLoading ? <LoadingPage/> : null
                        }
                        {
                            registerError ? <Alert variant='danger'>{registerError}</Alert> : null
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
                                        onClick={(e) => handleSubmitForm(e)}>
                                    REGISTER
                                </Button>
                            </Form.Group>
                            <p>
                                Have an account?
                                <span className='ml-2'>
                               <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
                                  Login
                               </Link>
                               </span>
                            </p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}