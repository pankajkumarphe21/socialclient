import {createSlice } from '@reduxjs/toolkit';

const initialState={
    darkMode:false
}

export const darkModeSlice=createSlice({
    name:'dark',
    initialState,
    reducers:{
        updateDarkMode:(state)=>{
            state.darkMode=!(state.darkMode)
        },
    }
})

export const {updateDarkMode} = darkModeSlice.actions;

export default darkModeSlice.reducer