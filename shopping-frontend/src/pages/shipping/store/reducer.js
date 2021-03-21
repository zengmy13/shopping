import {SAVE_ADDRESS} from "./actiontype";


const getAhippingAddressFromLocal = window.localStorage.getItem("address") ? JSON.parse(window.localStorage.getItem("address")) : null
const defaultValue = {
    shippingAddress: getAhippingAddressFromLocal
}
export const addressReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case SAVE_ADDRESS:
            return {
                ...state,
                shippingAddress: action.address
            }
    }
    return state;
}