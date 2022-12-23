import { getSession } from 'next-auth/react'
import React from 'react'

const Private = ({ session }) => {
  return (
    <>
      <h2 className='text-2xl my-4'>Protected from Server</h2>
      <h4>You are logged in as {session.user.email}</h4>
    </>
  )
}

export default Private

export async function getServerSideProps({req, res, resolvedUrl}) {

    // console.log({req: req.url}) // /private
  // console.log({resolved: context.resolvedUrl}) // /private - works always

  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: `/user/signin?returnTo=${resolvedUrl}`,
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}