import React from "react";
import {Card} from 'react-bootstrap';
import Rating from "../../components/rating";
import {Link} from 'react-router-dom'

export default function Product(props) {
    const {product} = props;
    return (
        <Card className='p-3 my-3'>
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image}/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'><strong style={{fontSize: ".9rem"}}>{product.name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numreviews} reviews`}/>
                </Card.Text>
                <Card.Text as='h4'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}