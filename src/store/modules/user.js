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
    console.log('请求');
    const res = await loginAPI(loginForm)
    console.log('得到');
    if(res.status===200) {
      dispatch(setToken(res.data.token))
      const userInfo = {
        id: res.data.id,
        userName: res.data.userName,
        balance: res.data.balance,
        account: res.data.account,
      }
      dispatch(setUserInfo(userInfo))
      return true
    } else {
      return false
    }
  }
}

const fetchUserInfo = () =>{
  // return async (dispatch)=>{
  //   const res = await registerAPI()
  //   dispatch(setUserInfo(res.data))
  // }
}

export { setToken, fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer