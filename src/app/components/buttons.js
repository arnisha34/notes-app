'use client'
import { useContext } from "react"
import { useRouter } from "next/navigation";

import { db } from "@/config/firebase";
import { auth } from "@/config/firebase"
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux"
import { updateNote } from "@/store/noteSlice";
import { openDialog } from "@/store/dialogSlice";
import { logout } from "@/store/authSlice"

import { Context } from "../context/context"

import { TbTextSize } from "react-icons/tb";
import { ArchiveBoxArrowDownIcon, ArchiveBoxXMarkIcon, ArrowRightStartOnRectangleIcon, ArrowPathIcon, ChevronRightIcon, LockClosedIcon, SunIcon, TrashIcon } from "@heroicons/react/24/outline"


  export const Buttons = () => {

    const dispatch = useDispatch()

    const ctx = useContext(Context)

    const restoreNote = async (id) => {
      try{
        await updateDoc(doc(db, "notes", id), {
          archived: false
        })
        dispatch(updateNote({ id: id, archived: false }))
      }catch (err){
        console.log(err)
      }
    }
    
  return(
    <section className={`${ctx.activeNote? "block":"hidden"} actions flex flex-col flex-1 gap-3 p-5`}>
      {
        [
          {
            id: "archive",
            btnText: "Archive Note",
            icon: <ArchiveBoxArrowDownIcon className="stroke-2 w-5"/>
          },
          {
            id:"restore",
            btnText:"Restore Note",
            icon: <ArrowPathIcon className="stroke-2 w-5"/>
          },
          {
            id: "delete",
            btnText: "Delete Note",
            icon: <TrashIcon className="stroke-2 w-5"/>
          },
          {
            id: "deleteAll",
            btnText: "Delete All Notes",
            icon: <ArchiveBoxXMarkIcon className="stroke-2 w-5"/>
          },
        ].map(({id, btnText, icon}) => {
          const hide =
          (ctx.activeView === "archived" && id === "archive") ||
          (ctx.activeView === "allNotes" && id === "restore")
          return (
            <button key={id} type="button" value={id} className={`${hide?"hidden":""} border-1 border-gray-400 cursor-pointer flex gap-3 items-center p-3 rounded-md hover:bg-neutral-100 dark:border-slate-800 dark:hover:bg-slate-800`} onClick={() => {restoreNote(ctx.activeNote?.id); if(id !== "restore"){dispatch(openDialog(id));}}}>{icon}{btnText}</button>
          )
        })
      }
    </section>
  )
}

export const SettingsButtons = () => {

  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout()); // Clear Redux auth state

      router.push('/login')

    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const ctx = useContext(Context)

  return (
    <section className="border-r-1 border-gray-400 flex flex-col gap-5 p-5 w-xs">
    {
      [
        {
          id: "colorTheme",
          icon: <SunIcon className={`${ctx.activeBtn==="colorTheme"?"text-blue-500":""} group-hover:text-blue-500 stroke-2 w-6`}/>,
          btnText: "Color Theme"
        },
        {
          id: "fontTheme",
          icon: <TbTextSize size={25} className={`${ctx.activeBtn==="fontTheme"?"text-blue-500":""} group-hover:text-blue-500 stroke-2 w-6`}/>,
          btnText: "Font Theme"
        },
        {
          id: "updatePassword",
          icon: <LockClosedIcon className={`${ctx.activeBtn==="updatePassword"?"text-blue-500":""} group-hover:text-blue-500 stroke-2 w-6`}/>,
          btnText: "Change Password"
        }
      ].map(({id, icon, btnText}) => {
        return(
        <button key={id} type="button" className={`${ctx.activeBtn === id?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center gap-2 p-3 relative rounded-lg hover:bg-neutral-100 dark:hover:bg-slate-800 group`} onClick={() => ctx.setActiveBtn(id)}>{icon}<span>{btnText}</span> <ChevronRightIcon className={`${ctx.activeBtn===id?"absolute top-[50%] right-0 translate-[-50%] stroke-3 w-4":"hidden"}`} /></button>)
      })
    }
      <div className="border-t-1 border-gray-400 pt-5">
        <button type="button" className="cursor-pointer flex gap-2 p-3 rounded-lg w-full hover:bg-neutral-100 dark:hover:bg-slate-800 group" onClick={handleLogout}><ArrowRightStartOnRectangleIcon className="group-hover:text-blue-500 stroke-2 w-6"/> <span>Logout</span></button>
      </div>
    </section>
  )
}