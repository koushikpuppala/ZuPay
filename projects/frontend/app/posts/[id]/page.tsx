import { getComments, getPost } from '@import/actions'
import { Comments } from '@import/components'
import { PostDetailsProps } from '@repo/types'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({ params }: PostDetailsProps) => {
	const post = await getPost(params.id)

	if (!post) notFound()

	return { title: `${post.title}` }
}

const FacultyTestPage = async ({ params }: PostDetailsProps) => {
	const [post, comments] = await Promise.all([getPost(params.id), getComments(params.id)])

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
				<Comments id={params.id} comments={comments} />
			</div>
		</main>
	)
}

export default FacultyTestPage
