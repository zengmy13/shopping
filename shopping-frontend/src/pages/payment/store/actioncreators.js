import {ADD_PAYMENT_METHOD} from "./actiontypes";

export const addpaymentmethod = (payment) => {
    return (dispatch) => {
        dispatch({
            type: ADD_PAYMENT_METHOD,
            payment
        })
        window.localStorage.setItem("payment", JSON.stringify(payment))
    }
}