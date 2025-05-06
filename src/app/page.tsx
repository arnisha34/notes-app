'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs} from 'firebase/firestore'
import { Navbar } from './components/navbar'
import { SideNav } from './components/sideNav'
import { Note } from './components/note'
import { Settings } from './components/settings'
import { Dialog } from './components/dialog'
import { Context } from "@/app/context/context"
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "@/store/authSlice";
import { getNotes } from '@/store/noteSlice'

export default function Home() {

  const [activeNote, setActiveNote] = useState(null)
  const [activeModal, setActiveModal] = useState(null)
  const [activeView, setActiveView] = useState("home")
  const [activeBtn, setActiveBtn] = useState("")
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [tags, setTags] = useState([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [noteText, setNoteText] = useState('')

  const fontTheme = useSelector(state => state.theme.fontTheme);
  const colorTheme = useSelector(state => state.theme.colorTheme);

  const themeClass = colorTheme === 'dark' || (colorTheme === 'system' && systemPrefersDark) ? 'dark' : '';

  const dispatch = useDispatch()
  
    useEffect(() => {
      const fetchNotes = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "notes"))
          const notesRef = querySnapshot.docs.map(note => ({id:note.id, ...note.data()}))
          dispatch(getNotes(notesRef))
         }catch(err){
          console.log(err)
        }
      }
      fetchNotes()
    },[dispatch])

    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updatePreference = () => setSystemPrefersDark(mediaQuery.matches);

      updatePreference(); 
      mediaQuery.addEventListener('change', updatePreference);

      return () => mediaQuery.removeEventListener('change', updatePreference);
    }, []);
  
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
    <Context.Provider value={{activeBtn, setActiveBtn, activeModal, setActiveModal, activeView, setActiveView, activeNote, setActiveNote, date, setDate, noteText, setNoteText, tags, setTags, title, setTitle}}>
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
