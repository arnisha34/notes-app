import { useContext, useState } from "react"
import { useSelector } from "react-redux"
import { Context } from "../context/context"

export const SavedNotes = () => {

  const ctx = useContext(Context)

  const [isActive, setIsActive] = useState(false)

  const getNotes = useSelector(state => state.notes.notes)

  const handleClick = (id) => {
    const currNoteId = getNotes.find(note => id === note.id)
    ctx.setActiveNote(currNoteId)
  }

  return (
    <div className="divide-y divide-gray-300 overflow-y-scroll">
      {getNotes.map(note => 
        <div key={note.id} className="py-3 hover:cursor-pointer" onClick={() => {handleClick(note.id); setIsActive(note.id)}}>
          <div className={`p-3 transition-colors duration-150 ${isActive === note.id?"bg-neutral-100 rounded-lg dark:bg-slate-800":"hover:bg-neutral-100 hover:rounded-lg dark:hover:bg-slate-800"}`}>
          <h4 className="capitalize font-bold mb-2 text-lg">{note.title}</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {note.tags.map((tag, id) => <span key={id} className="bg-neutral-300 capitalize px-2 text-sm rounded-sm dark:bg-slate-600">{tag}</span>)}
          </div>
          <p className="text-gray-600 text-sm dark:text-white">{note.edited}</p></div>
        </div>)}
    </div>
  )
}