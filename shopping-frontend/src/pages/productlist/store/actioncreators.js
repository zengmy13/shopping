import axios from "axios";
import {
    ADMIN_DELETE_PRODUCT_FAIL,
    ADMIN_DELETE_PRODUCT_REQUEST,
    ADMIN_DELETE_PRODUCT_SUCCESS
} from "./actiontype";

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ADMIN_DELETE_PRODUCT_REQUEST
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
           await axios.delete(`/api/product/${id}`, config);
            dispatch({
                type: ADMIN_DELETE_PRODUCT_SUCCESS
            })
        } catch (error) {
            dispatch({
                type: ADMIN_DELETE_PRODUCT_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}






