import {SAVE_ADDRESS} from "./actiontype";


const getshippingaddressfromlocal = window.localStorage.getItem("address") ? JSON.parse(window.localStorage.getItem("address")) : null
const defaultvalue = {
    shippingaddress: getshippingaddressfromlocal
}
export const addressreducer = (state = defaultvalue, action) => {
    switch (action.type) {
        case SAVE_ADDRESS:
            return {
                ...state,
                shippingaddress: action.address
            }
    }
    return state;
}