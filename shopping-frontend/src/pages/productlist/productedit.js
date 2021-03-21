import React, {useEffect, useState} from 'react';
import {Container, Form, Button, Row, Col} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {adminChangeProduct, getProduct} from "../Detail/store/actioncreators";
import {ADMIN_PRODUCT_RESET} from "../Detail/store/actiontype";
import {adminCreateProduct} from "../home/store/actioncreators";
import axios from "axios";
import {CREATE_RESET} from "../home/store/actiontype";


export default function ProductEdit(props) {
    const {id} = props.match.params;
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const dispatch = useDispatch();
    const {product, updateSuccess} = useSelector(state => state.detail)
    const {createSuccess} = useSelector(state => state.home)
    const [uploading, setuploading] = useState(false);
    const {currentUser} = useSelector(state => state.login)
    useEffect(() => {
        if (!id) {
            return;
        }
        if (!currentUser || !currentUser.isAdmin) {
            props.history.push("/login");
            return
        }
        if (updateSuccess || createSuccess) {
            props.history.push("/productlist");
            dispatch({
                type: ADMIN_PRODUCT_RESET
            })
            dispatch({
                type: CREATE_RESET
            })
        } else {
            if (!product || product._id !== id) {
                dispatch(getProduct(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCountInStock(product.countInStock)
                setCategory(product.category)
                setDescription(product.description)
            }
        }
    }, [dispatch, id, product, props.history, updateSuccess, createSuccess, currentUser])

    const uploadFile = async (e) => {
        try {
            const file = e.target.files[0];
            const formdata = new FormData();
            formdata.append('image', file);
            setuploading(true)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            await axios.post("/api/upload", formdata, config)
            setImage(file.name);
            setuploading(false)
        } catch (error) {
            setuploading(false)
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const update = {
            name, price, brand, category, image, countInStock, description
        }
        dispatch(adminChangeProduct(id, update))
    }
    const handleCreateProduct = (e) => {
        e.preventDefault();
        const create = {
            name, price, brand, category, image, countInStock, description
        }
        dispatch(adminCreateProduct(create));
        props.history.push("/productlist")
    }

    return (
        <>
            <Container>
                <Button className='btn btn-light' as={Link} to='/productlist'>GO BACK</Button>
                <Row className='justify-content-md-center'>
                    <Col md={6}>
                        <h2 className='py-4'>EDIT PRODUCT</h2>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control placeholder='name'
                                              value={name}
                                              type='text'
                                              onChange={(e) => setName(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control placeholder='price'
                                              value={price}
                                              type='text'
                                              onChange={(e) => setPrice(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <Form.Control placeholder='image'
                                              value={image}
                                              type='text'
                                              onChange={(e) => setImage(e.target.value)}>
                                </Form.Control>
                                <Form.File id="imagefile" label="Choose file" custom onChange={(e) => uploadFile(e)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control placeholder='brand'
                                              value={brand}
                                              type='text'
                                              onChange={(e) => setBrand(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Count in stock</Form.Label>
                                <Form.Control placeholder='Count in stock'
                                              value={countInStock}
                                              type='text'
                                              onChange={(e) => setCountInStock(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control placeholder='Category'
                                              value={category}
                                              type='text'
                                              onChange={(e) => setCategory(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control placeholder='description'
                                              value={description}
                                              type='text'
                                              onChange={(e) => setDescription(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Button type='submit' variant='dark'
                                        onClick={props.match.params.id ? (e) => handleSubmitForm(e) : (e) => handleCreateProduct(e)
                                        }>
                                    {props.match.params.id ? "UPDATE" : "CREATE"}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}