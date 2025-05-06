import { Context } from "@/app/context/context"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

export const Navbar = () => {

  const ctx = useContext(Context)

  return(
    <header className="flex justify-between items-center border-b-1 border-gray-400 p-5">
      <h1 className="capitalize font-extrabold text-2xl">{ctx.activeView === "allNotes"?"All Notes": ctx.activeView === "archived"? "Archived":"Settings"}</h1>
        <div className="flex items-center gap-4">
          <div className="search-bar relative">
            <MagnifyingGlassIcon className="w-4 absolute top-[50%] translate-[-50%] left-5 text-gray-500"/>
            <input id="search" type="text" placeholder="Search by title, content, or tags..." className="border-1 border-gray-400 focus:outline-none pl-8 py-2 rounded-md text-sm w-xs"/>
          </div>
        <button onClick={() => ctx.setActiveView("settings")}><Cog6ToothIcon className="cursor-pointer text-blue-500 hover:text-blue-600 w-7"/></button>
      </div>
    </header>
  )
}