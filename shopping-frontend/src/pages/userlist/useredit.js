import React, {useEffect, useState} from 'react';
import {Container, Form, Button, Row, Col, Alert} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {adminGetUserDetail, adminUpdateUser} from "./store/actioncreators";
import {ADMIN_USER_RESET} from "./store/actiontype";
import LoadingPage from "../loading";


export default function UserEdit(props) {
    const {id} = props.match.params;
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [isAdmin, setIsAdmin] = useState(false);
    const {currentUser} = useSelector(state => state.login)
    const dispatch = useDispatch();
    const {user, updateLoading, updateError, updateSuccess} = useSelector(state => state.allUsers)

    useEffect(() => {
        if (!currentUser || !currentUser?.isAdmin) {
            props.history.push("/login");
            return;
        }
        if (updateSuccess) {
            dispatch({
                type: ADMIN_USER_RESET
            })
            props.history.push("/userlist");
        }
        if (!user || user._id !== id) {
            dispatch(adminGetUserDetail(id))
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, id, user, currentUser])
    const handleSubmitForm = (e) => {
        e.preventDefault();
        const update = {
            name: name,
            email: email,
            isAdmin: isAdmin
        }
        dispatch(adminUpdateUser(id, update))
    }

    return (
        <>
            <Container>
                <Button className='btn btn-light' as={Link} to='/userlist'>GO BACK</Button>
                <Row className='justify-content-md-center'>
                    <Col md={6}>
                        <h2 className='py-4'>EDIT USER</h2>
                        {
                            updateLoading ? <LoadingPage/> : updateError ? <Alert variant='danger'>{updateError}</Alert>
                                : <Form>
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
                                        <Form.Check
                                            label='Is Admin'
                                            checked={isAdmin}
                                            type='checkbox'
                                            onChange={(e) => setIsAdmin(e.target.checked)}>
                                        </Form.Check>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button type='submit' variant='dark'
                                                onClick={(e) => handleSubmitForm(e)}>
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