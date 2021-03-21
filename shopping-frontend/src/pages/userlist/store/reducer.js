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


const defaultValue = {
    allUsers: [],
    allUsersLoading: false,
    allUsersError: null,
    deleteSuccess: false,
    deleteLoading: false,
    deleteError: null,
    user: null,
    userLoading: false,
    userError: null,
    updateLoading: false,
    updateError: null,
    updateSuccess: false,
}

export const allUserReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case ADMIN_ALL_USERS:
            return {
                ...state,
                allUsersLoading: true
            }
        case ADMIN_USERS_SUCCESS:
            return {
                ...state,
                allUsersLoading: false,
                allUsers: action.value,
            }
        case ADMIN_USERS_FAIL:
            return {
                ...state,
                allUsersLoading: false,
                allUsersError: action.error
            }
        case DELETE_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }
        case DELETE_USER:
            return {
                ...state,
                deleteLoading: false,
                deleteSuccess: true,
            }
        case DELETE_FAIL:
            return {
                ...state,
                deleteLoading: false,
                deleteError: action.error
            }
        case ADMIN_USER_DETAIL:
            return {
                ...state,
                userLoading: true
            }
        case ADMIN_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                user: action.value
            }
        case ADMIN_USER_FAIL:
            return {
                ...state,
                userLoading: false,
                userError: action.error
            }
        case ADMIN_USER_RESET: {
            return {
                ...state,
                updateSuccess: false
            }
        }
        case ADMIN_USER_UPDATE:
            return {
                ...state,
                updateLoading: true
            }
        case ADMIN_USER_UPDATE_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                user: action.value,
                updateSuccess: true
            }
        case ADMIN_USER_UPDATE_FAIL:
            return {
                ...state,
                updateLoading: false,
                updateError: action.error
            }
    }
    return state;
}