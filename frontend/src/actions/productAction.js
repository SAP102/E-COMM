import axios from "axios"

import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
    NEW_REVIEV_SUCCESS,
    NEW_REVIEV_REQUEST,
    NEW_REVIEV_FAIL,
    CLEAR_ERRORS
} from "../constants/productConstants"

export const getProductlimit = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })
        const { data } = await axios.get(`/api/v1/productslimit?limit=3`)
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.error,
        })
    }
}

export const getAllProduct = (page = 1, minPrice = 0, maxPrice = 500000000) => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_REQUEST })
        let url = `/api/v1/products?price[gte]=${minPrice}&price[lte]=${maxPrice}&page=${page}`
        const { data } = await axios.get(url)
        dispatch({
            type: PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_FAIL,
            payload: error.response.data.error,
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.error,
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEV_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/review`, reviewData, config)
        dispatch({
            type: NEW_REVIEV_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEV_FAIL,
            payload: error.response.data.error,
        })
    }
}

// Admin Auth




export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}