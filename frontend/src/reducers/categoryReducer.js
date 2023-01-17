import {
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATAEGORY_FAIL,
    CLEAR_ERRORS
} from "../constants/productConstants"


export const categoryReducer = (state = { category: [] }, action) => {
    switch (action.type) {
        case ALL_CATEGORY_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case ALL_CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload.AllproductCategory,
            }
        case ALL_CATAEGORY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}