import axios from "axios";
import {ADDTOCARTITEM, REMOVECARTITEM} from "./actiontype";

export const addToCart = (id, qty) => {
    return async (dispatch, getState) => {
        try {
            const result = await axios.get(`/api/product/${id}`);
            dispatch({
                type: ADDTOCARTITEM,
                value: {
                    ...result.data,
                    qty: qty
                }
            })
            window.localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
        } catch (error) {console.log(error)}
    }
}
export const removeItems = (id) => {
    return (dispatch, getState) => {
        dispatch({type: REMOVECARTITEM, id})
        window.localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    }
}