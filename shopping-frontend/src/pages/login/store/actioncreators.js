import axios from "axios";
import {
    GET_ALL_ORDERS, GET_ALL_ORDERS_FAIL, GET_ALL_ORDERS_SUCCESS,
    GET_PROFILE_FAIL,
    GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS,
    LOG_OUT,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, PROFILE_RESET,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS
} from "./actiontype";
import {RESET_CART} from "../../cart/store/actiontype";


export const login = (email, password) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: LOGIN_REQUEST
            })
            const result = await axios.post("/api/users/login", {
                email: email,
                password: password
            });
            dispatch({
                type: LOGIN_SUCCESS,
                value: result.data
            })
            window.localStorage.setItem("userdata", JSON.stringify(getState().login.currentUser))

        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: PROFILE_RESET
        })
        dispatch({
            type: RESET_CART
        })
        dispatch({
            type: LOG_OUT
        })
        window.localStorage.removeItem("cartItems");
        window.localStorage.removeItem("userdata");
    }
}


export const register = (email, password, name) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: REGISTER_REQUEST
            })
            const result = await axios.post("/api/users/register", {
                email: email,
                password: password,
                name: name
            });
            dispatch({
                type: REGISTER_SUCCESS,
                value: result.data
            })
            window.localStorage.setItem("userdata", JSON.stringify(getState().login.currentUser))

        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}

export const updateProfile = ({name, email, password}) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: UPDATE_PROFILE_REQUEST
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
            const result = await axios.put(`/api/users/profile`, {
                name: name, email: email, password: password
            }, config);
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                value: result.data
            })
            window.localStorage.setItem("userdata", JSON.stringify(result.data))
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}


export const getProfile = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_PROFILE_REQUEST
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
            const result = await axios.get(`/api/users/${id}`, config);
            dispatch({
                type: GET_PROFILE_SUCCESS,
                value: result.data
            })
        } catch (error) {
            dispatch({
                type: GET_PROFILE_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}


export const getAllOrders = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_ALL_ORDERS
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
            const result = await axios.get(`/api/orders/allOrders`, config);
            dispatch({
                type: GET_ALL_ORDERS_SUCCESS,
                value: result.data
            })
        } catch (error) {
            dispatch({
                type: GET_ALL_ORDERS_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}




