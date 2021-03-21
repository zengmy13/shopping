import {
    GET_ALL_ORDERS, GET_ALL_ORDERS_FAIL, GET_ALL_ORDERS_SUCCESS,
    GET_PROFILE_FAIL,
    GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS,
    LOG_OUT, LOG_RESET,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, PROFILE_RESET,
    REGISTER_FAIL,
    REGISTER_REQUEST, REGISTER_RESET,
    REGISTER_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS
} from "./actiontype";


const getUserFromLocal = window.localStorage.getItem("userdata") ? JSON.parse(window.localStorage.getItem("userdata")) : null
const defaultValue = {
    currentUser: getUserFromLocal,
    loginLoading: false,
    loginError: null,
    registerLoading: false,
    registerError: null,
    updateLoading: false,
    updateError: null,
    profile: null,
    profileLoading: false,
    profileError: null,
    allOrders: [],
    allOrdersLoading: false,
    allOrdersError: null
}

export const loginReducer = (state = defaultValue, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loginLoading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                currentUser: action.value,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loginLoading: false,
                loginError: action.error
            }
        case LOG_OUT:
            return {
                ...state,
                currentUser: null
            }
        case REGISTER_REQUEST:
            return {
                ...state,
                registerLoading: true,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerLoading: false,
                currentUser: {
                    ...state.currentUser,
                    ...action.value
                }
            }
        case REGISTER_FAIL:
            return {
                ...state,
                registerError: action.error,
                registerLoading: false
            }
        case LOG_RESET:
            return {
                ...state,
                loginLoading: false,
                loginError: null
            }
        case REGISTER_RESET:
            return {
                ...state,
                registerLoading: false,
                registerError: null
            }
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                updateLoading: true
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                currentUser: action.value,
                profile: action.value,
            }
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                updateLoading: false,
                updateError: action.error
            }
        case GET_PROFILE_REQUEST:
            return {
                ...state,
                profileLoading: true
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profileLoading: false,
                profile: action.value
            }
        case GET_PROFILE_FAIL:
            return {
                ...state,
                profileLoading: false,
                profileError: action.error
            }
        case PROFILE_RESET:
            return {
                ...state,
                profile: null,
                profileLoading: false,
                profileError: null,
            }
        case GET_ALL_ORDERS:
            return {
                ...state,
                allOrdersLoading: true
            }
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                allOrdersLoading: false,
                allOrders: action.value
            }
        case GET_ALL_ORDERS_FAIL:
            return {
                ...state,
                allOrdersLoading: false,
                allOrdersError: action.error
            }
    }
    return state;
}