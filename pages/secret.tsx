import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Secret = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  if (status === 'loading') return 'loading...'
  if (!session) router.push(`/user/signin/?returnTo=${router.asPath}`)
  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <h2 className='my-3 text-3xl'>Super Secret page - Client</h2>
      <Image src={session?.user?.image || 'https://avatars.githubusercontent.com/u/96835101?v=4'} alt="avatar" width={150} height={150} className="rounded-full" />
      <h3>You are logged in as: {session?.user?.email}</h3>
      <button className='bg-gray-500 p-4 py-2 mt-4' onClick={() => signOut()}>Logout</button>
    </div>
  )

}

export default Secret