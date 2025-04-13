'use client'
import { ClockIcon } from "@heroicons/react/24/outline"
import { TagIcon } from "@heroicons/react/24/outline"
import { PlusIcon } from "@heroicons/react/24/outline"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"
import { Context } from "@/context/context"
import { Buttons } from '../components/buttons'

export const Note = () => {

  const ctx = useContext(Context)

  const handleAddNote = (createNote) => {
   ctx.setNewNote(createNote)
  }

  return(
    <div className="w-full mx-auto">
      <div id="main-section" className="flex h-screen">
        <section className="border-r-1 border-gray-400 flex flex-col gap-5 p-5 w-xs">
          <button type="button" className="bg-blue-500 cursor-pointer font-bold flex gap-2 justify-center items-center py-2 block rounded-md text-white w-full hover:bg-blue-600" onClick={() => handleAddNote("addNote")}><PlusIcon className="stroke-3 w-4"/>Create New Note</button>
          <div className={`${ctx.newNote === "addNote"?"hidden":""} bg-neutral-100 flex flex-col gap-3 items-center p-3 rounded-lg text-sm dark:bg-slate-800 dark:text-slate-400"}`}><PencilSquareIcon className="text-gray-500 w-8 dark:text-slate-400"/>You haven&apos;t added any notes yet. Begin a new note to jot down your thoughts and ideas.</div>
        </section>
        <section id="note" className={`${ctx.newNote === "addNote"?"border-r-1 border-gray-400":""} flex flex-col flex-2 p-5`}>
        {ctx.newNote === "addNote"?
        <>
          <div className="note-title flex flex-col gap-5 pb-5">
            <input type="text" placeholder="Add title" className="font-bold text-2xl focus:outline-none dark:placeholder:text-white"/>
            <p className="tags flex gap-3">
              <TagIcon className="w-4 stroke-2"/>
              <input type="text" placeholder="Add tags" className="focus:outline-none"/>
            </p>
            <p className="flex gap-3"><ClockIcon className="w-4 stroke-2"/>Last edited</p>
          </div>
          <div className="note-text h-3/4">
            <textarea placeholder="Start typing here..." className="focus:outline-none w-full h-full border-t-1 border-gray-400 py-5 resize-none font-medium"></textarea>
          </div>
          <div className="note-actions flex gap-3 text-md border-t-1 border-gray-400 pt-5">
            <button type="submit" value="submit" className="bg-blue-500 cursor-pointer py-1 px-2 rounded-md text-white hover:bg-blue-600">Save Note</button>
            <button type="reset" value="cancel" className="bg-gray-200 py-1 px-2 rounded-md dark:text-black">Cancel</button>
          </div></>:<section className="flex"></section>}
        </section>
        <Buttons />
      </div>
    </div>
  )
}