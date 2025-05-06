import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './themeSlice'
import dialogReducer from './dialogSlice'
import authReducer from './authSlice'
import notesReducer from './noteSlice'


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    dialog: dialogReducer,
    auth: authReducer,
    notes: notesReducer
  }
})