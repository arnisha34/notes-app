import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    colorTheme: 'light',
    fontTheme: 'font-sans',
  },
  reducers: {
    setColorTheme: (state, action) => {
      state.colorTheme = action.payload
    },
    setFontTheme: (state, action) => {
      state.fontTheme = action.payload
    }
  }
})

export const {setColorTheme, setFontTheme} = themeSlice.actions
export default themeSlice.reducer