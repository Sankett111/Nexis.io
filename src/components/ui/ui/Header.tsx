import Image from "next/image"
import Link from "next/link"
import { Button } from "../button"
import { ModeToggle } from "@/components/ui/ui/DarkModeToggle"
import LogOutButton from "@/components/ui/ui/LogOutButton"
import { getUser } from "@/auth/server"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { shadow } from "@/styles/utils" 
async function Header() {
    const user = await getUser();

  return (
    <header className="relative flex h-20 w-full items-center justify-between bg-popover px-3 sm:px-8"
    style={{boxShadow: shadow}}
    >
        <SidebarTrigger className="absolute left-1 top-1" />
        <Link className="flex items-end gap-3" href="/">
        
         <h1 className="mx-4 pb-1 text-4xl font-medium  font-serif ">
         <span className="text-primary">Nexis</span>
            </h1>
            </Link>
        <div className="flex gap-4">
            {user ? <LogOutButton/>:(
                <><Button asChild>
                    <Link href="/signup" className="hidden sm:block">SignUp</Link>
                    </Button>
                    <Button asChild variant="outline">
                    <Link href="/login">Login</Link>
                    </Button>
                    </>
            )}
            <ModeToggle/>
        </div>
    
    </header>
     )
}

export default Header