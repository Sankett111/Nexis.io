'use server'
import { handleError } from '@/lib/utils'
import { getUser } from '@/auth/server'
import { prisma } from '@/db/prisma'

export const updateNoteAction = async (noteId: string , text: string) => {
try{
const user = await getUser();

if (!user) {
    console.error('User not authenticated');
    throw new Error('login required to make changes');
}

console.log('Updating note:', { noteId, text, userId: user.id });

const result = await prisma.note.update({
    where: { id : noteId},
    data: {text},
})
return {errorMessage: null}
}
catch(error){
    console.error('Error updating note:', error);
    return handleError(error)
}
};

export const createNoteAction = async (noteId: string ) => {
    try{
    const user = await getUser();
    
    if (!user) {
        console.error('User not authenticated for note creation');
        throw new Error('login required to create a note');
    }

    console.log('Creating note:', { noteId, userId: user.id });

    const result = await prisma.note.create({
        data:{
            id: noteId,
            authorId: user.id,
            text: '',
        }
    })

    console.log('Note created successfully:', result);
    return {errorMessage: null}
    }
    catch(error){
        console.error('Error creating note:', error);
        return handleError(error)
    }
};

export const deleteNoteAction = async (noteId: string) => {
    try{
    const user = await getUser();
    
    if (!user) {
        console.error('User not authenticated');
        throw new Error('login required to delete a note');
    }
    
    const result = await prisma.note.delete({
        where: { id : noteId , authorId: user.id}})
    return {errorMessage: null}
    }
    catch(error){
        console.error('Error deleting note:', error);
        return handleError(error)
    }
    };