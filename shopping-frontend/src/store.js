import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from "redux-thunk";
import {homereducer} from "./pages/home/store/reducer";
import {detailreducer} from "./pages/Detail/store/reducer";
import {cartreducer} from "./pages/cart/store/reducer";
import {loginreducer} from "./pages/login/store/reducer";
import {addressreducer} from "./pages/shipping/store/reducer";
import {paymentreducer} from "./pages/payment/store/reducer";
import {orderreducer} from "./pages/placeorder/store/reducer";
import {finalorderreducer} from "./pages/order/store/reducer";
import {alluserreducer} from "./pages/userlist/store/reducer";
import {allproductsreducer} from "./pages/productlist/store/reducer";
import {allordersreducer} from "./pages/orderlist/store/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    home: homereducer,
    detail: detailreducer,
    cart: cartreducer,
    login: loginreducer,
    address: addressreducer,
    payment: paymentreducer,
    order: orderreducer,
    finalorder: finalorderreducer,
    allusers: alluserreducer,
    allproducts: allproductsreducer,
    allorders: allordersreducer
})
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;