'use client'
import { User } from "@supabase/supabase-js"
type Props={
    user:User | null
}

function AiButton({user}:Props) {
    console.log(user?.email)
  return (
    <div>AiButton</div>
  )
}

export default AiButton