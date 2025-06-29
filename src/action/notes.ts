'use server'
import { handleError } from '@/lib/utils'
import { getUser } from '@/auth/server'
import { prisma } from '@/db/prisma'

export const updateNoteAction = async (noteId: string , text: string) => {
try{
const user = await getUser();

if (!user) throw new Error('login required to make changes');
await prisma.note.update({
    where: { id : noteId},
    data: {text},
})
     return {errorMessage: null}
        }
     catch(error){
        return handleError(error)
    }
};

export const createNoteAction = async (noteId: string ) => {
    try{
    const user = await getUser();
    
    if (!user) throw new Error('login required to create a note');
    await prisma.note.create({
        data:{
            id: noteId,
            authorId: user.id,
            text: '',
        }
    })
         return {errorMessage: null}
            }
         catch(error){
            return handleError(error)
        }
    };