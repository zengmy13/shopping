import React, {useEffect} from 'react';
import Product from "./product";
import {Container, Row, Col, Alert} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "./store/actioncreators";
import LoadingPage from "../loading";
import HelmetComponent from "../../components/meta";
import ProductCarousel from "../../components/carousel";
import Paginate from "../../components/paginate";


export default function Home(props) {
    const dispatch = useDispatch();
    const keyword = props.match.params.key
    const page = props.match.params.page;
    const {products, productsLoading, productsError, totalPage, pageNum} = useSelector(state => state.home);

    useEffect(() => {
        dispatch(getProducts(keyword, page))
    }, [dispatch, keyword, page])
    return (
        <>
            <HelmetComponent title='Welcome to my project'/>
            {keyword ? null : <ProductCarousel/>}
            <Container>
                <Row>
                    {productsLoading ? <LoadingPage/> : productsError ?
                        <Alert variant='danger' style={{margin: "100px auto"}}>{productsError}</Alert> :
                        products.map((product, index) => {
                            return <Col md={6} sm={12} lg={4} xl={3} key={product._id}>
                                <Product product={product}/>
                            </Col>
                        })

                    }
                </Row>
                {!productsError && <Paginate totalPage={totalPage} page={pageNum} keyword={keyword}/>}
            </Container>
        </>
    )
}