import Link from 'next/link'

const HomePage = async () => {
	return (
		<header className='h-screen'>
			<div className='container mx-auto flex h-full flex-col justify-center text-center align-middle'>
				<h1 className='text-accent text-5xl font-bold'>Welcome to Our Blog</h1>
				<p className='mt-4 text-xl text-gray-700'>Stay updated with the latest posts and insights</p>
				<Link
					href='/posts'
					className='bg-accent mx-auto mt-8 inline-block rounded px-4 py-2 font-semibold text-white hover:bg-opacity-85'>
					Explore Posts
				</Link>
			</div>
		</header>
	)
}

export default HomePage
