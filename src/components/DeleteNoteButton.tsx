'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { deleteNoteAction } from "@/action/notes";

type Props = {
    noteId:string;
    deleteNoteLocally: (noteId: string) => void;
}
const errorMessage = "Failed to delete note"
function DeleteNoteButton({noteId, deleteNoteLocally}: Props) {
const router = useRouter()
const noteIdParam = useSearchParams().get('noteId') || ''
const [isPending, startTransition] = useTransition()

    const handleDeleteNote =  () => {
    startTransition(async () => {
        const {errorMessage}= await deleteNoteAction(noteId)
        if (!errorMessage) {
            toast.success('Note deleted successfully',{
              style:{
                background:'red',
              }
            })
            deleteNoteLocally(noteId)
            if(noteId === noteIdParam) {
                router.replace('/')
            }
        } else {
            toast.error(errorMessage)
        }
    })
    
}


    return (
    <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant='ghost' className='absolute right-2 top-1/2 -translate-y-1/2 size-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity'>
        <Trash2 className='w-4 h-4'/>
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteNote} className="w-24 bg-destructive text-destructive-foreground hover:bg-destructive/90 ">
        {isPending ? <Loader2 className='w-4 h-4 animate-spin'/> : <Trash2 className='w-4 h-4'/>}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


  )
}

export default DeleteNoteButton