import {Sidebar,SidebarContent,SidebarFooter,SidebarGroup,SidebarGroupLabel} from "@/components/ui/sidebar"
 import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { Note } from "@prisma/client";
import Link from "next/link";
import SidebarGroupContent from "../SidebarGroupContent";

  async function AppSidebar() {
    const user = await getUser();

    let notes: Note[] = [];

    if (user) {
      notes = await prisma.note.findMany({
        where: {
          authorId: user.id,
        },
        orderBy: {
          updatedAt: "desc",
        },
      })
      

    }

    return (
      <Sidebar>
        <SidebarContent >
          <SidebarGroup>
            <SidebarGroupLabel className="mb-2 mt-2 text-lg">{(user ? "Notes":(<p>
              <Link href="/login" className="underline">Login</Link>{" "}to see your notes
              </p>))}</SidebarGroupLabel>
              {user && <SidebarGroupContent notes={notes}/>}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }

  export default AppSidebar;