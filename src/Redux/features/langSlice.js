import { createSlice } from "@reduxjs/toolkit";

const initialState = {lang: 'az'}

const langSlice = createSlice({
    name: 'lang',
    initialState,
    reducers:{
        setLang: (state, action) => {
            if(action.payload === 'az'){
                state.lang = 'az-AZ'
            }else if(action.payload === 'en'){
                state.lang = 'en-EN'
            }else if(action.payload === 'ru'){
                state.lang = 'ru-RU'
            }
        }
    }
})

export const {setLang} = langSlice.actions;
export default langSlice.reducer;