import React, {useEffect} from 'react';
import {Button, Table, Container, Row, Col, Alert} from "react-bootstrap";
import LoadingPage from "../loading";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../home/store/actioncreators";
import {deleteproduct} from "./store/actioncreators";
import Paginate from "../../components/paginate";


export default function ProductList(props) {
    const dispatch = useDispatch();
    const page = props.match.params.page
    const {products, productsLoading, productsError, totalPage, pageNum, deleteSuccess} = useSelector(state => state.home);
    const {currentUser} = useSelector(state => state.login)
    useEffect(() => {
        if (currentUser && currentUser.isAdmin) {
            dispatch(getProducts("", page))
        } else {
            props.history.push("/login");
        }
    }, [dispatch, props.history, currentUser, page, deleteSuccess])

    const handledeleteproduct = (id) => {
        if (window.confirm("Are you sure to delete?")) {
            dispatch(deleteproduct(id))
        }
    }
    const handleCreateProduct = () => {
        props.history.push('/productlist/create')
    }
    return (
        <Container>
            <Row className='my-3'>
                <Col >
                    <h4 className='mb-4' style={{display:"inline-block"}}>PRODUCTS</h4>
                    <Button variant='dark' bg='dark' onClick={handleCreateProduct} className='float-right'>
                        <i className='fas fa-plus mr-2'/>
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
                    productsLoading
                        ? <tr>
                            <td colSpan={6}>
                                <LoadingPage/>
                            </td>
                        </tr>
                        : productsError ?
                        <tr>
                            <td colSpan={6}>
                                <Alert variant='danger'>{productsError}</Alert>
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
                                            <i className='fas fa-edit'/>
                                        </Button>
                                        <Button className='btn btn-light'
                                                onClick={() => handledeleteproduct(product._id)}>
                                            <i className='fas fa-trash' style={{color: "red"}}/>
                                        </Button>
                                    </td>
                                </tr>
                            })
                }
                </tbody>
            </Table>
            {!productsError && <Paginate totalPage={totalPage} page={pageNum} admin={true}/>}
        </Container>
    )
}