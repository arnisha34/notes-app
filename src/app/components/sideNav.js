'use client'
import { HomeIcon } from "@heroicons/react/24/outline"
import { ArchiveBoxIcon } from "@heroicons/react/24/outline"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { Tags } from './tags'
import { useContext, useState } from "react"
import Image from "next/image"
import { Context } from "@/app/context/context"
import { useSelector } from "react-redux";

export const SideNav = () => {

  const [activeBtn, setActiveBtn] = useState("allNotes")

  const colorTheme = useSelector(state => state.theme.colorTheme)

  const handleClick = (currBtn) => {
    setActiveBtn(currBtn)
  }

  const ctx = useContext(Context)

  return(
    <div className="border-r-1 border-gray-400 p-5 min-w-[15%]">
      <section id="sideNav">
        <div id="logo" className="cursor-pointer font-[Luxurious_Script] font-bold mb-6 text-5xl" onClick={() => ctx.setActiveView("allNotes")}>
           <Image src={`${colorTheme === "dark"?"/note-logo_dark.svg":"/note-logo.svg"}`} alt="Notes" width={0} height={0} style={{width: '150px', height: 'auto'}} />
        </div>
        <div className="actions border-b-1 border-gray-400 pb-4">
          {
            [
              {
                id: 'allNotes',
                btnText: 'All Notes',
                icon: <HomeIcon className={`${activeBtn === "allNotes" ? "text-blue-500" :""} group-hover:text-blue-500 stroke-2 w-5`}/>
              },
              {
                id: 'archived',
                btnText: 'Archived',
                icon: <ArchiveBoxIcon className={`${activeBtn === "archived" ? "text-blue-500" :""} group-hover:text-blue-500 stroke-2 w-5`}/>
              }
            ].map(({id, btnText, icon}) => {
              return (
                <button key={id} type="button" className={`${activeBtn === id} ? "bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex gap-2 hover:bg-neutral-100 items-center p-3 rounded-lg relative dark:text-white dark:hover:bg-slate-800 w-full group`} onClick={() => {handleClick(id); ctx.setActiveView(id);}}>{icon} {btnText} <ChevronRightIcon className={`${activeBtn === id ? "absolute top-[50%] right-0 translate-[-50%] stroke-3 w-4":"hidden"}`} /></button>
              )
            })
          }   
        </div>
      </section>
      <Tags />
    </div>
  )
}