import axios from "axios";
import {ADMIN_GET_ORDERS_FAIL, ADMIN_GET_ORDERS_REQUEST, ADMIN_GET_ORDERS_SUCCESS} from "./actiontype";

export const adminGetAllOrders = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ADMIN_GET_ORDERS_REQUEST
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
            const result = await axios.get(`/api/orders/admin/all`, config);
            dispatch({
                type: ADMIN_GET_ORDERS_SUCCESS,
                value: result.data
            })
        } catch (error) {
            dispatch({
                type: ADMIN_GET_ORDERS_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}
