import { useContext } from "react"
import { Context } from "../../context/context"
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/outline"
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline"

  export const Buttons = () => {

    const ctx = useContext(Context)
    
  return(
    <section className={`${ctx.newNote === "addNote"? "block":"hidden"} actions flex flex-col flex-1 gap-3 p-5`}>
      <button type="button" value="archive" className="border-1 border-gray-400 cursor-pointer flex gap-3 items-center p-3 rounded-md hover:bg-neutral-100 dark:border-slate-800 dark:hover:bg-slate-800" onClick={() => {ctx.setIsOpen(true); ctx.setActiveModal("archive");}}><ArchiveBoxArrowDownIcon className="stroke-2 w-5"/>Archive Note</button>

      <button type="button" value="delete" className="border-1 border-gray-400 cursor-pointer flex gap-3 items-center p-3 rounded-md hover:bg-neutral-100 dark:border-slate-800  dark:hover:bg-slate-800" onClick={() => {ctx.setIsOpen(true); ctx.setActiveModal("deleteOne")}}><TrashIcon className="stroke-2 w-5"/>Delete Note</button>

      <button type="button" value="deleteAll" className="border-1 border-gray-400 cursor-pointer flex gap-3 items-center p-3 rounded-md hover:bg-neutral-100 dark:border-slate-800 dark:hover:bg-slate-800" onClick={() => {ctx.setIsOpen(true); ctx.setActiveModal("deleteAll")}}><ArchiveBoxXMarkIcon className="stroke-2 w-5"/>Delete All Notes</button>
    </section>
  )
}