import {
    DELIVER_RESET,
    GET_ORDER_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_PAYPAL_FAIL,
    ORDER_PAYPAL_REQUEST,
    ORDER_PAYPAL_SUCCESS, ORDER_RESET
} from "./actiontype";


const defaultValue={
    orderDetail:null,
    orderLoading:false,
    orderError:null,
    paypal:false,
    paypalLoading:false,
    paypalError:null,
    deliverSuccess:false,
    deliverLoading:false,
    deliverError:null
}

export const finalOrderReducer=(state=defaultValue,action)=>{

    switch(action.type){
        case GET_ORDER_REQUEST:
            return {
                ...state,
                orderLoading: true
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderLoading: false,
                orderDetail:action.order
            }
        case GET_ORDER_FAIL:
            return {
                ...state,
                orderError: action.error,
                orderLoading: false,
            }
        case ORDER_PAYPAL_REQUEST:
            return {
                ...state,
                paypalLoading: true
            }
        case ORDER_PAYPAL_SUCCESS:
            return {
                ...state,
                paypalLoading: false,
                paypal:true
            }
        case ORDER_PAYPAL_FAIL:
            return {
                ...state,
                paypalError: action.error,
                paypalLoading: false,
            }
        case ORDER_RESET:
            return {
                ...state,
                // orderDetail: null
            }
        case ORDER_DELIVER_REQUEST:
            return {
                ...state,
                deliverLoading: true
            }
        case ORDER_DELIVER_SUCCESS:
            return {
                ...state,
                deliverLoading: false,
                deliverSuccess:true
            }
        case ORDER_DELIVER_FAIL:
            return {
                ...state,
                deliverError: action.error,
                deliverLoading: false,
            }

        case DELIVER_RESET:
            return {
                ...state,
            }
    }
    return state;
}