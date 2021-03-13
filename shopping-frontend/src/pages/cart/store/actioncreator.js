import axios from "axios";
import {ADDTOCARTITEM, REMOVECARTITEM} from "./actiontype";

export const addtocart = (id, qty) => {
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
            window.localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartitems))
        } catch (error) {console.log(error)}
    }
}
export const removeitems = (id) => {
    return (dispatch, getState) => {
        dispatch({type: REMOVECARTITEM, id})
        window.localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartitems))
    }
}