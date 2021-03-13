import React, {useEffect, useState} from 'react';
import {Container, Form, Button, Row, Col, Alert} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {login} from "./store/actioncreators";
import {useDispatch, useSelector} from "react-redux";
import Loadingpage from "../loading";
import {LOG_RESET} from "./store/actiontype";

export default function Signin(props) {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const dispatch = useDispatch();
    const {currentuser, loginloading, loginerror} = useSelector(state => state.login);
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/"

    useEffect(() => {
        dispatch({
            type: LOG_RESET
        })
        if (currentuser) {
            props.history.push(redirect)
        }
    }, [currentuser, props.history, dispatch])
    const handlesubmitform = () => {
        dispatch(login(email, password))
    }

    return (
        <>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col md={6}>
                        <h2 className='py-4'>SIGN IN</h2>
                        {
                            loginerror ? <Alert variant='danger'>{loginerror}</Alert> : null
                        }
                        {
                            loginloading ? <Loadingpage/> : null
                        }
                        <Form>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control placeholder='email'
                                              value={email}
                                              type='email'
                                              onChange={(e) => setemail(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control placeholder='password'
                                              type='password'
                                              value={password}
                                              onChange={(e) => setpassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Button type='submit' variant='dark'
                                        disabled={loginloading}
                                        onClick={handlesubmitform}>
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