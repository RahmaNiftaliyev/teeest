import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loading: false
};

const loadingSpinnerSlice = createSlice({
    name: 'loadingSpinner',
    initialState,
    reducers: {
        setLoading: (state, action) =>{
            state.loading = action.payload
        }
    }
}) 

export default loadingSpinnerSlice.reducer;
export const {setLoading} = loadingSpinnerSlice.actions;