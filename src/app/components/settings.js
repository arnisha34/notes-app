import { useContext } from "react"
import { SettingsButtons } from "./buttons"
import { ColorTheme } from "./colorTheme"
import { FontTheme } from "./fontTheme"
import { UpdatePassword } from "./updatePassword"
import { Context } from "../context/context"

export const Settings = () => {

  const ctx = useContext(Context)

  return(
    <div className="w-full mx-auto">
      <div id="main-section" className="flex h-screen">
        <SettingsButtons />
        {[
          {
            id:"colorTheme",
            component:<ColorTheme/>
          },
          {
            id:"fontTheme",
            component:<FontTheme/>
          },
          {
            id:"updatePassword",
            component:<UpdatePassword />
          }
        ].map(({id, component}) => <div key={id}>{ctx.activeBtn === id ? component:null}</div>)}
      </div>
    </div>
  )
}