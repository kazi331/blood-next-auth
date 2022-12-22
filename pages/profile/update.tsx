import axios from 'axios';
import { useFormik } from 'formik';
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner } from '../../components/Icons';


const Update = () => {
  const [errors, setErrors] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
    onSubmit: async values => {
      setLoading(true)
      try {
        const res = await axios.post('http://localhost:5000/update', { ...values, phone: `0${values.phone}` })
        const data = await res.data;
        console.log(data);
        setErrors({ name: '', email: '', phone: '', password: '' });
        // toast.success('Account Created Successfully.')
        router.push('/')
        setLoading(false);
      } catch (err: any) {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors)
        setLoading(false)
      }
    },
  });
  const { handleBlur, handleChange, handleSubmit } = formik;

  return (
    <div>
      <Head>
        <title>Register </title>
      </Head>
      <div className="container mx-auto" >
        <div className="flex items-center justify-center min-h-screen py-10" >
          <form onSubmit={handleSubmit} className="border border-gray-800 rounded bg-gray-900 w-80 p-6" >
            <h2 className="text-center font-bold text-2xl" > Update </h2>
            <div className="flex flex-col mt-3" >
              <label htmlFor="name" > Name </label>
              <input onChange={handleChange} className="input-style" type="text" name="name" id="name" placeholder="Name" required />
              <span className="text-red-500">{errors.name}</span>
            </div>
            <div className="flex flex-col mt-3" >
              <label htmlFor="email" > Email </label>
              <input onChange={handleChange} className="input-style" type="email" name="email" id="email" placeholder="Email" required />
              <span className="text-red-500">{errors.email}</span>
            </div>
            <div className="flex flex-col mt-3" >
              <label htmlFor="phone"> Phone </label>
              <input onChange={handleChange} className="input-style appearance-none " type="number" name="phone" id="phone" placeholder="11 digits phone" required />
              <span className="text-red-500">{errors.phone}</span>
            </div>
            <div className="flex flex-col mt-3" >
              <label htmlFor="password" > Password </label>
              <input onChange={handleChange} className="input-style" type="password" name="password" id="password" placeholder="***********" required />
              <span className="text-red-500">{errors.password}</span>
            </div>
            <button type="submit" disabled={loading} className={`py-2 px-4 w-full mt-6 rounded bg-indigo-500 font-bold ${loading && 'opacity-50'}`}>
              {loading ? 'Updating...' : 'Update'} {loading && <Spinner />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Update;