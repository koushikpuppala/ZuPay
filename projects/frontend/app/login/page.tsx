'use client'

import { TOAST_OPTIONS } from '@import/constants'
import { useAuth } from '@import/contexts'
import { SearchParamsProps } from '@repo/types'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const LoginPage = ({ searchParams }: SearchParamsProps) => {
	const { login } = useAuth()

	const resetEmailSent = searchParams['reset-email-sent'] === 'true'
	const verifyEmailSent = searchParams['verify-email-sent'] === 'true'

	const [form, setForm] = useState({ email: '', password: '' })

	const [isDisabled, setIsDisabled] = useState(true)
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		if (form.email && form.password) setIsDisabled(false)
		else setIsDisabled(true)
	}, [form])

	useEffect(() => {
		if (resetEmailSent)
			toast.success('Password reset email sent successfully. Please check your email.', TOAST_OPTIONS)

		if (verifyEmailSent)
			toast.success(
				'Verification email sent successfully. Please check your email to verify your account.',
				TOAST_OPTIONS,
			)
	}, [resetEmailSent, verifyEmailSent])

	const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target

		setForm({ ...form, [name]: value })
	}

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		setLoading(true)

		try {
			await login(form.email, form.password)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<Link href='/'>
					<Image
						alt='Your Company'
						src='/android-chrome-512x512.png'
						width={512}
						height={512}
						className='mx-auto h-32 w-auto'
					/>
				</Link>
				<h2 className='mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Sign in to your account
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form className='space-y-6'>
					<div>
						<label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
							Email address <span className='text-red-500'>*</span>
						</label>
						<div className='mt-2'>
							<input
								id='email'
								name='email'
								type='email'
								value={form.email}
								onChange={handleChangeEvent}
								className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
								Password <span className='text-red-500'>*</span>
							</label>
							<div className='text-sm'>
								<Link href='/reset' className='text-accent font-semibold hover:text-opacity-90'>
									Forgot password?
								</Link>
							</div>
						</div>
						<div className='mt-2'>
							<input
								id='password'
								name='password'
								type={showPassword ? 'text' : 'password'}
								value={form.password}
								onChange={handleChangeEvent}
								className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div className='flex items-center justify-between'>
						<label htmlFor='show-password' className='block text-sm font-medium leading-6 text-gray-900'>
							Show Password
						</label>
						<div className='mt-2'>
							<input
								id='show-password'
								name='show-password'
								type='checkbox'
								checked={showPassword}
								onChange={() => setShowPassword(!showPassword)}
								className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							onClick={event => handleSubmit(event)}
							disabled={isDisabled || loading}
							className={classNames(
								{
									'bg-primary/75': isDisabled || loading,
									'bg-primary hover:bg-tertiary': !isDisabled && !loading,
								},
								'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
							)}>
							{loading ? 'Signing in...' : 'Sign in'}
						</button>
					</div>
				</form>

				<p className='mt-5 text-center text-sm text-gray-500'>
					Not a member?{' '}
					<Link href='/register' className='text-accent font-semibold leading-6 hover:text-opacity-90'>
						Register now
					</Link>
				</p>
			</div>
		</div>
	)
}

export default LoginPage
