'use server'
import { handleError } from '@/lib/utils'
import { getUser } from '@/auth/server'
import { prisma } from '@/db/prisma'
import { geminiChat } from '@/gemini';

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
    
      const questionText = newQuestions.join(" ").toLowerCase();
    
      const relevantNotes = notes.filter((note) =>
        note.text.toLowerCase().includes(questionText)
      );
    
      const notesToUse = relevantNotes.length > 0 ? relevantNotes : notes;
    
      const formattedNotes = notesToUse
        .map((note, index) =>
          `
          <h3>Note ${index + 1}</h3>
          <p><strong>Text:</strong> ${note.text || "(empty note)"}</p>
          <p><strong>Created at:</strong> ${note.createdAt}</p>
          <p><strong>Last updated:</strong> ${note.updatedAt}</p>
          `.trim()
        )
        .join("\n");
    
      const prompt = `
       You are a helpful assistant that answers questions about a user's notes.

    - Your responses MUST be formatted in clean, valid HTML.
    - Use HTML tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, and <br> where appropriate.
    - Do NOT include triple backticks or language labels like \`\`\`html.
    - The response should look beautiful, easy to read, and well-structured.
    - Avoid inline styles, JavaScript, or custom attributes.
    - Do NOT wrap the entire response in a single <p> tag unless it's truly just a single paragraph.
    
        Notes:
        ${formattedNotes}
    
        User's question(s):
        ${newQuestions.join('\n')}
      `;
    
      const answer = await geminiChat([{ role: "user", content: prompt }]);
      return answer;
    };
    
    