import React, {useEffect} from 'react';
import {Button, Table, Container, Alert} from "react-bootstrap";
import LoadingPage from "../loading";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {adminGetAllUsers, deleteUser} from "./store/actioncreators";


export default function UserList(props) {
    const dispatch = useDispatch();
    const {allUsers, allUsersLoading, allUsersError, deleteSuccess} = useSelector(state => state.allUsers);
    const {currentUser} = useSelector(state => state.login)
    useEffect(() => {
        if (currentUser && currentUser?.isAdmin || deleteSuccess) {
            dispatch(adminGetAllUsers())
        } else {
            props.history.push("/login");
        }
    }, [dispatch, props.history, currentUser, deleteSuccess])

    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure to delete?")) {
            dispatch(deleteUser(id))
        }
    }
    return (
        <Container>
            <h4 className='mb-4'>USERS</h4>
            <Table striped bordered hover responsive>
                <thead>
                <tr className='text-center'>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className='text-center'>
                {
                    allUsersLoading
                        ? <tr>
                            <td colSpan={6}>
                                <LoadingPage/>
                            </td>
                        </tr>
                        : allUsersError ? <td colSpan={6}>
                            <Alert variant='danger'>{allUsersError}</Alert>
                        </td> :
                        allUsers.length == 0 ? <tr>
                                <td colSpan={6}>
                                    NO USERS
                                </td>
                            </tr> :
                            allUsers.map((user, index) => {
                                return <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>
                                        <a href={`mailto:${user.email}`}>{user.email}</a>
                                    </td>
                                    <td>{user.isAdmin ? <i className='fas fa-check' style={{color: "green"}}/> :
                                        <i className='fas fa-times' style={{color: "red"}}/>
                                    }</td>
                                    <td>
                                        <Button as={Link} to={`/userlist/${user._id}/edit`}
                                                className='btn btn-light'>
                                            <i className='fas fa-edit'/>
                                        </Button>
                                        <Button className='btn btn-light' onClick={() => handleDeleteUser(user._id)}>
                                            <i className='fas fa-trash' style={{color: "red"}}/>
                                        </Button>
                                    </td>
                                </tr>
                            })
                }
                </tbody>
            </Table>
        </Container>
    )
}