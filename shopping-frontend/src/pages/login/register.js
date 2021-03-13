import React, {useEffect, useState} from 'react';
import {Container, Form, Button, Row, Col, Alert} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {register} from "./store/actioncreators";
import Loadingpage from "../loading";
import {REGISTER_RESET} from "./store/actiontype";

export default function Register(props) {
    const [email, setemail] = useState("")
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("");
    const [message, setmessage] = useState("")
    const dispatch = useDispatch();
    const {registerloading, registererror, currentuser} = useSelector(state => state.login)
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

    useEffect(() => {
        dispatch({
            type: REGISTER_RESET
        })
        if (currentuser) {
            props.history.push(redirect);
        }
    }, [currentuser, props.history, dispatch])

    const handlesubmitform = (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            setmessage("password do not match")
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
                            registerloading ? <Loadingpage/> : null
                        }
                        {
                            registererror ? <Alert variant='danger'>{registererror}</Alert> : null
                        }
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control placeholder='name'
                                              value={name}
                                              type='text'
                                              onChange={(e) => setname(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
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
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control placeholder='confirm password'
                                              type='password'
                                              value={confirmpassword}
                                              onChange={(e) => setconfirmpassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Button type='submit' variant='dark'
                                        onClick={(e) => handlesubmitform(e)}>
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