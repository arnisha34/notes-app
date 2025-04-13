import { useContext } from "react";
import { Context } from "@/context/context";
import { VscTextSize } from "react-icons/vsc";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoIosRadioButtonOff } from "react-icons/io";

export const FontTheme = () => {

  const ctx = useContext(Context)

  return(
    <section className="p-5">
      <h3 className="font-bold text-lg">Font Theme</h3>
      <span className="text-sm">Choose a font theme</span>
      <div className="flex flex-col gap-5 w-lg py-5">
        <div className={`${ctx.fontTheme ==="font-sans"?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:border-1 dark:border-slate-800 dark:hover:bg-slate-800 group`} onClick={() => {ctx.setFontTheme("font-sans");}}>
          <div className="flex gap-5">
            <VscTextSize size={30} className={`${ctx.fontTheme==="font-sans"?"text-blue-500":""} group-hover:text-blue-500 w-8`}/>
            <div>
              <p className="place-self-start">Sans Serif</p>
              <p className="text-sm">Clean, modern, and ready for anything.</p>
            </div>
          </div>
          {ctx.fontTheme==="font-sans"?<IoIosRadioButtonOn size={25}/>:<IoIosRadioButtonOff size={25}/>}
        </div>
        <div className={`${ctx.fontTheme ==="font-serif"?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:border-1 dark:border-slate-800 dark:hover:bg-slate-800 group`} onClick={() => {ctx.setFontTheme("font-serif");}}>
          <div className="flex gap-5">
            <VscTextSize size={30} className={`${ctx.fontTheme==="font-serif"?"text-blue-500":""} group-hover:text-blue-500 w-6`}/>
            <div>
              <p className="place-self-start">Serif</p>
              <p className="text-sm">Classic vibes with a scholarly twist.</p>
            </div>
          </div>
          {ctx.fontTheme==="font-serif"?<IoIosRadioButtonOn size={25}/>:<IoIosRadioButtonOff size={25}/>}
        </div>
        <div className={`${ctx.fontTheme ==="font-mono"?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:border-1 dark:border-slate-800 dark:hover:bg-slate-800 group`} onClick={() => {ctx.setFontTheme("font-mono");}}>
          <div className="flex gap-5">
            <VscTextSize size={30} className={`${ctx.fontTheme==="font-mono"?"text-blue-500":""} group-hover:text-blue-500 w-6`}/>
            <div>
              <p className="place-self-start">Mono</p>
              <p className="text-sm">Techy, tidy, and totally typewriter-chic.</p>
            </div>
          </div>
          {ctx.fontTheme==="font-mono"?<IoIosRadioButtonOn size={25}/>:<IoIosRadioButtonOff size={25}/>}
        </div>
      </div>
    </section>
  )
}