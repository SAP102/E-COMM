import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
    userProfile: null
}

const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserProfile: (state, action) => {
            state.userProfile = action.payload
        }
    }
})

export const {
    setUserProfile,
} = loginSlice.actions

const { reducer } = loginSlice;
export default reducer;