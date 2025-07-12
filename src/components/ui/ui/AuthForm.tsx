"use client"
import { useRouter } from 'next/navigation'
import { CardContent,CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { loginAction, signupAction } from '@/action/users'
import Link from 'next/link'
import React from 'react'
type Props = {
    type: 'login' | 'signup'
}
function AuthForm({type}:Props) {
    const isLoginForm = type === 'login'
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
const handleSubmit = (formData:FormData) => {

startTransition(async () => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    let errorMessage;
    let title;
    let description;
    if (isLoginForm) {
        const loginResult = await loginAction(email, password)
        errorMessage = loginResult?.errorMessage
        title = 'logged in'
        description = 'logged in'
    } else {
        const signupResult = await signupAction(email, password)
        errorMessage = signupResult?.errorMessage
        title = 'signed up'
        description = 'check your mail for the verification link'
    }
    if (!errorMessage) {
        toast.success(title,{
            description,style:{background:"green"}
        })
        router.replace('/');
    } else {
        toast.error(errorMessage, {
           description:errorMessage,style:{background:"red"}
        })
    }
})
}

  return (
    <form action={handleSubmit}>
        <CardContent className='grid w-full items-center gap-4'>
                <div  className='flex flex-col space-y-1.5'>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' name='email' placeholder='Enter your email' required type='email' disabled={isPending}></Input>
                </div>
                <div  className='flex flex-col space-y-1.5'>
                    <Label htmlFor='password'>Password</Label>
                    <Input id='password' name='password' placeholder='Enter your password' required type='password' disabled={isPending}></Input>
                </div>
        </CardContent >
        <CardFooter className='mt-5 flex flex-col gap-2'>
            <Button className='w-full' disabled={isPending}>
                {isPending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'SignUp'}
            </Button>
            <p className='text-xs'>
                {isLoginForm ? "Don't have an account?" : "Already have an account ? "} {''}
                <Link href={isLoginForm ? "/signup" : "/login"} className='text-primary underline font-medium ${isPending ? "pointer-events-none opacity-50"}'>
                    {isLoginForm ? "SignUp" : "Login"}
                </Link>
            </p>
        </CardFooter>

       
    
    </form>
  )
}

export default AuthForm