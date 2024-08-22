import '@import/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

import { MongoDB } from '@repo/database'
import { Metadata, Viewport } from 'next'
import { Open_Sans } from 'next/font/google'
import { RootLayoutProps } from '@repo/types'
import { ToastContainer } from 'react-toastify'
import { AuthContextProvider } from '@import/contexts'
import { Navbar } from '@import/components'
import Link from 'next/link'

export const metadata: Metadata = {
	title: {
		default: 'Blog App',
		template: '%s | Blog App',
	},
	description: 'A blog app',
	applicationName: 'Blog App',
	keywords: [],
	authors: [{ name: 'Koushikpuppala', url: 'http://koushikpuppala.com' }],
	creator: 'Koushikpuppala',
	formatDetection: { email: true, address: true, telephone: true, date: true, url: true },
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#2B36895A',
}

const OpenSans = Open_Sans({
	subsets: ['latin', 'latin-ext'],
	weight: ['300', '400', '500', '600', '700', '800'],
	display: 'swap',
})

const RootLayout = async ({ children }: RootLayoutProps) => {
	await MongoDB.connect()

	return (
		<html lang='en'>
			<body className={OpenSans.className}>
				<AuthContextProvider>
					{/* Navigation Bar */}
					<Navbar />
					<ToastContainer />
					{children}
					<footer className='fixed bottom-0 w-full py-4 text-gray-900'>
						<div className='container mx-auto text-center'>
							<p>
								&copy; {new Date().getFullYear()}{' '}
								<Link
									href='https://koushikpuppala.com'
									target='_blank'
									className='text-accent hover:text-opacity-95'>
									Koushikpuppala
								</Link>
								. All rights reserved.
							</p>
						</div>
					</footer>
				</AuthContextProvider>
			</body>
		</html>
	)
}

export default RootLayout
