import { getMyPosts } from '@import/actions'
import { SearchBox } from '@import/components'
import { PostsProps, SearchParamsProps } from '@repo/types'
import { formatDistance } from 'date-fns'
import Link from 'next/link'

const MyPostsPage = async ({ searchParams }: SearchParamsProps) => {
	const posts: PostsProps[] = await getMyPosts()

	const search = (searchParams['search'] as string) ?? ''

	const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))

	return (
		<main className='container mx-auto h-screen py-16'>
			<div className='flex items-center justify-between py-8'>
				<h2 className='text-primary text-center text-2xl font-semibold'>My Posts</h2>

				<SearchBox />
			</div>
			<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
				{filteredPosts.length > 0 ? (
					filteredPosts.map(post => (
						<Link
							key={post._id}
							href={`/my-posts/${post._id}`}
							className='border-tertiary block rounded-lg border p-4 shadow-md outline-none transition-shadow hover:shadow-lg'>
							<h3 className='text-accent line-clamp-1 text-xl font-bold'>{post.title}</h3>
							<span className='flex w-full justify-end px-2 py-px text-center text-sm text-gray-400'>
								{formatDistance(new Date(post.updatedAt), new Date(), { addSuffix: true })}
							</span>
							<p className='mt-px line-clamp-3 text-gray-600'>{post.content.slice(0, 100)}...</p>
							<div className='mt-2 flex flex-row items-center justify-between align-middle'>
								<span className='text-accent block'>Read More</span>
								<div className='flex items-center gap-1'>
									<div className='text-black-200 flex h-5 w-5 items-center justify-center rounded-full border border-black text-xs font-bold backdrop-blur'>
										{post.author[0]}
									</div>
									<span className='text-sm text-gray-700'>{post.author}</span>
								</div>
							</div>
						</Link>
					))
				) : (
					<p className='text-secondary text-center'>No posts available.</p>
				)}
			</div>
		</main>
	)
}

export default MyPostsPage
