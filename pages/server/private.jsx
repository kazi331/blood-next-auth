import { getSession } from 'next-auth/react'
import React from 'react'

const Private = ({ session }) => {

  return (
    <div>
      <h2 className='text-3xl my-3'> This nested page is protected from server side</h2>
      <h4>You are logged in as {session.user.email}</h4>
    </div>
  )
}

export default Private

export async function getServerSideProps(context) {
  const { req, res, resolvedUrl } = context;
  // console.log({req: req.url}) // /private
  // console.log({resolved: context.resolvedUrl}) // /private
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