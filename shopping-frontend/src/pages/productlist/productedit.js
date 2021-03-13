import React, {useEffect, useState} from 'react';
import {Container, Form, Button, Row, Col} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {adminchangeproduct, getproduct} from "../Detail/store/actioncreators";
import {ADMIN_PRODUCT_RESET} from "../Detail/store/actiontype";
import {admincreateproduct} from "../home/store/actioncreators";
import axios from "axios";
import {CREATE_RESET} from "../home/store/actiontype";


export default function Productedit(props) {
    const {id} = props.match.params;
    const [name, setname] = useState("")
    const [image, setimage] = useState("")
    const [brand, setbrand] = useState("")
    const [category, setcategory] = useState("")
    const [countInStock, setcountInStock] = useState(0)
    const [description, setdescription] = useState("")
    const [price, setprice] = useState(0)
    const dispatch = useDispatch();
    const {product, updatesuccess} = useSelector(state => state.detail)
    const {createsuccess} = useSelector(state => state.home)
    const [uploading, setuploading] = useState(false);
    const {currentuser} = useSelector(state => state.login)
    useEffect(() => {
        if (!id) {
            return;
        }
        if (!currentuser || !currentuser.isAdmin) {
            props.history.push("/login");
            return
        }
        if (updatesuccess || createsuccess) {
            props.history.push("/productlist");
            dispatch({
                type: ADMIN_PRODUCT_RESET
            })
            dispatch({
                type: CREATE_RESET
            })
        } else {
            if (!product || product._id !== id) {
                dispatch(getproduct(id))
            } else {
                setname(product.name)
                setprice(product.price)
                setimage(product.image)
                setbrand(product.brand)
                setcountInStock(product.countInStock)
                setcategory(product.category)
                setdescription(product.description)
            }
        }
    }, [dispatch, id, product, props.history, updatesuccess, createsuccess, currentuser])

    const uploadfile = async (e) => {
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
            setimage(file.name);
            setuploading(false)
        } catch (error) {
            setuploading(false)
        }
    }

    const handlesubmitform = (e) => {
        e.preventDefault();
        const update = {
            name, price, brand, category, image, countInStock, description
        }
        dispatch(adminchangeproduct(id, update))
    }
    const handlecreateproduct = (e) => {
        e.preventDefault();
        const create = {
            name, price, brand, category, image, countInStock, description
        }
        dispatch(admincreateproduct(create));
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
                                              onChange={(e) => setname(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control placeholder='price'
                                              value={price}
                                              type='text'
                                              onChange={(e) => setprice(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <Form.Control placeholder='image'
                                              value={image}
                                              type='text'
                                              onChange={(e) => setimage(e.target.value)}>
                                </Form.Control>
                                <Form.File id="imagefile" label="Choose file" custom onChange={(e) => uploadfile(e)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control placeholder='brand'
                                              value={brand}
                                              type='text'
                                              onChange={(e) => setbrand(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Count in stock</Form.Label>
                                <Form.Control placeholder='Count in stock'
                                              value={countInStock}
                                              type='text'
                                              onChange={(e) => setcountInStock(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control placeholder='Category'
                                              value={category}
                                              type='text'
                                              onChange={(e) => setcategory(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control placeholder='description'
                                              value={description}
                                              type='text'
                                              onChange={(e) => setdescription(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Button type='submit' variant='dark'
                                        onClick={props.match.params.id ? (e) => handlesubmitform(e) : (e) => handlecreateproduct(e)
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