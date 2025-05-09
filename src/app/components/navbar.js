import { Search } from '../components/search'
import { Context } from "../context/context"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

export const Navbar = () => {

  const ctx = useContext(Context)

  return(
    <header className="flex justify-between items-center border-b-1 border-gray-400 p-5">
      <h1 className="capitalize font-extrabold text-2xl">{ctx.activeView === "allNotes"?"All Notes": ctx.activeView === "archived"? "Archived":"Settings"}</h1>
        <div className="flex items-center gap-4">
          <Search />
        <button onClick={() => ctx.setActiveView("settings")}><Cog6ToothIcon className="cursor-pointer text-blue-500 hover:text-blue-600 w-7"/></button>
      </div>
    </header>
  )
}