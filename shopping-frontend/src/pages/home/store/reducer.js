import {
    ADMIN_CREATE_PRODUCT_FAIL,
    ADMIN_CREATE_PRODUCT_REQUEST, ADMIN_CREATE_PRODUCT_SUCCESS, CREATE_RESET,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS, GET_TOP_PRODUCTS_FAIL, GET_TOP_PRODUCTS_REQUEST, GET_TOP_PRODUCTS_SUCCESS
} from "./actiontype";


const defaultvalue = {
    products: [],
    productsloading: false,
    productserror: null,
    createloading: false,
    createerror: null,
    createsuccess: false,
    top: [],
    toploading: false,
    toperror: null,
    totalpage: 1,
    pagenum: 1
}

export const homereducer = (state = defaultvalue, action) => {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                productsloading: true
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.value.products,
                totalpage: action.value.totalpage,
                pagenum: action.value.page,
                productsloading: false,
            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                productsloading: false,
                productserror: action.error
            }
        case ADMIN_CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                createloading: true
            }
        case ADMIN_CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                createloading: false,
                products: [...state.products, action.value],
                createsuccess: true
            }
        case ADMIN_CREATE_PRODUCT_FAIL:
            return {
                ...state,
                createloading: false,
                createerror: action.error,
            }
        case GET_TOP_PRODUCTS_REQUEST:
            return {
                ...state,
                toploading: true
            }
        case GET_TOP_PRODUCTS_SUCCESS:
            return {
                ...state,
                toploading: false,
                top: action.value
            }
        case GET_TOP_PRODUCTS_FAIL:
            return {
                ...state,
                toploading: false,
                toperror: action.value
            }
        case CREATE_RESET:
            return {
                ...state,
                createsuccess: false
            }
    }
    return state;
}