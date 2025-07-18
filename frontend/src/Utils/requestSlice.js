import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice(({
    name:"requests",
    initialState:[], 
    reducers:{
        addRequest:(state, action)=>{
            return action.payload;
        },
        // removeRequest:(state, action)=>{}
    },
}));

export const{addRequest} = requestSlice.actions
export default requestSlice.reducer;