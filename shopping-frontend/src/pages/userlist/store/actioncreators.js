import axios from "axios";
import {
    ADMIN_ALL_USERS,
    ADMIN_USER_DETAIL,
    ADMIN_USER_FAIL,
    ADMIN_USER_SUCCESS,
    ADMIN_USER_UPDATE, ADMIN_USER_UPDATE_FAIL,
    ADMIN_USER_UPDATE_SUCCESS,
    ADMIN_USERS_FAIL,
    ADMIN_USERS_SUCCESS,
    DELETE_FAIL,
    DELETE_REQUEST,
    DELETE_USER
} from "./actiontype";


export const adminGetAllUsers = (order) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ADMIN_ALL_USERS
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
            const result = await axios.get("/api/users", config);
            dispatch({
                type: ADMIN_USERS_SUCCESS,
                value: result.data
            })
        } catch (error) {
            dispatch({
                type: ADMIN_USERS_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}


export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: DELETE_REQUEST
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
            await axios.delete(`/api/users/${id}`, config);
            dispatch({
                type: DELETE_USER
            })
        } catch (error) {
            dispatch({
                type: DELETE_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}


export const adminGetUserDetail = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ADMIN_USER_DETAIL
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
            const result = await axios.get(`/api/users/admin/${id}`, config);
            dispatch({
                type: ADMIN_USER_SUCCESS,
                value: result.data
            })
        } catch (error) {
            dispatch({
                type: ADMIN_USER_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}


export const adminUpdateUser = (id, update) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ADMIN_USER_UPDATE
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.currentUser.token}`
                }
            }
            const result = await axios.put(`/api/users/${id}`, update, config);
            dispatch({
                type: ADMIN_USER_UPDATE_SUCCESS,
                value: result.data
            })
        } catch (error) {
            dispatch({
                type: ADMIN_USER_UPDATE_FAIL,
                error: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })
        }
    }
}