import React from 'react';
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";


export default function ErrorPage(){
    return (
        <Alert variant='danger'>
            We have an error <Link to='/'>Go back to Home</Link>
        </Alert>
    )
}