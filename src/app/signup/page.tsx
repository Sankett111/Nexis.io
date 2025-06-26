import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AuthForm from '@/components/ui/ui/AuthForm'
import React from 'react'

function SignUp() {
  return (
    <div className='mt-20 flex flex-1 flex-col items-center'>
        <Card className='w-full max-w-md'>
            <CardHeader className='mb-4' >
                <CardTitle className='text-center text-2xl font-bold'>SignUp</CardTitle>
            </CardHeader>
            <CardContent>
                <AuthForm type='signup'/>
            </CardContent>
        </Card>
        </div>
  )
}

export default SignUp