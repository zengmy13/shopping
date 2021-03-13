import React, {useEffect} from 'react';
import {Button, Table, Container, Row, Col, Alert} from "react-bootstrap";
import Loadingpage from "../loading";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getproducts} from "../home/store/actioncreators";
import {deleteproduct} from "./store/actioncreators";
import Paginate from "../../components/paginate";


export default function Productlist(props) {
    const dispatch = useDispatch();
    const page = props.match.params.page
    const {products, productsloading, productserror, totalpage, pagenum, deletesuccess} = useSelector(state => state.home);
    const {currentuser} = useSelector(state => state.login)
    useEffect(() => {
        if (currentuser && currentuser.isAdmin) {
            dispatch(getproducts("", page))
        } else {
            props.history.push("/login");
            return;
        }
    }, [dispatch, props.history, currentuser, page, deletesuccess])

    const handledeleteproduct = (id) => {
        if (window.confirm("Are you sure to delete?")) {
            dispatch(deleteproduct(id))
        }
    }
    const handlecreateproduct = () => {
        props.history.push('/productlist/create')
    }
    return (
        <Container>
            <Row className='my-3'>
                <Col >
                    <h4 className='mb-4' style={{display:"inline-block"}}>PRODUCTS</h4>
                    <Button variant='dark' bg='dark' onClick={handlecreateproduct} className='float-right'>
                        <i className='fas fa-plus mr-2'></i>
                        CREATEPRODUCT
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                <tr className='text-center'>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className='text-center'>
                {
                    productsloading
                        ? <tr>
                            <td colSpan={6}>
                                <Loadingpage/>
                            </td>
                        </tr>
                        : productserror ?
                        <tr>
                            <td colSpan={6}>
                                <Alert variant='danger'>{productserror}</Alert>
                            </td>
                        </tr> : products.length == 0 ? <tr>
                                <td colSpan={6}>
                                    NO PRODUCTS
                                </td>
                            </tr> :
                            products.map((product, index) => {
                                return <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>
                                        ${product.price}
                                    </td>
                                    <td>
                                        {product.category}
                                    </td>
                                    <td>
                                        {product.brand}
                                    </td>
                                    <td>
                                        <Button as={Link} to={`/productlist/${product._id}/edit`}
                                                className='btn btn-light'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                        <Button className='btn btn-light'
                                                onClick={() => handledeleteproduct(product._id)}>
                                            <i className='fas fa-trash' style={{color: "red"}}></i>
                                        </Button>
                                    </td>
                                </tr>
                            })
                }
                </tbody>
            </Table>
            {!productserror && <Paginate totalpage={totalpage} page={pagenum} admin={true}/>}
        </Container>
    )
}