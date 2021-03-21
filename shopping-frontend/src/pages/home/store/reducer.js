import {
    ADMIN_CREATE_PRODUCT_FAIL,
    ADMIN_CREATE_PRODUCT_REQUEST, ADMIN_CREATE_PRODUCT_SUCCESS, CREATE_RESET,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS, GET_TOP_PRODUCTS_FAIL, GET_TOP_PRODUCTS_REQUEST, GET_TOP_PRODUCTS_SUCCESS
} from "./actiontype";


const defaultValue = {
    products: [],
    productsLoading: false,
    productsError: null,
    createLoading: false,
    createError: null,
    createSuccess: false,
    top: [],
    topLoading: false,
    topError: null,
    totalPage: 1,
    pageNum: 1
}

export const homeReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                productsLoading: true
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.value.products,
                totalPage: action.value.totalPage,
                pageNum: action.value.page,
                productsLoading: false,
            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                productsLoading: false,
                productsError: action.error
            }
        case ADMIN_CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                createLoading: true
            }
        case ADMIN_CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                createLoading: false,
                products: [...state.products, action.value],
                createSuccess: true
            }
        case ADMIN_CREATE_PRODUCT_FAIL:
            return {
                ...state,
                createLoading: false,
                createError: action.error,
            }
        case GET_TOP_PRODUCTS_REQUEST:
            return {
                ...state,
                topLoading: true
            }
        case GET_TOP_PRODUCTS_SUCCESS:
            return {
                ...state,
                topLoading: false,
                top: action.value
            }
        case GET_TOP_PRODUCTS_FAIL:
            return {
                ...state,
                topLoading: false,
                topError: action.value
            }
        case CREATE_RESET:
            return {
                ...state,
                createSuccess: false
            }
    }
    return state;
}