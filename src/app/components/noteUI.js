
import { useContext, useEffect } from "react"
import { useDispatch } from "react-redux"

import { NoteTags } from "./noteTags"
import { ClockIcon } from "@heroicons/react/24/outline"
import { Context } from "../context/context"

import { db } from '@/config/firebase'
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore'
import { addNote, updateNote } from '@/store/noteSlice'

export const NoteUI = () => {

  const ctx = useContext(Context)

  const dispatch = useDispatch()

  const isDisabled = !ctx.title || !ctx.tags?.length || !ctx.noteText

  const saveNote = async () => {
    const noteInfo = {
      title: ctx.title,
      tags: ctx.tags,
      created: new Date().toLocaleString(),
      text: ctx.noteText,
      edited: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
       }),
      archived: false
    }
    try {
      if(ctx.activeNote){
        const updateRef = doc(db, 'notes', ctx.activeNote.id)
        await updateDoc(updateRef, noteInfo)
        dispatch(updateNote({id: ctx.activeNote.id, ...noteInfo}))
      }else{
        const noteRef = await addDoc(collection(db, 'notes'), noteInfo)
        dispatch(addNote({ id: noteRef.id, ...noteInfo }))
      }

    } catch (err) {
      console.error(err);
    }
  }

  const clearNote = () => {
    ctx.setTitle('')
    ctx.setTags([])
    ctx.setNoteText('')
    ctx.setDate('')
  }

  useEffect(() => {
    if (ctx.activeNote) {
      ctx.setTitle(ctx.activeNote.title || '')
      ctx.setTags(ctx.activeNote.tags || [])
      ctx.setNoteText(ctx.activeNote.text || '')
      ctx.setDate(ctx.activeNote.edited || '')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.activeNote])

  return (
    <>
      <div className="note-title flex flex-col gap-5 pb-5">
        <input type="text" placeholder="Add title" value={ctx.title || ''} className="capitalize font-bold text-2xl focus:outline-none dark:placeholder:text-white" onChange={(e) => ctx.setTitle(e.target.value)}/>
        <NoteTags />
        <p className="flex gap-3"><ClockIcon className="w-4 stroke-2"/>Last edited: {ctx.date}</p>
      </div>
      <div className="note-text">
        <textarea placeholder="Start typing here..." value={ctx.noteText} rows="20" className="focus:outline-none w-full border-t-1 border-gray-400 py-5 resize-none font-medium" onChange={(e) => ctx.setNoteText(e.target.value)}>{ctx.noteText}</textarea>
      </div>
      <div className="note-actions flex gap-3 text-md border-t-1 border-gray-400 pt-5">
        <button type="submit" className="bg-blue-500 cursor-pointer py-1 px-2 rounded-md text-white disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-600" disabled={isDisabled} onClick={saveNote}>Save Note</button>

        <button type="reset" value="cancel" className="bg-gray-200 py-1 px-2 rounded-md dark:text-black" onClick={clearNote}>Cancel</button>
      </div>
    </>
  )
}