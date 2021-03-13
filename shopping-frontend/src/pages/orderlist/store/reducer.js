import {ADMIN_GET_ORDERS_FAIL,
    ADMIN_GET_ORDERS_REQUEST, ADMIN_GET_ORDERS_SUCCESS
} from "./actiontype";


const defaultvalue = {
    allorders: [],
    allordersloading: false,
    allorderserror: null,

}

export const allordersreducer = (state = defaultvalue, action) => {

    switch (action.type) {
        case ADMIN_GET_ORDERS_REQUEST:
            return {
                ...state,
                allordersloading: true
            }
        case ADMIN_GET_ORDERS_SUCCESS:
            return {
                ...state,
                allordersloading: false,
                allorders: action.value,
            }
        case ADMIN_GET_ORDERS_FAIL:
            return {
                ...state,
                allorderserror: action.error,
                allordersloading: false
            }
    }
    return state;
}