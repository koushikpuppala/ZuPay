'use client'

import { deletePost } from '@import/actions'
import { useRouter } from 'next/navigation'
import React from 'react'

const ModifyPosts = ({ id }: { id: string }) => {
	const router = useRouter()

	return (
		<div className='flex justify-end space-x-4 px-6 py-4'>
			<button
				onClick={() => router.push(`/my-posts/${id}/edit`)}
				className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'>
				Edit
			</button>
			<button
				onClick={() => {
					const confirm = window.confirm('Are you sure you want to delete this post?')
					console.log(confirm)
					if (confirm) {
						deletePost(id)
						router.push('/my-posts')
					}
				}}
				className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'>
				Delete
			</button>
		</div>
	)
}

export default ModifyPosts
