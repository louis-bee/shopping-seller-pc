import { createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "@/apis/user.js";

const userStore =  createSlice({
  name: "user",
  initialState:{
    token: localStorage.getItem('token') || '',
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },
    setUserInfo(state,action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      localStorage.removeItem('token')
    }
  }
})

const { setToken, setUserInfo ,clearUserInfo } = userStore.actions

const userReducer = userStore.reducer

const fetchLogin = (loginForm) =>{
  return async (dispatch)=>{
    const res = await loginAPI(loginForm)
    if(res.status===200) {
      dispatch(setToken(res.data.token))
      const userInfo = {
        id: res.data.id,
        userName: res.data.userName,
        balance: res.data.balance,
        account: res.data.account,
      }
      dispatch(setUserInfo(userInfo))
    }
    return res
  }
}

export { setToken, fetchLogin, clearUserInfo }

export default userReducer