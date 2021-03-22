import React, {useState} from 'react';
import Checkout from "../../components/checksteps";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addPaymentMethod} from "./store/actioncreators";


export default function Payment(props) {
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const dispatch = useDispatch()
    const {shippingAddress} = useSelector(state => state.address)
    const {currentUser} = useSelector(state => state.login);
    if (!shippingAddress) {
        props.history.push("/shipping")
    }
    if (!currentUser) {
        props.history.push("/shipping")
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPaymentMethod(paymentMethod));
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
                                        value={paymentMethod}
                                        checked onChange={(e) => setPaymentMethod(e.target.value)}/>
                        </Form.Group>
                        <Button type='submit' variant='dark' bg='dark' onClick={(e) => handleSubmit(e)}>
                            CONTINUE
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}