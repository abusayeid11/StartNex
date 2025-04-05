import React, { use } from "react";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

const Navbar = async() =>{

    const session = await auth();

    if(session){
   console.log({session})
    }

    return(
      <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
        <nav className="flex justify-between items-center">
            <Link href="/">
            <img src="/logo.png" alt="" />
            </Link>

            <div className="text-black flex space-x-2">

            {
                session && session?.user? (
                    <>
                      <Link href='./startup/create'>
                      <span>Create</span>
                      </Link>

                      <form action={
                        async ()=>{
                            "use server"
                            await signOut({redirectTo: '/' });
                        }
                      }>

                      <button type="submit">
                        Logout
                      </button>

                      </form>

                      <Link href=''>
                      <span>{session?.user?.name}</span>
                      </Link>
                    </>
                ):(
                   <form action={
                    async ()=>{
                        "use server"
                        await signIn('github');
                    }
                   }>
                    <button type="submit" className="cursor-pointer">
                        LogIn
                    </button>
                   </form>
                )
            }
            </div>
        </nav>
      </header>
    )

}

export default Navbar;