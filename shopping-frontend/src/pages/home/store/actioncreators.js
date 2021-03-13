import axios from "axios";
import {GET_PRODUCTS_FAIL, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, ADMIN_CREATE_PRODUCT_FAIL,
    ADMIN_CREATE_PRODUCT_REQUEST,
    ADMIN_CREATE_PRODUCT_SUCCESS, GET_TOP_PRODUCTS_REQUEST, GET_TOP_PRODUCTS_SUCCESS, GET_TOP_PRODUCTS_FAIL
} from "./actiontype";


export const getproducts = (keyword = "", page) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_PRODUCTS_REQUEST
            })
            const result = await axios.get(`/api/products?keyword=${keyword}&page=${page}`)
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                value: result.data
            })
        } catch (error) {
            dispatch({
                type: GET_PRODUCTS_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}


export const admincreateproduct = (create) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ADMIN_CREATE_PRODUCT_REQUEST
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentuser.token}`
                }
            }
            const result = await axios.post(`/api/product`, create, config);

            dispatch({
                type: ADMIN_CREATE_PRODUCT_SUCCESS,
                value: result.data
            })
        } catch (error) {
            dispatch({
                type: ADMIN_CREATE_PRODUCT_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}


export const gettopproducts = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_TOP_PRODUCTS_REQUEST
            })
            const result = await axios.get(`/api/products/top`);
            dispatch({
                type: GET_TOP_PRODUCTS_SUCCESS,
                value: result.data
            })
        } catch (error) {
            dispatch({
                type: GET_TOP_PRODUCTS_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}

