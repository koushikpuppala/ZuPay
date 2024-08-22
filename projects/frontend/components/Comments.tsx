'use client'

import { addComment, deleteComment } from '@import/actions'
import { useAuth } from '@import/contexts'
import { CommentsProps } from '@repo/types'
import { useState } from 'react'

const Comments = ({ id, comments }: { id: string; comments: CommentsProps[] }) => {
	const { currentUser } = useAuth()

	const [comment, setComment] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			await addComment(id, comment)
			setComment('')
		} catch (error) {
			console.error(error)
		}

		setLoading(false)
	}

	return (
		<div className='mt-8 p-8'>
			<h2 className='text-quaternary mb-px text-xl font-semibold'>Comments</h2>

			{comments.length === 0 ? (
				<p className='text-gray-700'>No comments yet. Be the first to comment!</p>
			) : (
				<ul className='-ml-6 list-none space-y-4'>
					{comments.map(comment => (
						<li key={comment._id} className='flex flex-row justify-between'>
							<div className='flex items-center gap-2 rounded-lg px-4 py-2'>
								<div className='text-black-200 flex h-8 w-8 items-center justify-center rounded-full border border-black text-base font-bold backdrop-blur'>
									{comment.user[0]}
								</div>
								<div className='flex flex-col gap-px'>
									<p className='text-base text-gray-700'>{comment.comment}</p>
									<p className='text-secondary text-xs'>
										- {comment.user}, {new Date(comment.createdAt).toLocaleString()}
									</p>
								</div>
							</div>
							{currentUser && comment.uid === currentUser.uid && (
								<button
									className='text-red-500 hover:text-opacity-90'
									onClick={() => {
										if (confirm('Are you sure you want to delete this comment?')) {
											try {
												deleteComment(comment._id)
											} catch (error) {
												console.error(error)
											}
										}
									}}>
									Delete
								</button>
							)}
						</li>
					))}
				</ul>
			)}

			{currentUser ? (
				<form onSubmit={handleSubmit} className='mt-6 flex flex-col'>
					<textarea
						className='text-black-200 bg-white-100 h-24 w-full rounded-lg px-4 py-2 outline-none'
						placeholder='Write a comment...'
						value={comment}
						onChange={e => setComment(e.target.value)}
					/>
					<button
						type='submit'
						className={`bg-accent hover:bg-accent-dark text-white-100 mt-4 rounded-lg px-6 py-2 transition-colors ${loading || !comment ? 'cursor-not-allowed opacity-50' : ''}`}
						disabled={loading || !comment}>
						{loading ? 'Submitting...' : 'Submit Comment'}
					</button>
				</form>
			) : (
				<p className='mt-4 text-gray-700'>You must be logged in to comment.</p>
			)}
		</div>
	)
}

export default Comments
