'use client'
import { useContext } from "react"
import { Context } from "../context/context"
import { useDispatch } from "react-redux"
import { openDialog } from "@/store/dialogSlice";
import { logout } from "@/store/authSlice"
import { auth } from "@/config/firebase"
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/outline"
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline"
import { SunIcon } from "@heroicons/react/24/outline"
import { TbTextSize } from "react-icons/tb";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { LockClosedIcon } from "@heroicons/react/24/outline"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

  export const Buttons = () => {

    const dispatch = useDispatch()

    const ctx = useContext(Context)
    
  return(
    <section className={`${ctx.activeNote? "block":"hidden"} actions flex flex-col flex-1 gap-3 p-5`}>
      <button type="button" value="archive" className="border-1 border-gray-400 cursor-pointer flex gap-3 items-center p-3 rounded-md hover:bg-neutral-100 dark:border-slate-800 dark:hover:bg-slate-800" onClick={() => dispatch(openDialog("archive"))}><ArchiveBoxArrowDownIcon className="stroke-2 w-5"/>Archive Note</button>

      <button type="button" value="delete" className="border-1 border-gray-400 cursor-pointer flex gap-3 items-center p-3 rounded-md hover:bg-neutral-100 dark:border-slate-800 dark:hover:bg-slate-800" onClick={() => dispatch(openDialog("deleteOne"))}><TrashIcon className="stroke-2 w-5"/>Delete Note</button>

      <button type="button" value="deleteAll" className="border-1 border-gray-400 cursor-pointer flex gap-3 items-center p-3 rounded-md hover:bg-neutral-100 dark:border-slate-800 dark:hover:bg-slate-800" onClick={() => dispatch(openDialog("deleteAll"))}><ArchiveBoxXMarkIcon className="stroke-2 w-5"/>Delete All Notes</button>
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
      <button type="button" className={`${ctx.activeBtn==="colorTheme"?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center gap-2 p-3 relative rounded-lg hover:bg-neutral-100 dark:hover:bg-slate-800 group`} onClick={() => ctx.setActiveBtn("colorTheme")}><SunIcon className={`${ctx.activeBtn==="colorTheme"?"text-blue-500":""} group-hover:text-blue-500 stroke-2 w-6`}/><span>Color Theme</span> <ChevronRightIcon className={`${ctx.activeBtn==="colorTheme"?"absolute top-[50%] right-0 translate-[-50%] stroke-3 w-4":"hidden"}`} /></button>
      
      <button type="button" className={`${ctx.activeBtn==="fontTheme"?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center gap-2 p-3 relative rounded-lg hover:bg-neutral-100 dark:hover:bg-slate-800 group`} onClick={() => ctx.setActiveBtn("fontTheme")}><TbTextSize size={25} className={`${ctx.activeBtn==="fontTheme"?"text-blue-500":""} group-hover:text-blue-500 stroke-2 w-6`}/><span>Font Theme</span> <ChevronRightIcon className={`${ctx.activeBtn==="fontTheme"?"absolute top-[50%] right-0 translate-[-50%] stroke-3 w-4":"hidden"}`} /></button>

      <button type="button"className={`${ctx.activeBtn==="updatePassword"?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center gap-2 p-3 relative rounded-lg hover:bg-neutral-100 dark:hover:bg-slate-800 group`} onClick={() => ctx.setActiveBtn("updatePassword")}><LockClosedIcon className={`${ctx.activeBtn==="updatePassword"?"text-blue-500":""} group-hover:text-blue-500 stroke-2 w-6`}/><span>Change Password</span> <ChevronRightIcon className={`${ctx.activeBtn==="updatePassword"?"absolute top-[50%] right-0 translate-[-50%] stroke-3 w-4":"hidden"}`} /></button>

      <div className="border-t-1 border-gray-400 pt-5">
        <button type="button" className="cursor-pointer flex gap-2 p-3 rounded-lg w-full hover:bg-neutral-100 dark:hover:bg-slate-800 group" onClick={handleLogout}><ArrowRightStartOnRectangleIcon className="group-hover:text-blue-500 stroke-2 w-6"/> <span>Logout</span></button>
      </div>
    </section>
  )
}