import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_SUCCESS,
    PRODUCT_REQUEST,
    PRODUCT_FAIL,
    NEW_REVIEV_SUCCESS,
    NEW_REVIEV_REQUEST,
    NEW_REVIEV_RESET,
    NEW_REVIEV_FAIL,
    CLEAR_ERRORS
} from "../constants/productConstants"

export const productlimitReducer = (state = { productslimit: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                productslimit: [],
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                productslimit: action.payload.productlimit,
                productsCount: action.payload.filteredProductsCount
            }
        case ALL_PRODUCT_FAIL:
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

export const AllproductReducer = (state = { allProduct: [] }, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return {
                loading: true,
                allProduct: [],
            };
        case PRODUCT_SUCCESS:
            return {
                loading: false,
                allProduct: action.payload.products,
                productsCount: action.payload.productCount,
                resultsPerPage: action.payload.resultPerPage,
                filteredProductCount: action.payload.filteredProductsCount
            }
        case PRODUCT_FAIL:
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

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }
        case PRODUCT_DETAILS_FAIL:
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

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEV_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_REVIEV_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            }
        case NEW_REVIEV_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NEW_REVIEV_RESET:
            return {
                ...state,
                success: false
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

// Admin

