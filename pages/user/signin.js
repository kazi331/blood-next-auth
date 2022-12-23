import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Social from '../../components/Social'
import { signin_validate } from '../../lib/validate'

const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: signin_validate,
    onSubmit: onSubmit,
  });
  async function onSubmit(values) {
    const status = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: '/'
    }).then(res => {
      if (res?.error) {
        console.log({error: res.error})
        return res.error
      }
      else {
        router.push('/')
      }
    })
  }
  const { handleSubmit, getFieldProps, touched, errors } = formik;

  return (
    <div>
      <Head>
        <title>Signin </title>
      </Head>
      <div className="container mx-auto" >
        <div className="flex items-center justify-center gap-10 py-10 " >
          <div className='hidden lg:block'>
            <Image src="/icons/login2.svg" alt="login abber" width={400} height="600" />
          </div>
          <div>
            <form onSubmit={handleSubmit} className=" dark:bg-gray-900 bg-gray-100 w-80 p-6 border dark:border-none rounded-lg shadow-lg" >
              <h2 className="text-center font-bold text-2xl" > Signin </h2>
              <div className="flex flex-col mt-3" >
                <div className="flex items-center justify-between">
                  <label htmlFor="email"> Email </label>
                  {errors.email && touched.email ? <div className='text-red-600'>{errors.email}</div> : null}
                </div>
                <input {...getFieldProps('email')} className="input-style appearance-none " type="email" name="email" id="email" placeholder="someone@gmail.com" />
              </div>

              <div className="flex flex-col mt-3" >
                <div className="flex items-center justify-between">
                  <label htmlFor="password" > Password </label>
                  {errors.password && touched.password ? <div className='text-red-600'>{errors.password}</div> : null}
                </div>
                <input {...getFieldProps('password')} className="input-style pr-10" type="password" name="password" id="password" placeholder="●●●●●●●●●●●●" />
              </div>

              <button type="submit" disabled={loading} className={`py-2 px-4 w-full mt-6 rounded bg-indigo-500 text-white font-bold ${loading && 'opacity-50'}`}> Sign me in </button>
              <div className="mt-4 text-sm">Don&apos;t have an account? <Link className="text-indigo-400" href="/user/signup">Sign up</Link>
              </div>
            </form>
            <Social returnTo={router.query.returnTo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin