import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
  user: localStorage.getItem('user') ?JSON.parse(localStorage.getItem('user')) :null,
  loading:false,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setLoding(state, value) {
      state.loading = value.payload;
    }
  },

});

export const { setUser, setLoding } = profileSlice.actions;
export default profileSlice.reducer;

