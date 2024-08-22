import { getComments, getMyPost } from '@import/actions'
import { ModifyPosts } from '@import/components'
import { CommentsProps, PostDetailsProps } from '@repo/types'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({ params }: PostDetailsProps) => {
	const post = await getMyPost(params.id)

	if (!post) notFound()

	return { title: `${post.title}` }
}

const FacultyTestPage = async ({ params }: PostDetailsProps) => {
	const [post, comments] = await Promise.all([getMyPost(params.id), getComments(params.id)])

	if (!post) notFound()

	return (
		<main className='container mx-auto flex h-screen flex-grow justify-center px-8 py-6 pt-16'>
			<div className='h-fit max-w-4xl'>
				<div className='p-6'>
					<h2 className='mb-4 text-2xl font-bold'>{post.title}</h2>
					<div className='mb-6 flex items-center justify-between text-sm text-gray-500'>
						<span>By {post.author}</span>
						<span>Published on {new Date(post.createdAt).toLocaleDateString()}</span>
					</div>
					<p className='text-lg text-gray-700'>{post.content}</p>
				</div>
				<ModifyPosts id={params.id} />
				<div className='mt-8 p-8'>
					<h2 className='text-quaternary mb-4 text-xl font-semibold'>Comments</h2>

					{comments.length === 0 ? (
						<p className='text-gray-700'>No comments yet. Be the first to comment!</p>
					) : (
						<ul className='list-none space-y-4'>
							{comments.map((comment: CommentsProps) => (
								<li key={comment._id} className='flex items-center gap-2 rounded-lg p-4'>
									<div className='text-black-200 flex h-8 w-8 items-center justify-center rounded-full border border-black text-base font-bold backdrop-blur'>
										{comment.user[0]}
									</div>
									<div className='flex flex-col gap-px'>
										<p className='text-base text-gray-700'>{comment.comment}</p>
										<p className='text-secondary text-xs'>
											- {comment.user}, {new Date(comment.createdAt).toLocaleString()}
										</p>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</main>
	)
}

export default FacultyTestPage
