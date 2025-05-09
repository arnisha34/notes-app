import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export const Search = () => {
  return (
    <div className="search-bar relative">
      <MagnifyingGlassIcon className="w-4 absolute top-[50%] translate-[-50%] left-5 text-gray-500"/>
      <input id="search" type="text" placeholder="Search by title, content, or tags..." className="border-1 border-gray-400 focus:outline-none pl-8 py-2 rounded-md text-sm w-xs"/>
    </div>
  )
}