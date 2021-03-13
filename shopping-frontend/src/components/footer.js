import React from 'react';
import {Row, Col, Container} from 'react-bootstrap'


export default function Footer() {
    return (
        <Container>
            <Row>
                <Col className='text-center'>
                    Copyright&copy;Project2
                </Col>
            </Row>
        </Container>
    )
}