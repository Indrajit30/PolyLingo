import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  signupData:null,
  loading:false,
  token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
  isAuthentecated:false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setIsAuthenticated(state, value) {
      state.isAuthentecated = value.payload;
    }
  }
  },
)

export const { setToken, setLoading, setSignupData, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;