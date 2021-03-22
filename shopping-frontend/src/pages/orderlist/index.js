import React, {useEffect} from 'react';
import {Button, Table, Container, Alert} from "react-bootstrap";
import LoadingPage from "../loading";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {adminGetAllOrders} from "./store/actioncreators";


export default function OrderList(props) {
    const dispatch = useDispatch();
    const {allOrders, allOrdersLoading, allOrdersError} = useSelector(state => state.allOrders);
    const {currentUser} = useSelector(state => state.login);

    useEffect(() => {
        if (currentUser && currentUser?.isAdmin) {
            dispatch(adminGetAllOrders())
        } else {
            props.history.push("/login")
        }
    }, [dispatch, props.history, currentUser])
    return (
        <Container>
            <h4 className='mb-4'>ORDERS</h4>
            <Table striped bordered hover style={{fontSize: ".9rem"}} responsive>
                <thead>
                <tr className='text-center'>
                    <th>ID</th>
                    <th>USER</th>
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
                            <td colSpan={7}>
                                <LoadingPage/>
                            </td>
                        </tr>
                        : allOrdersError ?
                        <tr>
                            <td colSpan={7}>
                                <Alert variant='danger'>{allOrdersError}</Alert>
                            </td>
                        </tr>
                        : allOrders.length == 0 ? <tr>
                                <td colSpan={7}>
                                    NO ORDERS
                                </td>
                             </tr> :
                            allOrders.map((order, index) => {
                                return <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user?.name}</td>
                                    <td>
                                        {order.createdAt.substr(0, 10)}
                                    </td>
                                    <td>${order.totalPrice
                                    }</td>
                                    <td>{order.ispaid ? order.paidat.substr(0, 10) :
                                        <i className='fas fa-times' style={{color: "red"}}></i>}</td>
                                    <td>{order.deliver ? order.deliverat.substr(0, 10)
                                        : <i className='fas fa-times' style={{color: "red"}}></i>}
                                    </td>
                                    <td>
                                        <Button className='btn btn-light' as={Link} to={`/order/${order._id}`}>
                                            Details
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