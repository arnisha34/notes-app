import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
   notes: []
  },
  reducers : {
    addNote: (state, action) => {
      state.notes.push(action.payload)
    },
    getNotes: (state, action) => {
      state.notes = action.payload
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },
    deleteAllNotes: (state) => {
      state.notes = []
    }
  }
})

export const {addNote, getNotes, deleteNote, deleteAllNotes} = noteSlice.actions
export default noteSlice.reducer
