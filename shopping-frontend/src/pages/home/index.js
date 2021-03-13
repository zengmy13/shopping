import React, {useEffect} from 'react';
import Product from "./product";
import {Container, Row, Col, Alert} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getproducts} from "./store/actioncreators";
import Loadingpage from "../loading";
import Helmetcomponent from "../../components/meta";
import Productcarousel from "../../components/carousel";
import Paginate from "../../components/paginate";


export default function Home(props) {
    const dispatch = useDispatch();
    const keyword = props.match.params.key
    const page = props.match.params.page;
    const {products, productsloading, productserror, totalpage, pagenum} = useSelector(state => state.home);

    useEffect(() => {
        dispatch(getproducts(keyword, page))
    }, [dispatch, keyword, page])
    return (
        <>
            <Helmetcomponent title='Welcome to my project'/>
            {keyword ? null : <Productcarousel/>}
            <Container>
                <Row>
                    {productsloading ? <Loadingpage/> : productserror ?
                        <Alert variant='danger' style={{margin: "100px auto"}}>{productserror}</Alert> :
                        products.map((product, index) => {
                            return <Col md={6} sm={12} lg={4} xl={3} key={product._id}>
                                <Product product={product}/>
                            </Col>
                        })

                    }
                </Row>
                {!productserror && <Paginate totalpage={totalpage} page={pagenum} keyword={keyword}/>}
            </Container>
        </>
    )
}