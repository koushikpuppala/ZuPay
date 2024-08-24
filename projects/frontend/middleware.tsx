import { getCookie } from '@import/cookies'
import { NextResponse } from 'next/server'
import { EnhancedNextRequest } from '@repo/types'

export const middleware = async (req: EnhancedNextRequest) => {
	try {
		const protectedRoutes = ['/my-posts']

		const publicRoutes = ['/login', '/register', '/reset']

		const { pathname } = req.nextUrl

		const token = await getCookie('token')

		if (protectedRoutes.some(route => pathname.includes(route)) && !token)
			return NextResponse.redirect(new URL('/login', req.url))

		if (publicRoutes.some(route => pathname.includes(route)) && token)
			return NextResponse.redirect(new URL('/', req.url))

		return NextResponse.next()
	} catch (error) {
		process.env.NODE_ENV === 'development' && console.log(error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*||sitemap.xml|robots.txt)',
}
