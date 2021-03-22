import axios from "axios";
import {
    GET_ORDER_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_PAYPAL_FAIL,
    ORDER_PAYPAL_REQUEST,
    ORDER_PAYPAL_SUCCESS
} from "./actiontype";

export const getOrder = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_ORDER_REQUEST
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
            const result = await axios.get(`/api/orders/${id}`, config);
            dispatch({
                type: GET_ORDER_SUCCESS,
                order: result.data
            })
        } catch (error) {
            dispatch({
                type: GET_ORDER_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}


export const updatePaypal = (id, paymentresult) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ORDER_PAYPAL_REQUEST
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
            const result = await axios.put(`/api/orders/${id}`, paymentresult, config);
            dispatch({
                type: ORDER_PAYPAL_SUCCESS,
                order: result.data
            })
        } catch (error) {
            dispatch({
                type: ORDER_PAYPAL_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}


export const updateDeliver = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ORDER_DELIVER_REQUEST
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
            await axios.put(`/api/orders/${id}/deliver`, {}, config)
            dispatch({
                type: ORDER_DELIVER_SUCCESS,
            })
        } catch (error) {
            dispatch({
                type: ORDER_DELIVER_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}