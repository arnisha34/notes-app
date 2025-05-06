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
    updateNote: (state, action) => {
      const noteIdx = state.notes.findIndex(note => note.id === action.payload.id)
      if(noteIdx !== -1){
        state.notes[noteIdx] = {...state.notes[noteIdx], ...action.payload}
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload.id)
    },
    deleteAllNotes: (state) => {
      state.notes = []
    }
  }
})

export const {addNote, getNotes, updateNote, deleteNote, deleteAllNotes} = noteSlice.actions
export default noteSlice.reducer
