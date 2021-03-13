import React, {useState} from 'react';
import Checkout from "../../components/checksteps";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addpaymentmethod} from "./store/actioncreators";


export default function Payment(props) {
    const [paymentmethod, setpaymentmethod] = useState("PayPal");
    const dispatch = useDispatch()
    const {shippingaddress} = useSelector(state => state.address)
    const {currentuser} = useSelector(state => state.login);
    if (!shippingaddress) {
        props.history.push("/shipping")
    }
    if (!currentuser) {
        props.history.push("/shipping")
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        dispatch(addpaymentmethod(paymentmethod));
        props.history.push("/placeorder")
    }
    return (
        <Container>
            <Checkout step1 step2 step3/>
            <Row className='justify-content-md-center'>
                <Col md={6}>
                    <h3 className='my-4'>PAYMENT METHOD</h3>
                    <h5>Select Method</h5>
                    <Form>
                        <Form.Group>
                            <Form.Check type='radio' label={'PayPal or Credit Card'}
                                        value={paymentmethod}
                                        checked onChange={(e) => setpaymentmethod(e.target.value)}/>
                        </Form.Group>
                        <Button type='submit' variant='dark' bg='dark' onClick={(e) => handlesubmit(e)}>
                            CONTINUE
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}