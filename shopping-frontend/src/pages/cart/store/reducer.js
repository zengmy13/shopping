import {ADDTOCARTITEM, REMOVECARTITEM, RESET_CART} from "./actiontype";


const cartItemsFromLocalStorage = window.localStorage.getItem("cartItems")
    ? JSON.parse(window.localStorage.getItem("cartItems")) : []
const defaultValue = {
    cartItems: cartItemsFromLocalStorage
}


export const cartReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case ADDTOCARTITEM:
            const item = action.value;
            const exist = state.cartItems.find(x => x._id === item._id);
            if (exist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x._id === exist._id ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVECARTITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x._id !== action.id)
            }
        case RESET_CART:
            return {
                ...state,
                cartItems: [],
            }
    }
    return state;
}