import { useDispatch, useSelector } from "react-redux"
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { ArchiveBoxArrowDownIcon, TrashIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline"
import { closeDialog } from "@/store/dialogSlice"
import { deleteNote, deleteAllNotes, updateNote } from '@/store/noteSlice'
import { useContext } from "react";
import { Context } from "../context/context";


export const Dialog = () => {

  const dispatch = useDispatch()

  const { isOpen, dialogType } = useSelector(state => state.dialog)
  
  const ctx = useContext(Context)

  const archiveNote = async (id) => { 
    try{
      await updateDoc(doc(db, "notes", id), {
        archived: true
      })
      dispatch(updateNote({ id: id, archived: true }))
    }catch (err){
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try{
      await deleteDoc(doc(db, "notes", id))
      dispatch(deleteNote({id}))
      ctx.setActiveNote(null)
    }catch (err) {
      console.log(err)
    } 
  }

  return(
    <div id="modal-bg" className={`${isOpen?"block": "hidden"} absolute flex justify-center items-center bg-neutral-950/60 w-full h-full z-3}`}>
      <div id="modal" className="bg-white px-8 py-5 rounded-lg w-md dark:bg-slate-800">
        {[
          {
            id:"archive",
            icon:<ArchiveBoxArrowDownIcon className="w-6 dark:bg-slate-600"/>,
            title:"Archive Note",
            text:"Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it at anytime.",
            btnText:"Archive Note"
          },
          {
            id:"delete",
            icon:<TrashIcon className="w-6 dark:bg-slate-600"/>,
            title:"Delete Note",
            text:"Are you sure you want to permanently delete this note? This action cannot be undone.",
            btnText:"Delete Note"
          },
          {
            id:"deleteAll",
            icon:<ArchiveBoxXMarkIcon className="w-6 dark:bg-slate-600"/>,
            title:"Delete All Notes",
            text:"Are you sure you want to permanently delete all the notes? This action cannot be undone.",
            btnText:"Delete All Notes"
          }
        ].filter(dialog => dialog.id === dialogType)
        .map(({id, icon, title, text, btnText}) =>{
          return(
            <div key={id} className="text-neutral-700 dark:text-slate-300">
              <div className="desc flex gap-5 items-start mb-5">
                <div className="icon bg-neutral-100 dark:bg-slate-600 p-2 rounded-sm">
                  {icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-bold">{title}</h4>
                  <p className="text-md">{text}</p>
                </div>
              </div>
              <div className="actions border-t-1 border-gray-400 flex gap-4 justify-end pt-6 rounded-b-lg">
                <button type="button" className="bg-neutral-100 cursor-pointer px-4 py-1 rounded-sm dark:bg-slate-500" onClick={() => dispatch(closeDialog())}>Cancel</button>
                <button type="submit" className={`${id === "delete" || id === "deleteAll"?"bg-red-600":"bg-blue-500"} cursor-pointer font-bold px-4 rounded-sm text-white`} onClick={() => { 
                  if (id === "delete") {
                    handleDelete(ctx.activeNote?.id);
                  } else if (id === "archive") {
                    archiveNote(ctx.activeNote?.id);
                  } else if (id === "deleteAll") {
                    handleDeleteAll();
                  }dispatch(closeDialog())}}>{btnText}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}