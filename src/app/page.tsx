'use client'
import { Navbar } from './components/navbar'
import { SideNav } from './components/sideNav'
import { Note } from './components/note'
import { Settings } from './components/settings'
import { Dialog } from './components/dialog'
import { useEffect, useState } from 'react'
import { Context } from "@/app/context/context"
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { login, logout } from "@/store/authSlice";


export default function Home() {

  const [newNote, setNewNote] = useState()
  const [activeModal, setActiveModal] = useState(null)
  const [activeView, setActiveView] = useState("home")
  const [activeBtn, setActiveBtn] = useState("")
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  const fontTheme = useSelector(state => state.theme.fontTheme);
  const colorTheme = useSelector(state => state.theme.colorTheme);

  const themeClass = colorTheme === 'dark' || (colorTheme === 'system' && systemPrefersDark) ? 'dark' : '';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updatePreference = () => setSystemPrefersDark(mediaQuery.matches);

    updatePreference(); 
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  const dispatch = useDispatch()
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(login({ uid: user.uid, email: user.email }));
        } else {
          dispatch(logout());
        }
      });
  
      return () => unsubscribe();
  
    },[dispatch])

  return (
    <Context.Provider value={{activeBtn, setActiveBtn, activeModal, setActiveModal, activeView, setActiveView, newNote, setNewNote}}>
      <div className={`${themeClass} ${fontTheme} bg-white dark:bg-slate-950 dark:text-white flex w-full h-full text-md`}>
        <SideNav />
        <div className='flex flex-col flex-1'>
          <Navbar />
          {activeView === "home"?<Note />:<Settings />}
        </div>
        <Dialog />
      </div>
    </Context.Provider>
  );
}
