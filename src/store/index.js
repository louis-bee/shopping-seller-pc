import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user.js";

export default configureStore({
  reducer:{
    user: userReducer
  }
})