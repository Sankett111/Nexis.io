"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { Note } from '@prisma/client'
import { SidebarGroupContent as SidebarGroupContentShadcn } from '@/components/ui/sidebar'
import { SearchIcon } from 'lucide-react'
import { Input } from './ui/input'
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import Fuse from 'fuse.js'
import SelectNoteButton from './SelectNoteButton'
import DeleteNoteButton from './DeleteNoteButton'

type Props = {
  notes:Note[];
} 

function SidebarGroupContent({notes}: Props) {
  const [searchText, setSearchText] = useState("")
  const [localNotes, setlocalNotes] = useState(notes)

  useEffect(() => {
    setlocalNotes(notes)
  },[notes])

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ['text'],
      threshold: 0.3,
    })
  }, [localNotes])

  const filternotes = searchText ? fuse.search(searchText).map((result) => result.item) : localNotes

  const deleteNoteLocally = (noteId: string) => {
    setlocalNotes(localNotes.filter((note) => note.id !== noteId));
  }

  return (
    <SidebarGroupContentShadcn>
      <div className='relative flex items-center gap-2'>
        <SearchIcon className='absolute left-2 size-4 text-muted-foreground' />
        <Input
          placeholder='Search notes...'
          className='bg-transparent pl-8 border-none focus-visible:ring-0'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <SidebarMenu className='mt-4'>{filternotes.map((note)=>(
        <SidebarMenuItem key={note.id} className='group/item'>
         <SelectNoteButton note={note}/>

       
         <DeleteNoteButton noteId={note.id} deleteNoteLocally={deleteNoteLocally}/>
        </SidebarMenuItem>
      ))}</SidebarMenu>
    </SidebarGroupContentShadcn>
  )
}

export default SidebarGroupContent