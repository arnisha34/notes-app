import { useSelector, useDispatch } from 'react-redux'
import { setFontTheme } from '@/store/themeSlice'
import { VscTextSize } from "react-icons/vsc";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoIosRadioButtonOff } from "react-icons/io";

export const FontTheme = () => {

  const dispatch = useDispatch()
  const fontTheme = useSelector((state) => state.theme.fontTheme)

  return(
    <section className="p-5">
      <h3 className="font-bold text-lg">Font Theme</h3>
      <span className="text-sm">Choose a font theme</span>
      <div className="flex flex-col gap-5 w-lg py-5">
      {[
          { label: 'Sans Serif', value: 'font-sans', desc: 'Clean, modern, and ready for anything.' },
          { label: 'Serif', value: 'font-serif', desc: 'Classic vibes with a scholarly twist.' },
          { label: 'Mono', value: 'font-mono', desc: 'Techy, tidy, and totally typewriter-chic.' },
        ].map(({ label, value, desc }) => (
          <div key={value} className={`${fontTheme === value ?" bg-neutral-100 dark:bg-slate-800":""} ${value} cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:border-1 dark:border-slate-800 dark:hover:bg-slate-800 group`} onClick={() =>  dispatch(setFontTheme(value))}>
          <div className="flex gap-5">
            <VscTextSize size={30} className={`${fontTheme === value?"text-blue-500":""} font-${value} group-hover:text-blue-500 w-8`}/>
            <div>
              <p className="place-self-start">{label}</p>
              <p className="text-sm">{desc}</p>
            </div>
          </div>
          {fontTheme === value?<IoIosRadioButtonOn size={25}/>:<IoIosRadioButtonOff size={25}/>}
        </div>
        ))}
      </div>
    </section>
  )
}