'use client'
import { Buttons } from './buttons'
import { NoteUI } from './noteUI'
import { SavedNotes } from './savedNotes'
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { useContext, useEffect } from "react"
import { Context } from "../context/context"
import { useSelector } from 'react-redux'

export const CreateNote = () => {

  const getNotes = useSelector(state => state.notes.notes)
  
  const ctx = useContext(Context)

  const newNoteForm = () => {
    const newNote = {
      title: '',
      tags: [],
      text: '',
      edited: ctx.date
    }

    ctx.setActiveNote(newNote)

    if (ctx.activeView === 'allNotes') {
      ctx.setActiveAllNotes(newNote)
    } else {
      ctx.setActiveArchivedNotes(newNote)
    }

    ctx.setTitle('')
    ctx.setTags([])
    ctx.setNoteText('')
    ctx.setDate('')
  }

  useEffect(() => {
    const activeNote = ctx.activeView === 'archived' ? ctx.activeArchivedNotes : ctx.activeAllNotes
    ctx.setActiveNote(activeNote)
  }, [ctx, ctx.activeView, ctx.activeAllNotes, ctx.activeArchivedNotes])

  return(
    <div className="w-full mx-auto">
      <div id="main-section" className="flex h-screen">
        <section className="border-r-1 border-gray-400 flex flex-col flex-[0_0_20%] p-5">
          <button type="button" className="bg-blue-500 cursor-pointer font-bold flex gap-2 justify-center items-center mb-5 py-2 block rounded-md text-white w-full hover:bg-blue-600" onClick={newNoteForm}><PlusIcon className="stroke-3 w-4"/>Create New Note</button>
          <div className={`${getNotes.length ?"hidden":""} bg-neutral-100 flex flex-col gap-3 items-center p-3 rounded-lg text-sm dark:bg-slate-800 dark:text-slate-400"}`}><PencilSquareIcon className="text-gray-500 w-8 dark:text-slate-400"/>{ctx.activeView==="allNotes"?"You haven't added any notes yet. Begin a new note to jot down your thoughts and ideas.":"No notes have been archived yet. Move notes here for safekeeping, or create a new note."}</div>
            <SavedNotes />
        </section>
        <section id="note" className={`${ctx.activeNote && "border-r-1 border-gray-400"} flex flex-col flex-1 p-5`}>
          {ctx.activeNote && <NoteUI />}
        </section>
        <section className={`${ctx.activeNote? "block":"hidden"} actions flex flex-col flex-[0_0_20%] gap-3 p-5`}>
          <Buttons />
        </section>
      </div>
    </div>
  )
}