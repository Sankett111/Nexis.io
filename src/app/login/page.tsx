import { Card , CardHeader, CardTitle , CardContent,} from '@/components/ui/card'
import React from 'react'
import AuthForm from '@/components/ui/ui/AuthForm'

function LoginPage() {
  return (
    <div className='mt-20 flex flex-1 flex-col items-center'>
        <Card className='w-full max-w-md'>
            <CardHeader className='mb-4' >
                <CardTitle className='text-center text-2xl font-bold'>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <AuthForm type='login'/>
            </CardContent>
        </Card>
        </div>
  )
}

export default LoginPage