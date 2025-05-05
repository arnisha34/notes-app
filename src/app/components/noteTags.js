import { TagIcon } from "@heroicons/react/24/outline"
import { HiXMark } from "react-icons/hi2"
import { useContext } from "react"
import { Context } from "../context/context"

export const NoteTags = () => {

  const ctx = useContext(Context)

  const addTag = (e) => {
    e.preventDefault()
    const newTag = e.target.value.toLowerCase().trim()

    if(e.key === 'Enter'&& newTag !== ""){
      ctx.setTags([...ctx.tags, newTag])
      e.target.value = ''
    }
  }

  const deleteTag = (tagID) => {
    return ctx.setTags(ctx.tags.filter(tag => tag !== tagID))
  }

  return(
    <div className="flex items-center gap-2">
      <TagIcon className="w-4 stroke-2 shrink-0"/>
      <input type="text" placeholder="Add tags" className="border-b-1 border-gray-400 focus:outline-none w-[100px]" onKeyUp={addTag}/>
      <div className="flex flex-wrap gap-2">{ctx.tags?.map((tag, id) => <span key={id} className="bg-neutral-100 flex gap-2 items-center px-2 py-1 rounded-md dark:bg-slate-800">{tag} <HiXMark className="cursor-pointer w-3" onClick={() => {ctx.setTags(tag); deleteTag(tag);}}/></span>)}</div>
    </div>
  )
}