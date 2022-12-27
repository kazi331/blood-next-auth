import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function LoginButton() {
  const { data: session, status } = useSession()
  // console.log(session) // print session data
  if (!session) {
    return <Link className="bg-gray-600 py-1 px-3 rounded-lg" href="/user/signin" >Signin</Link>
  }
  if (status === "authenticated") {
    return (
      <div className="flex items-center justify-center gap-2">
        {session?.user?.name || session?.user?.name}
        {session?.user?.image && <Image src={session.user.image} placeholder="blur" blurDataURL={session?.user?.image} loading="lazy" width={40} height={40} className="rounded-full" alt="user image" />}
        <button className="py-1 px-3 rounded bg-red-500 font-bold" onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

}