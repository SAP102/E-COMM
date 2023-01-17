import axios from "axios"
import {
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATAEGORY_FAIL,
    CLEAR_ERRORS
} from "../constants/productConstants"

export const getCategory = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_REQUEST })
        const { data } = await axios.get(`/api/v1/productCategory`)
        dispatch({
            type: ALL_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_CATAEGORY_FAIL,
            payload: error.response.data.error,
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}