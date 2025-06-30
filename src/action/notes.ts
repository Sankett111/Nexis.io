'use server'
import { handleError } from '@/lib/utils'
import { getUser } from '@/auth/server'
import { prisma } from '@/db/prisma'
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import openai from '@/openai'

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

    export const askAiAboutNoteAction = async (
        newQuestions: string[],
        responses: string[],
      ) => {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to ask AI questions");
      
        const notes = await prisma.note.findMany({
          where: { authorId: user.id },
          orderBy: { createdAt: "desc" },
          select: { text: true, createdAt: true, updatedAt: true },
        });
      
        if (notes.length === 0) {
          return "You don't have any notes yet.";
        }
      
        const formattedNotes = notes
          .map((note) =>
            `
            Text: ${note.text}
            Created at: ${note.createdAt}
            Last updated: ${note.updatedAt}
            `.trim(),
          )
          .join("\n");
      
        const messages: ChatCompletionMessageParam[] = [
          {
            role: "developer",
            content: `
                You are a helpful assistant that answers questions about a user's notes. 
                Assume all questions are related to the user's notes. 
                Make sure that your answers are not too verbose and you speak succinctly. 
                Your responses MUST be formatted in clean, valid HTML with proper structure. 
                Use tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, and <br> when appropriate. 
                Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph. 
                Avoid inline styles, JavaScript, or custom attributes.
                
                Rendered like this in JSX:
                <p dangerouslySetInnerHTML={{ __html: YOUR_RESPONSE }} />
          
                Here are the user's notes:
                ${formattedNotes}
                `,
          },
        ];
      
        for (let i = 0; i < newQuestions.length; i++) {
          messages.push({ role: "user", content: newQuestions[i] });
          if (responses.length > i) {
            messages.push({ role: "assistant", content: responses[i] });
          }
        }
      
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages,
        });
      
        return completion.choices[0].message.content || "A problem has occurred";
      };