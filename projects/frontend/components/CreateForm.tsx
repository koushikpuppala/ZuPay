'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@import/contexts'
import { createPost } from '@import/actions'
import { toast } from 'react-toastify'
import { useFormStatus } from 'react-dom'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'

const CreateForm = () => {
	const { currentUser: user } = useAuth()
	const router = useRouter()

	const [form, setForm] = useState({ title: '', content: '' })
	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		setDisabled(!form.title || !form.content)
	}, [form])

	if (!user) {
		return (
			<div className='flex items-center justify-center py-8'>
				<p className='text-xl'>You need to be logged in to create a post.</p>
			</div>
		)
	}

	return (
		<form
			action={async form => {
				try {
					const { post } = await createPost(form)
					console.log(post)
					if (post) {
						toast.success('Post created successfully')
						router.push(`/my-posts/${post._id}`)
					}
				} catch (error) {
					toast.error('Failed to create post')
					console.log(error)
				}
			}}
			className='mx-auto max-w-lg rounded-lg border border-gray-200 p-8 shadow-md'>
			<div className='mb-4'>
				<label className='mb-2 block text-gray-800' htmlFor='title'>
					Title <span className='text-red-500'>*</span>
				</label>
				<input
					type='text'
					id='title'
					name='title'
					value={form.title}
					onChange={e => setForm({ ...form, title: e.target.value })}
					className='text-black-200 bg-white-100 w-full rounded-lg px-4 py-2 outline-none'
					placeholder='Enter post title'
				/>
			</div>
			<div className='mb-4'>
				<label className='mb-2 block text-gray-800' htmlFor='content'>
					Content <span className='text-red-500'>*</span>
				</label>
				<textarea
					id='content'
					name='content'
					value={form.content}
					onChange={e => setForm({ ...form, content: e.target.value })}
					className='text-black-200 bg-white-100 h-40 w-full rounded-lg px-4 py-2 outline-none'
					placeholder='Enter post content'
				/>
			</div>
			<div className='text-center'>
				<SubmitButton isDisabled={disabled} />
			</div>
		</form>
	)
}

const SubmitButton = ({ isDisabled }: { isDisabled: boolean }) => {
	const { pending } = useFormStatus()

	return (
		<button
			type='submit'
			disabled={isDisabled}
			className={classNames(
				{
					'bg-secondary cursor-not-allowed': isDisabled,
					'bg-accent hover:bg-opacity-90': !isDisabled,
				},
				'placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none',
			)}>
			{pending ? (
				<div className='flex flex-row items-center justify-center gap-4 align-middle'>
					<div className='h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-l-transparent border-r-transparent' />
					Creating...
				</div>
			) : (
				'Create Post'
			)}
		</button>
	)
}

export default CreateForm
