import {ADMIN_DELETE_PRODUCT_FAIL, ADMIN_DELETE_PRODUCT_REQUEST, ADMIN_DELETE_PRODUCT_SUCCESS} from "./actiontype";


const defaultvalue = {
    deletesuccess: false,
    deleteloading: false,
    deleteerror: null,

}

export const allproductsreducer = (state = defaultvalue, action) => {

    switch (action.type) {

        case ADMIN_DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                deleteloading: true
            }
        case ADMIN_DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                deleteloading: false,
                deletesuccess: true
            }
        case ADMIN_DELETE_PRODUCT_FAIL:
            return {
                ...state,
                deleteloading: false,
                deleteerror: action.error,
            }


    }
    return state;
}