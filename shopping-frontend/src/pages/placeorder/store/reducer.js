import {CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from "./actiontype";
const defaultValue = {
    order: null,
    orderLoading: false,
    orderError: null,
    successOrder: false
}
export const orderReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                orderLoading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orderLoading: false,
                order: action.order,
                successOrder: true
            }
        case CREATE_ORDER_FAIL:
            return {
                ...state,
                orderLoading: false,
                orderError: action.error
            }
    }
    return state;
}