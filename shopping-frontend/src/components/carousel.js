import React, {useEffect} from 'react';
import {Carousel,Image, Alert} from "react-bootstrap";
import {getTopProducts} from "../pages/home/store/actioncreators";
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import LoadingPage from "../pages/loading";


export default function ProductCarousel() {
    const dispatch = useDispatch();
    const {top, topLoading, topError} = useSelector(state => state.home)
    useEffect(() => {
        dispatch(getTopProducts())
    }, [dispatch])
    return (
        <Carousel pause='hover' className='bg-dark'>
            {
                topLoading ? <LoadingPage/> : topError ? <Alert>{topError}</Alert> :
                    top.map((item, index) => {
                        return <Carousel.Item key={item._id} as={Link} to={`/product/${item._id}`}>
                            <Image fluid src={item.image}/>
                            <Carousel.Caption>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    })
            }
        </Carousel>
    )
}