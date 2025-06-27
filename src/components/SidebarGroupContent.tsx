"use client"
import React from 'react'
import { Note } from '@prisma/client'
type Props = {
  notes:Note[];
}

function SidebarGroupContent({notes}: Props) {
  console.log(notes);
  return (
    <div>Your notes will appear here</div>
  )
}

export default SidebarGroupContent