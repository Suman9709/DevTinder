import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,

    reducers: {
        addUser: (state, action) => {
            return action.payload;  //whatever i am passing the data will be set to user slice   
        },
        removeUser: (state, action) => {
            return null;
        }
    },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;