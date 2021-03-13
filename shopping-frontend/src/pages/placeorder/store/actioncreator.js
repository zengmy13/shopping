import {CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from "./actiontype";
import axios from "axios";


export const createorder = (order) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: CREATE_ORDER_REQUEST
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentuser.token}`
                }
            }
            const result = await axios.post("/api/orders/create", order, config);
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                order: result.data
            })
        } catch (error) {
            dispatch({
                type: CREATE_ORDER_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}



