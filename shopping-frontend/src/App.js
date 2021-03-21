import React from 'react';
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import {Container} from "react-bootstrap";
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import ProductDetail from "./pages/Detail";
import Cart from "./pages/cart/index";
import SignIn from "./pages/login";
import Register from "./pages/login/register";
import Profile from "./pages/login/profile";
import Shipping from "./pages/shipping";
import Payment from "./pages/payment";
import PlaceOrder from "./pages/placeorder";
import Order from "./pages/order";
import UserList from "./pages/userlist";
import UserEdit from "./pages/userlist/useredit";
import ProductList from "./pages/productlist";
import ProductEdit from "./pages/productlist/productedit";
import OrderList from "./pages/orderlist";
import ErrorPage from "./components/error";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Container className='main my-4'>
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/search/:key' exact component={Home}/>
                        <Route path='/page/:page' exact component={Home}/>
                        <Route path='/search/:key/page/:page' exact component={Home}/>
                        <Route path='/product/:id' exact component={ProductDetail}/>
                        <Route path='/cart/:id?' exact component={Cart}/>
                        <Route path='/login' exact component={SignIn}/>
                        <Route path='/register' exact component={Register}/>
                        <Route path='/profile/:id' exact component={Profile}/>
                        <Route path='/shipping' exact component={Shipping}/>
                        <Route path='/payment' exact component={Payment}/>
                        <Route path='/placeorder' exact component={PlaceOrder}/>
                        <Route path='/order/:id' exact component={Order}/>
                        <Route path='/userlist' exact component={UserList}/>
                        <Route path='/productlist' exact component={ProductList}/>
                        <Route path='/productlist/page/:page' exact component={ProductList}/>
                        <Route path='/userlist/:id/edit' exact component={UserEdit}/>
                        <Route path='/orderlist' exact component={OrderList}/>
                        <Route path={['/productlist/:id/edit', '/productlist/create']} exact component={ProductEdit}/>
                        <Route  component={ErrorPage}/>
                    </Switch>
                </Container>
                <Footer/>
            </BrowserRouter>
        </>
    );
}


