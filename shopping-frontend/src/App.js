import React from 'react';
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import {Container} from "react-bootstrap";
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import Productdetail from "./pages/Detail";
import Cart from "./pages/cart/index";
import Signin from "./pages/login";
import Register from "./pages/login/register";
import Profile from "./pages/login/profile";
import Shipping from "./pages/shipping";
import Payment from "./pages/payment";
import Placeorder from "./pages/placeorder";
import Order from "./pages/order";
import Userlist from "./pages/userlist";
import Useredit from "./pages/userlist/useredit";
import Productlist from "./pages/productlist";
import Productedit from "./pages/productlist/productedit";
import Orderlist from "./pages/orderlist";
import Errorpage from "./components/error";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Container className='main my-4'>
                    <Switch>
                    <Route path='/' exact component={Home}></Route>
                    <Route path='/search/:key' exact component={Home}></Route>
                    <Route path='/page/:page' exact component={Home}></Route>
                    <Route path='/search/:key/page/:page' exact component={Home}></Route>
                    <Route path='/product/:id' exact component={Productdetail}></Route>
                    <Route path='/cart/:id?' exact component={Cart}></Route>
                    <Route path='/login' exact component={Signin}></Route>
                    <Route path='/register' exact component={Register}></Route>
                    <Route path='/profile/:id' exact component={Profile}></Route>
                    <Route path='/shipping' exact component={Shipping}></Route>
                    <Route path='/payment' exact component={Payment}></Route>
                    <Route path='/placeorder' exact component={Placeorder}></Route>
                    <Route path='/order/:id' exact component={Order}></Route>
                    <Route path='/userlist' exact component={Userlist}></Route>
                    <Route path='/productlist' exact component={Productlist}></Route>
                    <Route path='/productlist/page/:page' exact component={Productlist}></Route>
                    <Route path='/userlist/:id/edit' exact component={Useredit}></Route>
                    <Route path='/orderlist' exact component={Orderlist}></Route>
                    <Route path={['/productlist/:id/edit', '/productlist/create']} exact
                           component={Productedit}></Route>
                    <Route  component={Errorpage}></Route>
                    </Switch>
                </Container>
                <Footer/>
            </BrowserRouter>
        </>
    );
}


