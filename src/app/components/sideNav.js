'use client'
import { HomeIcon } from "@heroicons/react/24/outline"
import { ArchiveBoxIcon } from "@heroicons/react/24/outline"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { Tags } from './tags'
import { useState } from "react"
import Image from "next/image"

export const SideNav = () => {

  const [activeBtn, setActiveBtn] = useState("allNotes")

  const handleClick = (currBtn) => {
    setActiveBtn(currBtn)
  }

  return(
    <div className="border-r-1 border-gray-400 p-5 min-w-[15%]">
      <section id="sideNav">
        <div id="logo" className="font-[Luxurious_Script] font-bold text-5xl mb-6">
           <Image src="/note-logo.svg" alt="Notes" width={0} height={0} style={{width: '150px', height: 'auto'}} className="dark:invert"/>
        </div>
        <div className="actions border-b-1 border-gray-400 pb-4">
          <button type="button" className={`${activeBtn === "allNotes" ? "bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex gap-2 hover:bg-neutral-100 items-center p-3 rounded-lg relative dark:bg-slate-800 dark:hover:bg-slate-800 w-full group`} onClick={() => handleClick("allNotes")}><HomeIcon className={`${activeBtn === "allNotes" ? "text-blue-500" :""} group-hover:text-blue-500 stroke-2 w-5`}/>All Notes <ChevronRightIcon className={`${activeBtn === "allNotes" ? "absolute top-[50%] right-0 translate-[-50%] stroke-3 w-4":"hidden"}`} /></button>
          
          <button type="button" className={`${activeBtn === "archived" ? "bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex gap-2 hover:bg-neutral-100 items-center mt-2 p-3 rounded-lg relative dark:bg-slate-800 dark:hover:bg-slate-800 w-full group`} onClick={() => handleClick("archived")}><ArchiveBoxIcon className={`${activeBtn === "archived" ? "text-blue-500" :""} group-hover:text-blue-500 stroke-2 w-5`}/>Archived <ChevronRightIcon className={`${activeBtn === "archived" ? "absolute top-[50%] right-0 translate-[-50%] stroke-3 w-4":"hidden"}`} /></button>
        </div>
      </section>
      <Tags />
    </div>
  )
}