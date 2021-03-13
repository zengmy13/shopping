import {
    DELIVER_RESET,
    GET_ORDER_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_PAYPAL_FAIL,
    ORDER_PAYPAL_REQUEST,
    ORDER_PAYPAL_SUCCESS, ORDER_RESET
} from "./actiontype";


const defaultvalue={
    orderdetail:null,
    orderloading:false,
    ordererror:null,
    paypal:false,
    paypalloading:false,
    paypalerror:null,
    deliversuccess:false,
    deliverloading:false,
    delivererror:null
}

export const finalorderreducer=(state=defaultvalue,action)=>{

    switch(action.type){
        case GET_ORDER_REQUEST:
            return {
                ...state,
                orderloading: true
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderloading: false,
                orderdetail:action.order
            }
        case GET_ORDER_FAIL:
            return {
                ...state,
                ordererror: action.error,
                orderloading: false,
            }
        case ORDER_PAYPAL_REQUEST:
            return {
                ...state,
                paypalloading: true
            }
        case ORDER_PAYPAL_SUCCESS:
            return {
                ...state,
                paypalloading: false,
                paypal:true
            }
        case ORDER_PAYPAL_FAIL:
            return {
                ...state,
                paypalerror: action.error,
                paypalloading: false,
            }
        case ORDER_RESET:
            return {
                ...state,
                // orderdetail: null
            }
        case ORDER_DELIVER_REQUEST:
            return {
                ...state,
                deliverloading: true
            }
        case ORDER_DELIVER_SUCCESS:
            return {
                ...state,
                deliverloading: false,
                deliversuccess:true
            }
        case ORDER_DELIVER_FAIL:
            return {
                ...state,
                delivererror: action.error,
                deliverloading: false,
            }

        case DELIVER_RESET:
            return {
                ...state,
            }
    }
    return state;
}