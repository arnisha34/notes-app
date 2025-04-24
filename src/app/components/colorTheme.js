import { SunIcon } from "@heroicons/react/24/outline"
import { MoonIcon } from "@heroicons/react/24/solid"
import { CgDarkMode } from "react-icons/cg";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoIosRadioButtonOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setColorTheme } from "@/store/themeSlice";

export const ColorTheme = ()  => {

  const dispatch = useDispatch()
  const colorTheme = useSelector(state => state.theme.colorTheme)

  return(
    <section className="p-5">
      <h3 className="font-bold text-lg">Color Theme</h3>
      <span className="text-sm">Choose a color theme</span>
      <div className="flex flex-col gap-5 w-lg py-5">
        {[
          {theme:"light", icon: <SunIcon className={`${colorTheme==="light"?"text-blue-500":""} group-hover:text-blue-500 w-8`}/>,label:"Light Mode",desc:"Bright, airy, and ready to seize the day."},
          {theme:"dark", icon: <MoonIcon className={`${colorTheme==="dark"?"text-blue-500":""} group-hover:text-blue-500 w-6`}/>,label:"Dark Mode",desc:"Smooth, moody, and perfect for night owls."}, 
          {theme:"system", icon: <CgDarkMode size={30} className={`${colorTheme==="system"?"text-blue-500":""} group-hover:text-blue-500 w-6`}/>,label:"System",desc:"Go-with-the-flow — it follows your device's vibe."}
        ].map(({theme, icon, label, desc}) =>
          <div key={theme} className={`${colorTheme ===theme?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:border-1 dark:border-slate-800 dark:hover:bg-slate-800 group`} onClick={() => dispatch(setColorTheme(theme))}>
            <div className="flex gap-5">
              {icon}
              <div>
                <p className="place-self-start">{label}</p>
                <p className="text-sm">{desc}</p>
              </div>
            </div>
            {colorTheme===theme?<IoIosRadioButtonOn size={25}/>:<IoIosRadioButtonOff size={25}/>}
          </div>
        )}
        {/* <div className={`${ctx.colorTheme ==="light"?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:border-1 dark:border-slate-800 dark:hover:bg-slate-800 group`} onClick={() => {ctx.setColorTheme("light");}}>
          <div className="flex gap-5">
            <SunIcon className={`${ctx.colorTheme==="light"?"text-blue-500":""} group-hover:text-blue-500 w-8`}/>
            <div>
              <p className="place-self-start">Light Mode</p>
              <p className="text-sm">Bright, airy, and ready to seize the day.</p>
            </div>
          </div>
          {ctx.colorTheme==="light"?<IoIosRadioButtonOn size={25}/>:<IoIosRadioButtonOff size={25}/>}
        </div>
        <div className={`${ctx.colorTheme ==="dark"?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:border-1 dark:border-slate-800 dark:hover:bg-slate-800 group`} onClick={() => {ctx.setColorTheme("dark");}}>
          <div className="flex gap-5">
            <MoonIcon className={`${ctx.colorTheme==="dark"?"text-blue-500":""} group-hover:text-blue-500 w-6`}/>
            <div>
              <p className="place-self-start">Dark Mode</p>
              <p className="text-sm">Smooth, moody, and perfect for night owls.</p>
            </div>
          </div>
          {ctx.colorTheme==="dark"?<IoIosRadioButtonOn size={25}/>:<IoIosRadioButtonOff size={25}/>}
        </div>
        <div className={`${ctx.colorTheme ==="system"?"bg-neutral-100 dark:bg-slate-800":""} cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:border-1 dark:border-slate-800 dark:hover:bg-slate-800 group`} onClick={() => {ctx.setColorTheme("system");}}>
          <div className="flex gap-5">
            <CgDarkMode size={30} className={`${ctx.colorTheme==="system"?"text-blue-500":""} group-hover:text-blue-500 w-6`}/>
            <div>
              <p className="place-self-start">System</p>
              <p className="text-sm">Go-with-the-flow — it follows your device&apos;s vibe.</p>
            </div>
          </div>
          {ctx.colorTheme==="system"?<IoIosRadioButtonOn size={25}/>:<IoIosRadioButtonOff size={25}/>}
        </div> */}
      </div>
    </section>
  )
}