import {
    ADMIN_ALL_USERS,
    ADMIN_USER_DETAIL,
    ADMIN_USER_FAIL, ADMIN_USER_RESET,
    ADMIN_USER_SUCCESS,
    ADMIN_USER_UPDATE, ADMIN_USER_UPDATE_FAIL,
    ADMIN_USER_UPDATE_SUCCESS,
    ADMIN_USERS_FAIL,
    ADMIN_USERS_SUCCESS,
    DELETE_FAIL,
    DELETE_REQUEST,
    DELETE_USER,

} from "./actiontype";


const defaultvalue = {
    allusers: [],
    allusersloading: false,
    alluserserror: null,
    deletesuccess: false,
    deleteloading: false,
    deleteerror: null,
    user: null,
    userloading: false,
    usererror: null,
    updateloading: false,
    updateerror: null,
    updatesuccess: false,
}

export const alluserreducer = (state = defaultvalue, action) => {
    switch (action.type) {
        case ADMIN_ALL_USERS:
            return {
                ...state,
                allusersloading: true
            }
        case ADMIN_USERS_SUCCESS:
            return {
                ...state,
                allusersloading: false,
                allusers: action.value,
            }
        case ADMIN_USERS_FAIL:
            return {
                ...state,
                allusersloading: false,
                alluserserror: action.error
            }
        case DELETE_REQUEST:
            return {
                ...state,
                deleteloading: true
            }
        case DELETE_USER:
            return {
                ...state,
                deleteloading: false,
                deletesuccess: true,
            }
        case DELETE_FAIL:
            return {
                ...state,
                deleteloading: false,
                deleteerror: action.error
            }
        case ADMIN_USER_DETAIL:
            return {
                ...state,
                userloading: true
            }
        case ADMIN_USER_SUCCESS:
            return {
                ...state,
                userloading: false,
                user: action.value
            }
        case ADMIN_USER_FAIL:
            return {
                ...state,
                userloading: false,
                usererror: action.error
            }
        case ADMIN_USER_RESET: {
            return {
                ...state,
                updatesuccess: false
            }
        }
        case ADMIN_USER_UPDATE:
            return {
                ...state,
                updateloading: true
            }
        case ADMIN_USER_UPDATE_SUCCESS:
            return {
                ...state,
                updateloading: false,
                user: action.value,
                updatesuccess: true
            }
        case ADMIN_USER_UPDATE_FAIL:
            return {
                ...state,
                updateloading: false,
                updateerror: action.error
            }
    }
    return state;
}