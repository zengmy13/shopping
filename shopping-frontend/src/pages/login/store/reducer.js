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


const getuserfromlocal = window.localStorage.getItem("userdata") ? JSON.parse(window.localStorage.getItem("userdata")) : null
const defaultvalue = {
    currentuser: getuserfromlocal,
    loginloading: false,
    loginerror: null,
    registerloading: false,
    registererror: null,
    updateloading: false,
    updateerror: null,
    profile: null,
    profileloading: false,
    profileerror: null,
    allorders: [],
    allordersloading: false,
    allorderserror: null
}

export const loginreducer = (state = defaultvalue, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loginloading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginloading: false,
                currentuser: action.value,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loginloading: false,
                loginerror: action.error
            }
        case LOG_OUT:
            return {
                ...state,
                currentuser: null
            }
        case REGISTER_REQUEST:
            return {
                ...state,
                registerloading: true,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerloading: false,
                currentuser: {
                    ...state.currentuser,
                    ...action.value
                }
            }
        case REGISTER_FAIL:
            return {
                ...state,
                registererror: action.error,
                registerloading: false
            }
        case LOG_RESET:
            return {
                ...state,
                loginloading: false,
                loginerror: null
            }
        case REGISTER_RESET:
            return {
                ...state,
                registerloading: false,
                registererror: null
            }
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                updateloading: true
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updateloading: false,
                currentuser: action.value,
                profile: action.value,
            }
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                updateloading: false,
                updateerror: action.error
            }
        case GET_PROFILE_REQUEST:
            return {
                ...state,
                profileloading: true
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profileloading: false,
                profile: action.value
            }
        case GET_PROFILE_FAIL:
            return {
                ...state,
                profileloading: false,
                profileerror: action.error
            }
        case PROFILE_RESET:
            return {
                ...state,
                profile: null,
                profileloading: false,
                profileerror: null,
            }
        case GET_ALL_ORDERS:
            return {
                ...state,
                allordersloading: true
            }
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                allordersloading: false,
                allorders: action.value
            }
        case GET_ALL_ORDERS_FAIL:
            return {
                ...state,
                allordersloading: false,
                allorderserror: action.error
            }
    }
    return state;
}