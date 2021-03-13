import {ADD_PAYMENT_METHOD} from "./actiontypes";


const getpaymentmethodfromlocal = window.localStorage.getItem("payment") ? JSON.parse(window.localStorage.getItem("payment")) : null
const defaultvalue = {
    paymentmethod: getpaymentmethodfromlocal
}
export const paymentreducer = (state = defaultvalue, action) => {
    switch (action.type) {
        case ADD_PAYMENT_METHOD:
            return {
                ...state,
                paymentmethod: action.payment
            }
    }
    return state;
}