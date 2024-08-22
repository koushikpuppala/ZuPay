import { CreateForm } from '@import/components'

export const metadata = {
	title: 'Create Post',
	description: 'Create a new post',
}

const CreatePostPage = () => {
	return (
		<main className='container mx-auto h-screen py-16'>
			<div className='flex items-center justify-center py-8'>
				<h2 className='text-primary text-center text-2xl font-semibold'>Create a New Post</h2>
			</div>
			<CreateForm />
		</main>
	)
}

export default CreatePostPage
