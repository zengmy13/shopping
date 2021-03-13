import {ADDTOCARTITEM, REMOVECARTITEM, RESET_CART} from "./actiontype";


const cartitemsfromlocalstorage = window.localStorage.getItem("cartitems")
    ? JSON.parse(window.localStorage.getItem("cartitems"))
    : []
const defaultvalue = {
    cartitems: cartitemsfromlocalstorage
}


export const cartreducer = (state = defaultvalue, action) => {
    switch (action.type) {
        case ADDTOCARTITEM:
            const item = action.value;
            const exist = state.cartitems.find(x => x._id === item._id);
            if (exist) {
                return {
                    ...state,
                    cartitems: state.cartitems.map(x => x._id === exist._id ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartitems: [...state.cartitems, item]
                }
            }
        case REMOVECARTITEM:
            return {
                ...state,
                cartitems: state.cartitems.filter(x => x._id !== action.id)
            }
        case RESET_CART:
            return {
                ...state,
                cartitems: [],
            }
    }
    return state;
}