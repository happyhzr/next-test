import Link from "next/link"
import Image from "next/image"

import { auth, signOut, signIn } from "@/auth"

export default async function Navbar() {
    const session = await auth()

    return (
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex items-center justify-between">
                <Link href='/'>
                    <Image src='/panda.webp' alt="logo" width={144} height={30} />
                </Link>
                <div className="flex items-center gap-5">
                    {
                        session && session?.user ? (
                            <div className='flex items-center gap-5'>
                                <Link href='/startup/create'>
                                    <span>Create</span>
                                </Link>
                                <form action={
                                    async () => {
                                        "use server"
                                        await signOut({ redirectTo: "/" })
                                    }
                                }>
                                    <button type="submit">Logout</button>
                                </form>
                                <Link href={`/user/${session?.user?.id}`}>
                                    <span>{session?.user?.name}</span>
                                </Link>
                            </div>
                        ) : (
                            <form action={
                                async () => {
                                    "use server"
                                    await signIn("github", { redirectTo: "/" })
                                }
                            }>
                                <button type="submit">Login</button>
                            </form>
                        )
                    }
                </div>
            </nav>
        </div>
    )
}