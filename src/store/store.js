import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './themeSlice'
import dialogReducer from './dialogSlice'
import authReducer from './authSlice'


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    dialog: dialogReducer,
    auth: authReducer
  }
})