import { Context } from "@/context/context"
import { useContext } from "react"
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/outline"
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline"

export const Modal = () => {

  const ctx = useContext(Context)

  return(
    <div id="modal-bg" className={`${ctx.isOpen===true?"block": "hidden"} absolute flex justify-center items-center bg-neutral-950/60 w-full h-full z-3}`}>
      <div id="modal" className="bg-white px-8 py-5 rounded-lg w-md dark:bg-slate-800">
        {buttonDetails.filter(btn => btn.id === ctx.activeModal).map(btn =>{
          return(
            <div key={btn.id}>
              <div className="desc flex gap-5 mb-5">
                <div className="icon bg-slate-600 p-2">
                  {btn.icon}
                </div>
                <div>
                  <h4 className="text-md font-bold">{btn.title}</h4>
                  <p className="font-2xs">{btn.text}</p>
                </div>
              </div>
              <div className="actions border-t-1 border-gray-400 flex gap justify-end pt-4 rounded-b-lg">
                <button type="button" className="bg-neutral-100 cursor-pointer px-4 py-1 rounded-lg dark:bg-slate-500" onClick={() => ctx.setIsOpen(false)}>Cancel</button>
                <button type="button" className="cursor-pointer p-2 rounded-lg">{btn.btnText}</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const buttonDetails = [
  {
    id:"archive",
    icon:<ArchiveBoxArrowDownIcon className="w-6"/>,
    title:"Archive Note",
    text:"Are you sure you want to archive this note? It will be moved to the Archived Notes section, where you can restore it at any time.",
    btnText:"Archive Note"
  },
  {
    id:"deleteOne",
    icon:<TrashIcon className="w-6"/>,
    title:"Delete Note",
    text:"AAre you sure you want to permanently delete this note? This action cannot be undone.",
    btnText:"Delete Note"
  },
  {
    id:"deleteAll",
    icon:<ArchiveBoxXMarkIcon className="w-6"/>,
    title:"Delete All Notes",
    text:"Are you sure you want to permanently delete all the notes? This action cannot be undone.",
    btnText:"Delete All Notes"
  },
]