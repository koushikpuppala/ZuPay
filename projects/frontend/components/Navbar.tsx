'use client'

import { useAuth } from '@import/contexts'
import Link from 'next/link'

const Navbar = () => {
	const { currentUser, logout } = useAuth()

	return (
		<nav className='fixed w-full bg-white py-4 shadow-md'>
			<div className='container mx-auto flex items-center justify-between'>
				<Link href='/' className='text-tertiary text-2xl font-semibold'>
					Blog
				</Link>
				<div className='flex items-center gap-px md:gap-2'>
					<Link href='/create' className='text-quaternary rounded px-4 py-2 hover:bg-slate-200'>
						Create Post
					</Link>
					<Link href='/posts' className='text-quaternary rounded px-4 py-2 hover:bg-slate-200'>
						All Posts
					</Link>
					{currentUser ? (
						<div className='flex gap-px md:gap-2'>
							<Link href='/my-posts' className='text-quaternary rounded px-4 py-2 hover:bg-slate-200'>
								My Posts
							</Link>
							<button onClick={logout} className='text-quaternary rounded px-4 py-2 hover:bg-slate-200'>
								Logout
							</button>
							<div className='flex items-center'>
								<div className='bg-violet-gradient text-primary flex h-10 w-10 items-center justify-center rounded-full text-2xl font-extrabold backdrop-blur'>
									{currentUser.displayName ? currentUser.displayName[0] : 'U'}
								</div>
								<span className='text-white-100 sr-only ml-2'>
									{currentUser.displayName || 'currentUser'}
								</span>
							</div>
						</div>
					) : (
						<Link href='/login' className='text-quaternary rounded px-4 py-2 hover:bg-slate-200'>
							Login
						</Link>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
