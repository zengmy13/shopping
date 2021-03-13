import {CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from "./actiontype";
const defaultvalue = {
    order: null,
    orderloading: false,
    ordererror: null,
    successorder: false
}
export const orderreducer = (state = defaultvalue, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                orderloading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orderloading: false,
                order: action.order,
                successorder: true
            }
        case CREATE_ORDER_FAIL:
            return {
                ...state,
                orderloading: false,
                ordererror: action.error
            }
    }
    return state;
}