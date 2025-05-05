'use client'
import { NoteTags } from "./noteTags"
import { ClockIcon } from "@heroicons/react/24/outline"
import { PlusIcon } from "@heroicons/react/24/outline"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { useContext, useState } from "react"
import { Context } from "@/app/context/context"
import { Buttons } from '../components/buttons'
import { db } from '@/config/firebase'
import { collection, addDoc, deleteDoc } from 'firebase/firestore'
import { useDispatch } from "react-redux"
import { addNote } from '@/store/noteSlice'

export const Note = () => {

  const dispatch = useDispatch()
  
  const ctx = useContext(Context)

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [noteText, setNoteText] = useState('')

  const isDisabled = !title || !ctx.tags.length || !noteText

  const newNoteForm = (createNote) => {
   ctx.setNewNote(createNote)
   setDate(new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
   }))
  }

  const addNewNote = async () => {

    const noteInfo = {
      title: title,
      tags: ctx.tags,
      created: new Date().toLocaleString(),
      text: noteText,
      edited: date,
      archived: false
    }
    
    try {
      const noteRef = await addDoc(collection(db, 'notes'), noteInfo);
      dispatch(addNote({ id: noteRef.id, ...noteInfo }));
    } catch (err) {
      console.error("Error adding doc:", err);
    }

    setTitle('')
    ctx.setTags([])
    setNoteText('')
    setDate('')
  }

  const deleteNote = () => {

  }

  const clearNote = () => {

    setTitle('')
    ctx.setTags([])
    setNoteText('')
    setDate('')
  }

  return(
    <div className="w-full mx-auto">
      <div id="main-section" className="flex h-screen">
        <section className="border-r-1 border-gray-400 flex flex-col gap-5 p-5 w-xs">
          <button type="button" className="bg-blue-500 cursor-pointer font-bold flex gap-2 justify-center items-center py-2 block rounded-md text-white w-full hover:bg-blue-600" onClick={() => newNoteForm("addNote")}><PlusIcon className="stroke-3 w-4"/>Create New Note</button>
          <div className={`${ctx.newNote === "addNote"?"hidden":""} bg-neutral-100 flex flex-col gap-3 items-center p-3 rounded-lg text-sm dark:bg-slate-800 dark:text-slate-400"}`}><PencilSquareIcon className="text-gray-500 w-8 dark:text-slate-400"/>You haven&apos;t added any notes yet. Begin a new note to jot down your thoughts and ideas.</div>
        </section>
        <section id="note" className={`${ctx.newNote === "addNote"?"border-r-1 border-gray-400":""} flex flex-col flex-2 p-5`}>
        {ctx.newNote === "addNote"?
        <>
          <div className="note-title flex flex-col gap-5 pb-5">
            <input type="text" placeholder="Add title" value={title} className="font-bold text-2xl focus:outline-none dark:placeholder:text-white" onChange={(e) => setTitle(e.target.value)}/>
            <NoteTags />
            <p className="flex gap-3"><ClockIcon className="w-4 stroke-2"/>Last edited: {date}</p>
          </div>
          <div className="note-text h-3/4">
            <textarea placeholder="Start typing here..." value={noteText} className="focus:outline-none w-full h-full border-t-1 border-gray-400 py-5 resize-none font-medium" onChange={(e) => setNoteText(e.target.value)}></textarea>
          </div>
          <div className="note-actions flex gap-3 text-md border-t-1 border-gray-400 pt-5">
            <button type="submit" className="bg-blue-500 cursor-pointer py-1 px-2 rounded-md text-white disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-600" disabled={isDisabled} onClick={addNewNote}>Save Note</button>

            <button type="reset" value="cancel" className="bg-gray-200 py-1 px-2 rounded-md dark:text-black" onClick={clearNote}>Cancel</button>
          </div></>:<section className="flex"></section>}
        </section>
        <Buttons />
      </div>
    </div>
  )
}