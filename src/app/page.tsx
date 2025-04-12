'use client'
import { Note } from './components/note'
import { SideNav } from './components/sideNav'
import { Modal } from './components/modal' 
import { useState } from 'react'
import { Context } from '../context/context'

export default function Home() {

  const [newNote, setNewNote] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null)


  return (
    <Context.Provider value={{activeModal, setActiveModal, isOpen, setIsOpen, newNote, setNewNote}}>
      <div id="main" className='flex w-full h-full dark dark:bg-slate-950'>
        <SideNav />
        <Note />
        <Modal />
      </div>
    </Context.Provider>
  );
}
