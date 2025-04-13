import { useContext } from "react"
import { SettingsButtons } from "./buttons"
import { ColorTheme } from "./colorTheme"
import { FontTheme } from "./fontTheme"
import { UpdatePassword } from "./updatePassword"
import { Context } from "@/context/context"

export const Settings = () => {

  const ctx = useContext(Context)

  return(
    <div className="w-full mx-auto">
      <div id="main-section" className="flex h-screen">
        <SettingsButtons />
        {ctx.activeBtn==="colorTheme"?<ColorTheme />:ctx.activeBtn==="fontTheme"?<FontTheme />:ctx.activeBtn==="updatePassword"?<UpdatePassword />:null}
      </div>
    </div>
  )
}