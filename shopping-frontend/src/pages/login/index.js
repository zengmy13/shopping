import React, {useEffect, useState} from 'react';
import {Container, Form, Button, Row, Col, Alert} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {login} from "./store/actioncreators";
import {useDispatch, useSelector} from "react-redux";
import LoadingPage from "../loading";
import {LOG_RESET} from "./store/actiontype";

export default function SignIn(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const {currentUser, loginLoading, loginError} = useSelector(state => state.login);
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/"

    useEffect(() => {
        dispatch({
            type: LOG_RESET
        })
        if (currentUser) {
            props.history.push(redirect)
        }
    }, [currentUser, props.history, dispatch])
    const handleSubmitForm = () => {
        dispatch(login(email, password))
    }

    return (
        <>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col md={6}>
                        <h2 className='py-4'>SIGN IN</h2>
                        {
                            loginError ? <Alert variant='danger'>{loginError}</Alert> : null
                        }
                        {
                            loginLoading ? <LoadingPage/> : null
                        }
                        <Form>
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
                                <Button type='submit' variant='dark'
                                        disabled={loginLoading}
                                        onClick={handleSubmitForm}>
                                    SIGN IN
                                </Button>
                            </Form.Group>
                            <p>
                                New Customer?
                                <span className='ml-2'>
                               <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
                                  Register
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