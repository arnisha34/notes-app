import { useContext } from "react";
import { Context } from "@/context/context";

export const FontTheme = () => {

  const ctx = useContext(Context)

  return(
    <p>font section</p>
    // <section className="p-5">
    //   <h3 className="font-bold text-lg">Font Theme</h3>
    //   <span className="text-sm">Choose a font theme</span>
    //   <div className="flex flex-col gap-5 w-lg py-5">
    //     <div className={`${ctx.isChecked ==="light"?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:border-1 dark:border-slate-800 dark:hover:bg-slate-800 group`} onClick={() => {ctx.setIsChecked("light");}}>
    //       <div className="flex gap-5">
    //         <SunIcon className={`${ctx.isChecked==="light"?"text-blue-500":""} group-hover:text-blue-500 w-8`}/>
    //         <div>
    //           <p className="place-self-start">Light Mode</p>
    //           <p className="text-sm">Bright, airy, and ready to seize the day.</p>
    //         </div>
    //       </div>
    //       {ctx.isChecked==="light"?<IoIosRadioButtonOn size={25}/>:<IoIosRadioButtonOff size={25}/>}
    //     </div>
    //     <div className={`${ctx.isChecked ==="dark"?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:border-1 dark:border-slate-800 dark:hover:bg-slate-800 group`} onClick={() => {ctx.setIsChecked("dark");}}>
    //       <div className="flex gap-5">
    //         <MoonIcon className={`${ctx.isChecked==="dark"?"text-blue-500":""} group-hover:text-blue-500 w-6`}/>
    //         <div>
    //           <p className="place-self-start">Dark Mode</p>
    //           <p className="text-sm">Smooth, moody, and perfect for night owls.</p>
    //         </div>
    //       </div>
    //       {ctx.isChecked==="dark"?<IoIosRadioButtonOn size={25}/>:<IoIosRadioButtonOff size={25}/>}
    //     </div>
    //     <div className={`${ctx.isChecked ==="system"?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:border-1 dark:border-slate-800 dark:hover:bg-slate-800 group`} onClick={() => {ctx.setIsChecked("system");}}>
    //       <div className="flex gap-5">
    //         <CgDarkMode size={30} className={`${ctx.isChecked==="system"?"text-blue-500":""} group-hover:text-blue-500 w-6`}/>
    //         <div>
    //           <p className="place-self-start">System</p>
    //           <p className="text-sm">Go-with-the-flow — it follows your device&apos;s vibe.</p>
    //         </div>
    //       </div>
    //       {ctx.isChecked==="system"?<IoIosRadioButtonOn size={25}/>:<IoIosRadioButtonOff size={25}/>}
    //     </div>
    //   </div>
    // </section>
  )
}