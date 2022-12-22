import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const Security = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === 'loading') return <div>Loading...</div>
  if (!session) router.push(`/user/signin?returnTo=${router.asPath}`)
  return (
    <div>Security</div>
  )
}

export default Security