'use client'
import { Navbar } from './components/navbar'
import { SideNav } from './components/sideNav'
import { Note } from './components/note'
import { Settings } from './components/settings'
import { Modal } from './components/modal'
import { useEffect, useState } from 'react'
import { Context } from "@/context/context"

export default function Home() {

  const [newNote, setNewNote] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const [activeView, setActiveView] = useState("home")
  const [activeBtn, setActiveBtn] = useState("")
  const [fontTheme, setFontTheme] = useState("font-sans")
  const [colorTheme, setColorTheme] = useState("light")
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  const themeClass = colorTheme === 'dark' || (colorTheme === 'system' && systemPrefersDark) ? 'dark' : '';

  return (
    <Context.Provider value={{activeBtn, setActiveBtn, activeModal, setActiveModal, activeView, setActiveView, colorTheme, setColorTheme, fontTheme, setFontTheme, isOpen, setIsOpen, newNote, setNewNote}}>
      <div className={`${themeClass} ${fontTheme} bg-white dark:bg-slate-950 dark:text-white flex w-full h-full text-lg`}>
        <SideNav />
        <div className='flex flex-col flex-1'>
          <Navbar />
          {activeView === "home"?<Note />:<Settings />}
        </div>
        <Modal />
      </div>
    </Context.Provider>
  );
}
