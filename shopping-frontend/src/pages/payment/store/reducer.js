import {ADD_PAYMENT_METHOD} from "./actiontypes";


const defaultValue = {
    paymentMethod:
        window.localStorage.getItem("payment") ? JSON.parse(window.localStorage.getItem("payment")) : null
}
export const paymentreducer = (state = defaultValue, action) => {
    switch (action.type) {
        case ADD_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payment
            }
    }
    return state;
}