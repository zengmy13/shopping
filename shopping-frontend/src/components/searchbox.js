import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";


export default function Searchbox(props) {
    const [keyword, setkeyword] = useState("");
    const handlesubmit = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            props.history.push(`/search/${keyword}`)
        } else {
            props.history.push("/")
        }
    }
    return (
        <Form inline className='searchbox'>
            <Form.Group>
                <Form.Control type='text' placeholder='Search products'
                              onChange={(e) => setkeyword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='ml-2'>
                <Button className='btn' variant='outline-success' type='submit'
                        onClick={(e) => handlesubmit(e)}>SEARCH</Button>
            </Form.Group>
        </Form>
    )
}