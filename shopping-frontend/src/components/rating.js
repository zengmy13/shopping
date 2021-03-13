import React from 'react';
import {Row, Col} from 'react-bootstrap';

export default function Rating(props) {

    const {value, text} = props;

    return (
        <>
            <Row className='mb-2'>
                <Col>
                   <span>
                       <i style={{color: "#f8e825"}}
                          className={value >= 1 ? "fas fa-star" : value >= 0.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
                   </span>
                    <span>
                       <i style={{color: "#f8e825"}}
                          className={value >= 2 ? "fas fa-star" : value >= 1.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
                   </span>
                    <span>
                       <i style={{color: "#f8e825"}}
                          className={value >= 3 ? "fas fa-star" : value >= 2.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
                   </span>
                    <span>
                       <i style={{color: "#f8e825"}}
                          className={value >= 4 ? "fas fa-star" : value >= 3.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
                   </span>
                    <span>
                       <i style={{color: "#f8e825"}}
                          className={value >= 5 ? "fas fa-star" : value >= 4.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
                   </span>
                    <span style={{fontSize: ".9rem"}} className='ml-2'>{text && text}</span>
                </Col>
            </Row>

        </>

    )
}