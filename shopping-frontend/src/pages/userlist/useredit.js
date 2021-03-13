import React, {useEffect, useState} from 'react';
import {Container, Form, Button, Row, Col, Alert} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {admingetuserdetail, adminupdateuser} from "./store/actioncreators";
import {ADMIN_USER_RESET} from "./store/actiontype";
import Loadingpage from "../loading";


export default function Useredit(props) {
    const {id} = props.match.params;
    const [email, setemail] = useState("")
    const [name, setname] = useState("")
    const [isadmin, setisadmin] = useState(false);
    const {currentuser} = useSelector(state => state.login)
    const dispatch = useDispatch();
    const {user, updateloading, updateerror, updatesuccess} = useSelector(state => state.allusers)

    useEffect(() => {
        if (!currentuser || !currentuser?.isAdmin) {
            props.history.push("/login");
            return;
        }
        if (updatesuccess) {
            dispatch({
                type: ADMIN_USER_RESET
            })
            props.history.push("/userlist");
        }
        if (!user || user._id != id) {
            dispatch(admingetuserdetail(id))
        } else {
            setname(user.name);
            setemail(user.email);
            setisadmin(user.isAdmin)
        }
    }, [dispatch, id, user, currentuser])
    const handlesubmitform = (e) => {
        e.preventDefault();
        const update = {
            name: name,
            email: email,
            isAdmin: isadmin
        }
        dispatch(adminupdateuser(id, update))
    }

    return (
        <>
            <Container>
                <Button className='btn btn-light' as={Link} to='/userlist'>GO BACK</Button>
                <Row className='justify-content-md-center'>
                    <Col md={6}>
                        <h2 className='py-4'>EDIT USER</h2>
                        {
                            updateloading ? <Loadingpage/> : updateerror ? <Alert variant='danger'>{updateerror}</Alert>
                                : <Form>
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
                                        <Form.Check
                                            label='Is Admin'
                                            checked={isadmin}
                                            type='checkbox'
                                            onChange={(e) => setisadmin(e.target.checked)}>
                                        </Form.Check>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button type='submit' variant='dark'
                                                onClick={(e) => handlesubmitform(e)}>
                                            UPDATE
                                        </Button>
                                    </Form.Group>
                                </Form>
                        }

                    </Col>
                </Row>
            </Container>
        </>
    )
}