import axios from "axios";
import {
    GET_PRODUCT_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, ADMIN_UPDATE_PRODUCT_FAIL,
    ADMIN_UPDATE_PRODUCT_REQUEST, ADMIN_UPDATE_PRODUCT_SUCCESS, ADD_REVIEWS_REQUEST, ADD_REVIEWS_SUCCESS, ADD_REVIEWS_FAIL
} from "./actiontype";


export const getProduct = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_PRODUCT_REQUEST
            })
            const result = await axios.get(`/api/product/${id}`);
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                value: result.data
            })
        } catch (error) {
            dispatch({
                type: GET_PRODUCT_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}


export const adminChangeProduct = (id, update) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ADMIN_UPDATE_PRODUCT_REQUEST
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
            const result = await axios.put(`/api/product/${id}`, update, config);
            dispatch({
                type: ADMIN_UPDATE_PRODUCT_SUCCESS,
                value: result.data
            })
        } catch (error) {
            dispatch({
                type: ADMIN_UPDATE_PRODUCT_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}


export const addNewReviews = (id, create) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ADD_REVIEWS_REQUEST
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
             const result=await axios.post(`/api/product/${id}/review`, create, config);
             console.log(result.data)
            dispatch({
                type: ADD_REVIEWS_SUCCESS,
            })
        } catch (error) {
            dispatch({
                type: ADD_REVIEWS_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}

