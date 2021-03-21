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

const defaultValue = {
    product: null,
    productLoading: false,
    productError: null,
    updateLoading: false,
    updateError: null,
    updateSuccess: false,
    addReviewSuccess: false,
    addReviewLoading: false,
    addReviewError: null
}

export const detailReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                productLoading: true
            }
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.value,
                productLoading: false,
            }
        case GET_PRODUCT_FAIL:
            return {
                ...state,
                productLoading: false,
                productError: action.error
            }
        case ADMIN_UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                updateLoading: true
            }
        case ADMIN_UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                updateSuccess: true
            }
        case ADMIN_UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                updateLoading: false,
                updateError: action.error,
            }
        case ADMIN_PRODUCT_RESET:
            return {
                ...state,
                product: null,
                updateSuccess: false,
            }
        case ADD_REVIEWS_REQUEST:
            return {
                ...state,
                addReviewLoading: true
            }
        case ADD_REVIEWS_SUCCESS:
            return {
                ...state,
                addReviewLoading: false,
                addReviewSuccess: true
            }
        case ADD_REVIEWS_FAIL:
            return {
                ...state,
                addReviewLoading: false,
                addReviewError: action.error
            }
    }
    return state;
}