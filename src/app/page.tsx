'use client'
import { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from './components/navbar'
import { SideNav } from './components/sideNav'
import { CreateNote } from './components/createNote'
import { Settings } from './components/settings'
import { Dialog } from './components/dialog'
import { collection, getDocs} from 'firebase/firestore'
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "@/store/authSlice";
import { getNotes } from '@/store/noteSlice'
import { Context } from "@/app/context/context"
import { Toaster } from 'react-hot-toast';

export default function Home() {

  const [activeBtn, setActiveBtn] = useState('')
  const [activeNote, setActiveNote] = useState(null)
  const [activeModal, setActiveModal] = useState(null)
  const [activeView, setActiveView] = useState("allNotes")
  const [activeAllNotes, setActiveAllNotes] = useState(null)
  const [activeArchivedNotes, setActiveArchivedNotes] = useState(null);
  const [date, setDate] = useState('')
  const [noteText, setNoteText] = useState('')
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [tags, setTags] = useState([])
  const [title, setTitle] = useState('')




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
    <Context.Provider value={{activeBtn, setActiveBtn, activeAllNotes, setActiveAllNotes, activeArchivedNotes, setActiveArchivedNotes, activeModal, setActiveModal, activeView, setActiveView, activeNote, setActiveNote, date, setDate, noteText, setNoteText, tags, setTags, title, setTitle}}>
      <Toaster position="top-center" toastOptions={{duration: 1500}}></Toaster>
        <div className={`${themeClass} ${fontTheme} bg-white dark:bg-slate-950 dark:text-white flex w-full h-full text-md`}>
          <SideNav />
          <div className='flex flex-col flex-1'>
            <Navbar />
            {activeView === "settings"? <Settings />:<CreateNote />}
          </div>
          <Dialog />
        </div>
    </Context.Provider>
  );
}
