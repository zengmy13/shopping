import React, {useEffect, useState} from "react";
import {Row, Col, Container, Form, Button, Alert, Table} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getallorders, getprofile, updateprofile} from "./store/actioncreators";
import Loadingpage from "../loading";


export default function Profile(props) {
    const [name, setname] = useState("");
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("");
    const [message, setmessage] = useState("");
    const dispatch = useDispatch();
    const {id} = props.match.params;
    const {currentuser, profile, updateloading, updateerror, allorders, allordersloading, allorderserror} = useSelector(state => state.login);

    useEffect(() => {
        if (!currentuser) {
            props.history.push("/login");
            return;
        }else{
            if (!profile) {
                dispatch(getprofile(id));
                dispatch(getallorders());
            } else {
                setname(profile.name);
                setemail(profile.email);
            }
        }

    }, [dispatch, id, profile, currentuser])


    const handleupdate = (e) => {
        e.preventDefault()
        if (confirmpassword !== password) {
            setmessage("password do not match")
        }
        dispatch(updateprofile({name, email, password}))
    }
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h4 className='mb-3'>MY PROFILE</h4>
                    {
                        updateloading ? <Loadingpage/> : null
                    }
                    {
                        updateerror ? <Alert variant='danger'>{updateerror}</Alert> : null
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
                                    onClick={(e) => handleupdate(e)}>
                                UPDATE
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={9}>
                    <h4 className='mb-4'>MY ORDRES</h4>
                    {
                        allorderserror ? <Alert varaint='danger'>{allorderserror}</Alert> : null
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
                            allordersloading
                                ? <tr>
                                    <td colSpan={6}>
                                        <Loadingpage/>
                                    </td>
                                </tr>
                                : allorderserror ?
                                <td colSpan={6}>
                                    <Alert variant='danger'>{allorderserror}</Alert>
                                </td> :
                                allorders.length == 0 ? <tr>
                                        <td colSpan={6}>
                                            YOUR ORDER IS EMPTY
                                        </td>
                                    </tr> :
                                    allorders.map((order, index) => {
                                        return <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substr(0, 10)}</td>
                                            <td>${order.totalprice}</td>
                                            <td>{order.ispaid ? order.paidat :
                                                <i className='fas fa-times' style={{color: "red"}}></i>
                                            }</td>
                                            <td>{order.deliver ?
                                                order.deliverat
                                                : <i className='fas fa-times' style={{color: "red"}}></i>}</td>
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