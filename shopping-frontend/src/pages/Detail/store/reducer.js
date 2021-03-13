import {
    ADD_REVIEWS_FAIL,
    ADD_REVIEWS_REQUEST, ADD_REVIEWS_SUCCESS,
    ADMIN_PRODUCT_RESET,
    ADMIN_UPDATE_PRODUCT_FAIL,
    ADMIN_UPDATE_PRODUCT_REQUEST,
    ADMIN_UPDATE_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS
} from "./actiontype";

const defaultvalue = {
    product: null,
    productloading: false,
    producterror: null,
    updateloading: false,
    updateerror: null,
    updatesuccess: false,
    addreviewsuccess: false,
    addreviewloading: false,
    addreviewerror: null
}

export const detailreducer = (state = defaultvalue, action) => {
    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                productloading: true
            }
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.value,
                productloading: false,
            }
        case GET_PRODUCT_FAIL:
            return {
                ...state,
                productloading: false,
                producterror: action.error
            }
        case ADMIN_UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                updateloading: true
            }
        case ADMIN_UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                updateloading: false,
                updatesuccess: true
            }
        case ADMIN_UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                updateloading: false,
                updateerror: action.error,
            }
        case ADMIN_PRODUCT_RESET:
            return {
                ...state,
                product: null,
                updatesuccess: false,
            }
        case ADD_REVIEWS_REQUEST:
            return {
                ...state,
                addreviewloading: true
            }
        case ADD_REVIEWS_SUCCESS:
            return {
                ...state,
                addreviewloading: false,
                addreviewsuccess: true
            }
        case ADD_REVIEWS_FAIL:
            return {
                ...state,
                addreviewloading: false,
                addreviewerror: action.error
            }
    }
    return state;
}