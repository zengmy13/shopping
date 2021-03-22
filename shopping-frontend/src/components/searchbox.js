import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";


export default function SearchBox(props) {
    const [keyword, setKeyword] = useState("");
    const handleSubmit = (e) => {
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
                              onChange={(e) => setKeyword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='ml-2'>
                <Button className='btn' variant='outline-success' type='submit'
                        onClick={(e) => handleSubmit(e)}>SEARCH</Button>
            </Form.Group>
        </Form>
    )
}