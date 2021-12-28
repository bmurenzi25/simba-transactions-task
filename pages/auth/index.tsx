import { useFormik } from 'formik'
import Link from 'next/link'
import React, { useReducer, useState } from 'react'
import * as Yup from 'Yup';

function Auth() {
    interface authState {
        showLoginForm: boolean,
        showRegistrationForm: boolean
    }

    const {handleSubmit, handleChange, values, touched, errors} = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().max(30, 'Email is required and should not be greater than 30 characters long').required(),
            password: Yup.string().max(30, 'Password is required and should not be greater than 30 characters long').required(),
            name: Yup.string().max(255, 'Name shoukd not be more than 250 characters long')
        }),
        onSubmit: ({email, password, name}) => {
            alert(`Email: ${email} and password ${password}, names : ${name}`)
        }
    });
    const handlePageChange = () => {
        setPage({ showLoginForm : !page.showLoginForm, showRegistrationForm: !page.showRegistrationForm })
    }
    const [page, setPage] = useState({ showLoginForm: true, showRegistrationForm: false });

    return (
        <div className='grid grid-cols-2 h-screen'>
            <div className='flex flex-col justify-center items-center gap-4 bg-gray-700'>
                <div className='text-white'>
                    SIMBA
                </div>
                <p className='row-span-2 text-white'>
                    A trustworthy platform to make your money Transactions!
                </p>
            </div>
            {page.showLoginForm ?
                <div className='flex flex-col gap-16 p-32'>
                    <p className='text-center font-bold text-xl'>Welcome back!</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-8 bg-white shadow-md p-8 mb-4 rounded'>
                        <div className='mb-4'>
                            <label htmlFor="username" className='block text-gray-500 text-sm font-bold mb-2'>Email</label>
                            <input type="email" value={values.email} name='email' onChange={handleChange} placeholder='Enter your email' className='shadow appearance-none border rounded w-full py-3 px-6 text-gray-700 focus:shadow-outline' />
                        </div>
                        <div className='mb-6'>
                            <label htmlFor="username" className='block text-gray-500 text-sm font-bold mb-2'>Password</label>
                            <input type="password" value={values.password} name='password' onChange={handleChange} placeholder='************' className='shadow appearance-none border rounded w-full py-3 px-6 text-gray-700 focus:shadow-outline' />
                        </div>
                        <div className='flex items-center justify-between'>
                            <input type="submit" value={'SIGN IN'} className='inline-flex justify-center text-white font-bold hover:text-blue-400 bg-slate-700 hover:bg-slate-900 py-2 px-4 rounded' />
                            <a className='inline-block align-baseline text-blue-700 hover:text-gray-800' href='#' onClick={handlePageChange}>Create Account</a>
                        </div>
                    </form>
                </div> :
                <div className='flex flex-col gap-16 p-32'>
                    <p className='text-center font-bold text-xl'>Fill out this form to register!</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-8 bg-white shadow-md p-8 mb-4 rounded'>
                        <div className='mb-4'>
                            <label htmlFor="names" className='block text-gray-500 text-sm font-bold mb-2'>Names</label>
                            <input type="text" name='name' value={values.name} onChange={handleChange} placeholder='Enter your names' className='shadow appearance-none border rounded w-full py-3 px-6 text-gray-700 focus:shadow-outline' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="username" className='block text-gray-500 text-sm font-bold mb-2'>Email</label>
                            <input type="email" name='email' value={values.email} onChange={handleChange} placeholder='Enter your email' className='shadow appearance-none border rounded w-full py-3 px-6 text-gray-700 focus:shadow-outline' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="password" className='block text-gray-500 text-sm font-bold mb-2'>Password</label>
                            <input type="password" name='password' value={values.password} onChange={handleChange} placeholder='************' className='shadow appearance-none border rounded w-full py-3 px-6 text-gray-700 focus:shadow-outline' />
                        </div>
                        <div className='flex items-center justify-between'>
                            <input type="submit" value={'SIGN UP'} className='inline-flex justify-center text-white font-bold hover:text-blue-400 bg-slate-700 hover:bg-slate-900 py-2 px-4 rounded' />
                            <a className='inline-block align-baseline text-blue-700 hover:text-gray-800 cursor-pointer' onClick={handlePageChange}>Go Back</a>
                        </div>
                    </form>
                </div>}
        </div>
    )
}

export default Auth
