'use server'
import { createClient } from '@/auth/server'
import { handleError } from '@/lib/utils'
import { prisma } from '@/db/prisma'

export const loginAction = async (email: string, password: string) => {
    try{
        const {auth} = await createClient()
        const {error} = await auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            return {errorMessage: error.message}
        }
    }
    catch(error){
        return handleError(error)
    }
}
export const logOutAction = async () => {
    try{
        const {auth} = await createClient()
        const {error} = await auth.signOut()
        if (error) {
            return {errorMessage: error.message}
        }
    }
    catch(error){
        return handleError(error)
    }
}

export const signupAction = async (email: string, password: string) => {
    try{
        const {auth} = await createClient()
        const {data, error} = await auth.signUp({
            email,
            password,
        })
        if (error) {
            return {errorMessage: error.message}
        }
        const userId = data.user?.id;
        if (!userId) {
            return {errorMessage: 'User ID not found'}
        }
        await prisma.user.create({
            data: {
                id: userId,
                email: email,
            },
        })
    }
    catch(error){
        return handleError(error)
    }
}