import { signIn } from 'next-auth/react'
import React from 'react'
import { AiOutlineGoogle, AiOutlineTwitter } from 'react-icons/ai'
import { CgFacebook } from 'react-icons/cg'
import { Facebook, Github, Google, Instagram, Twitter } from '../components/Icons'

const Social = ({returnTo}) => {
  return (
    <>
      <p className='text-center pt-3'>Or continue with social</p>
     <div className='flex items-center justify-center gap-4 my-2 bg-gray-100 dark:bg-white shadow-lg rounded py-4'>
        <button className='p-1 w-8 h-10 hover:-translate-y-1 transition-all flex items-center justify-center' onClick={() => signIn('facebook')}> <Facebook /> </button>
        <button className='p-1 w-8 h-10 hover:-translate-y-1 transition-all flex items-center justify-center' onClick={() => signIn('twitter')}> <Twitter /> </button>
        <button className='p-1 w-8 h-10 hover:-translate-y-1 transition-all flex items-center justify-center' onClick={() => signIn('github', {callbackUrl: returnTo })}> <Github /> </button>
        <button className='p-1 w-8 h-10 hover:-translate-y-1 transition-all flex items-center justify-center' onClick={() => signIn('google', {callbackUrl: returnTo})}> <Google /> </button>
        <button className='p-1 w-8 h-10 hover:-translate-y-1 transition-all flex items-center justify-center' onClick={() => signIn('instagram')}> <Instagram /> </button>
      </div>
    </>
  )
}

export default Social