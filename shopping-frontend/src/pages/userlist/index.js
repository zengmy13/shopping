import React, {useEffect} from 'react';
import {Button, Table, Container, Alert} from "react-bootstrap";
import Loadingpage from "../loading";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {admingetallusers, deleteuser} from "./store/actioncreators";


export default function Userlist(props) {
    const dispatch = useDispatch();
    const {allusers, allusersloading, alluserserror, deletesuccess} = useSelector(state => state.allusers);
    const {currentuser} = useSelector(state => state.login)
    useEffect(() => {
        if (currentuser && currentuser?.isAdmin || deletesuccess) {
            dispatch(admingetallusers())
        } else {
            props.history.push("/login");
            return;
        }
    }, [dispatch, props.history, currentuser, deletesuccess])

    const handledeleteuser = (id) => {
        if (window.confirm("Are you sure to delete?")) {
            dispatch(deleteuser(id))
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
                    allusersloading
                        ? <tr>
                            <td colSpan={6}>
                                <Loadingpage/>
                            </td>
                        </tr>
                        : alluserserror ? <td colSpan={6}>
                            <Alert variant='danger'>{alluserserror}</Alert>
                        </td> :
                        allusers.length == 0 ? <tr>
                                <td colSpan={6}>
                                    NO USERS
                                </td>
                            </tr> :
                            allusers.map((user, index) => {
                                return <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>
                                        <a href={`mailto:${user.email}`}>{user.email}</a>
                                    </td>
                                    <td>{user.isAdmin ? <i className='fas fa-check' style={{color: "green"}}></i> :
                                        <i className='fas fa-times' style={{color: "red"}}></i>
                                    }</td>
                                    <td>
                                        <Button as={Link} to={`/userlist/${user._id}/edit`}
                                                className='btn btn-light'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                        <Button className='btn btn-light' onClick={() => handledeleteuser(user._id)}>
                                            <i className='fas fa-trash' style={{color: "red"}}></i>
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