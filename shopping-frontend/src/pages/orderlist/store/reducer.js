import {ADMIN_GET_ORDERS_FAIL,
    ADMIN_GET_ORDERS_REQUEST, ADMIN_GET_ORDERS_SUCCESS
} from "./actiontype";


const defaultValue = {
    allOrders: [],
    allOrdersLoading: false,
    allOrdersError: null,

}

export const allOrdersReducer = (state = defaultValue, action) => {

    switch (action.type) {
        case ADMIN_GET_ORDERS_REQUEST:
            return {
                ...state,
                allOrdersLoading: true
            }
        case ADMIN_GET_ORDERS_SUCCESS:
            return {
                ...state,
                allOrdersLoading: false,
                allOrders: action.value,
            }
        case ADMIN_GET_ORDERS_FAIL:
            return {
                ...state,
                allOrdersError: action.error,
                allOrdersLoading: false
            }
    }
    return state;
}