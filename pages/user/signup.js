import { useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import signup_validate from '../../lib/validate';


const Signup = ({ session }) => {
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      blood: '',
      isAvailable: false,
    },
    onSubmit: onSubmit,
    validate: signup_validate,
  });

  async function onSubmit(values) {
    // console.log(values)
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      console.log(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log({ err })
    }
  }
  const { handleSubmit, getFieldProps, errors, touched } = formik;


  return (
    <div>
      <Head>
        <title>Signup </title>
      </Head>
      <div className="container mx-auto" >
        <div className="flex items-center justify-center gap-10 py-10 " >
          <div className='hidden lg:block'>
            <Image src="/icons/login2.svg" alt="login abber" width={400} height="600" />
          </div>
          <div className="form">
            <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-900 w-96 p-6 px-8 border dark:border-none rounded-lg shadow-lg" >
              <h2 className="text-center font-bold text-2xl  text-indigo-600 dark:text-white" > Signup </h2>
              <div className="flex flex-col mt-3" >
                <div className="flex items-center justify-between">
                  <label htmlFor="name" > Name </label>
                  {/* used red border instead of error message */}
                  {/* {errors.name && touched.name ? <div className='text-rose-600'>{errors.name}</div> : null} */}
                </div>
                <input {...getFieldProps('name')} className={`${errors.name && touched.name ? 'border-red-600' : ''} input-style`} type="text" name="name" id="name" placeholder="Mesut Özil" />
              </div>
              <div className="flex flex-col mt-3" >
                <div className="flex items-center justify-between">
                  <label htmlFor="email"> Email </label>
                  {/* {errors.email && touched.email ? <div className='text-rose-600'>{errors.email}</div> : null} */}
                </div>
                <input {...getFieldProps('email')} className={`${errors.email && touched.email ? 'border-red-600' : ''} input-style`} type="text" name="email" id="email" placeholder="someone@gmail.com" />
              </div>
              <div className="flex flex-col mt-3" >
                <div className="flex items-center justify-between">
                  <label htmlFor="password" > Password </label>
                  {/* {errors.password && touched.password ? <div className='text-rose-600 text-right'>{errors.password}</div> : null} */}
                </div>
                <input {...getFieldProps('password')} className={`${errors.password && touched.password ? 'border-red-600' : ''} input-style`} type="password" name="password" id="password" placeholder="●●●●●●●●●●●●" />
              </div>
              <div className="flex flex-col mt-3" >
                <div className="flex items-center justify-between">
                  <label htmlFor="blood" > Your Blood </label>
                  {/* {errors.blood && touched.blood ? <div className='text-rose-600'>{errors.blood}</div> : null} */}
                </div>
                <select {...getFieldProps('blood')} name="blood" id="blood" className={`${errors.blood && touched.blood ? 'border-red-600' : ''} input-style mt-2 focus:bg-gray-800`}>
                  <option value="">Select Blood Group</option>
                  <option value="a+">A Positive (A +) </option>
                  <option value="a-">A Negative (A -) </option>
                  <option value="b+">B Positive (B +) </option>
                  <option value="b-">B Negative (B -) </option>
                  <option value="o+">O Positive (O +) </option>
                  <option value="o-">O Negative (O -) </option>
                  <option value="ab+">AB Positive (AB +) </option>
                  <option value="ab-">AB Negative (AB -) </option>
                </select>
              </div>
              <div className="flex items-center gap-2 mt-3" >
                <input {...getFieldProps('isAvailable')} className='checkbox' type="checkbox" name="isAvailable" id="isAvailable" />
                <label className='select-none' htmlFor="isAvailable">Are you available to donate now?</label>
              </div>
              <button type="submit" disabled={loading} className={`py-2 px-4 w-full mt-6 rounded text-white bg-indigo-500 font-bold ${loading && 'opacity-50 cursor-wait'}`}>{loading? 'Processing...' : 'Sign me up'} </button>
              <div className="mt-4 text-sm">Have an account? <Link className="text-indigo-400" href="/user/signin">Sign in</Link></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return {
    props: { session }, // will be passed to the page component as props,
  };
}