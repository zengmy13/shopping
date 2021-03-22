import {ADMIN_DELETE_PRODUCT_FAIL, ADMIN_DELETE_PRODUCT_REQUEST, ADMIN_DELETE_PRODUCT_SUCCESS} from "./actiontype";


const defaultValue = {
    deleteSuccess: false,
    deleteLoading: false,
    deleteError: null,

}

export const allProductsReducer = (state = defaultValue, action) => {
    switch (action.type) {

        case ADMIN_DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }
        case ADMIN_DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                deleteLoading: false,
                deleteSuccess: true
            }
        case ADMIN_DELETE_PRODUCT_FAIL:
            return {
                ...state,
                deleteLoading: false,
                deleteError: action.error,
            }
    }
    return state;
}