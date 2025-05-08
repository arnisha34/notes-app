import { useSelector } from "react-redux"
import { TagIcon } from "@heroicons/react/24/outline"


export const Tags = () => {

  const getNotes = useSelector(state => state.notes.notes)

  const allTags = [...new Set(getNotes.flatMap(note => note.tags || []))]

  return(
    <section id="tags" className="px-3">
      <h5 className="py-3 text-gray-500">Tags</h5>
      <div className="flex flex-col gap-2">
        {[...new Set(allTags?.flat())].map((tag, id) => <p key={id} className="cursor-pointer flex gap-2 p-2 rounded-lg hover:bg-neutral-100"><TagIcon className="w-4 stroke-2"/>{tag}</p>)}
      </div>
    </section>
  )
}