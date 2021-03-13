import React, {useState} from 'react';
import {Form, Button, Col, Row, Container} from 'react-bootstrap';
import Checkout from "../../components/checksteps";
import {useDispatch, useSelector} from "react-redux";
import {saveaddress} from "./store/actioncreators";


export default function Shipping(props) {

    const [address, setaddress] = useState("");
    const [city, setcity] = useState("");
    const [postcode, setpostcode] = useState("");
    const [country, setcountry] = useState("");
    const dispatch = useDispatch();
    const {currentuser} = useSelector(state => state.login)
    if (!currentuser) {
        props.history.push("/login");
    }
    const handlesubmitform = (e) => {
        e.preventDefault();
        const shippingaddress = {
            address,
            city,
            postcode,
            country
        }
        dispatch(saveaddress(shippingaddress));
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
                                      onChange={(e) => setaddress(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control placeholder='City'
                                      value={city}
                                      type='text'
                                      onChange={(e) => setcity(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control placeholder='Postal Code'
                                      type='text'
                                      value={postcode}
                                      onChange={(e) => setpostcode(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control placeholder='Country'
                                      type='text'
                                      value={country}
                                      onChange={(e) => setcountry(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button type='submit' variant='dark'
                                onClick={(e) => handlesubmitform(e)}>
                            COUNTINUE
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    )
}