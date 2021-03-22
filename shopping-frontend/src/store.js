import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from "redux-thunk";
import {homeReducer} from "./pages/home/store/reducer";
import {detailReducer} from "./pages/Detail/store/reducer";
import {cartReducer} from "./pages/cart/store/reducer";
import {loginReducer} from "./pages/login/store/reducer";
import {addressReducer} from "./pages/shipping/store/reducer";
import {paymentReducer} from "./pages/payment/store/reducer";
import {orderReducer} from "./pages/placeorder/store/reducer";
import {finalOrderReducer} from "./pages/order/store/reducer";
import {allUserReducer} from "./pages/userlist/store/reducer";
import {allProductsReducer} from "./pages/productlist/store/reducer";
import {allOrdersReducer} from "./pages/orderlist/store/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    home: homeReducer,
    detail: detailReducer,
    cart: cartReducer,
    login: loginReducer,
    address: addressReducer,
    payment: paymentReducer,
    order: orderReducer,
    finalOrder: finalOrderReducer,
    allUsers: allUserReducer,
    allproducts: allProductsReducer,
    allOrders: allOrdersReducer
})
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;