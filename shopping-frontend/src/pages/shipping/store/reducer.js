import {SAVE_ADDRESS} from "./actiontype";


const getShippingAddressFromLocal = window.localStorage.getItem("address") ? JSON.parse(window.localStorage.getItem("address")) : null
const defaultValue = {
    shippingAddress: getShippingAddressFromLocal
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