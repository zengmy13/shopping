import React from 'react';
import {Nav, Col, Row} from "react-bootstrap";
import {Link} from 'react-router-dom'


export default function Checkout(props) {
    const {step1, step2, step3, step4} = props;
    return (
        <Row className='justify-content-md-center'>
            <Col  md={8}>
                <Nav>
                    <Nav.Item>
                        {
                            step1 ? <Nav.Link as={Link} to='/login'>Sign in</Nav.Link> :
                                <Nav.Link disabled>Sign in</Nav.Link>
                        }
                    </Nav.Item>
                    <Nav.Item>
                        {
                            step2 ? <Nav.Link as={Link} to='/shipping'>Shipping</Nav.Link> :
                                <Nav.Link disabled>Shipping</Nav.Link>
                        }
                    </Nav.Item>
                    <Nav.Item>
                        {
                            step3 ? <Nav.Link as={Link} to='/payment'>Payment</Nav.Link> :
                            <Nav.Link disabled>Payment</Nav.Link>
                        }
                    </Nav.Item>
                    <Nav.Item>
                        {
                            step4 ? <Nav.Link as={Link} to='/placeorder'>
                                Place Order
                            </Nav.Link> : <Nav.Link disabled>Place Order</Nav.Link>
                        }
                    </Nav.Item>
                </Nav>
            </Col>
        </Row>

    )
}