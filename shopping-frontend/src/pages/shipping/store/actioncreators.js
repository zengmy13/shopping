import {SAVE_ADDRESS} from "./actiontype";


export const saveAddress = (address) => {
    return (dispatch) => {
        dispatch({
            type: SAVE_ADDRESS,
            address
        })
        window.localStorage.setItem("address", JSON.stringify(address))
    }
}