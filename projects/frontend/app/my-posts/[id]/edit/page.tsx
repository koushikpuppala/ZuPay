import { getMyPost } from '@import/actions'
import { UpdateForm } from '@import/components'
import { PostDetailsProps } from '@repo/types'
import { notFound } from 'next/navigation'

export const metadata = {
	title: 'Update Post',
	description: 'Update a new post',
}

const UpdatePostPage = async ({ params }: PostDetailsProps) => {
	const post = await getMyPost(params.id)

	if (!post) notFound()

	return (
		<main className='container mx-auto h-screen py-16'>
			<div className='flex items-center justify-center py-8'>
				<h2 className='text-primary text-center text-2xl font-semibold'>Update Post Form</h2>
			</div>
			<UpdateForm id={params.id} title={post.title} content={post.content} />
		</main>
	)
}

export default UpdatePostPage
