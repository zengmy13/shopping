import React, {useState} from 'react';
import {Form, Button, Col, Row, Container} from 'react-bootstrap';
import Checkout from "../../components/checksteps";
import {useDispatch, useSelector} from "react-redux";
import {saveAddress} from "./store/actioncreators";


export default function Shipping(props) {

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostCode] = useState("");
    const [country, setCountry] = useState("");
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.login)
    if (!currentUser) {
        props.history.push("/login");
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        const shippingAddress = {
            address,
            city,
            postcode,
            country
        }
        dispatch(saveAddress(shippingAddress));
        props.history.push("/payment")
    }
    return (
        <Container>
            <Checkout step1 step2/>
            <Row className='justify-content-md-center'>
                <Col md={8}>
                    <h3 className='my-4'>SHIPPING</h3>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder='Address'
                                      value={address}
                                      type='text'
                                      onChange={(e) => setAddress(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control placeholder='City'
                                      value={city}
                                      type='text'
                                      onChange={(e) => setCity(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control placeholder='Postal Code'
                                      type='text'
                                      value={postcode}
                                      onChange={(e) => setPostCode(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control placeholder='Country'
                                      type='text'
                                      value={country}
                                      onChange={(e) => setCountry(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button type='submit' variant='dark'
                                onClick={(e) => handleSubmitForm(e)}>
                            CONTINUE
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    )
}