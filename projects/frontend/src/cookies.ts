'use server'

import { cookies } from 'next/headers'

export const setCookie = (name: string, value: string) => {
	cookies().set(name, value, {
		domain: process.env.ENVIRONMENT === 'production' ? 'https://koushikpuppala-zupay.vercel.app' : 'localhost',
		secure: process.env.ENVIRONMENT === 'production',
		sameSite: 'strict',
		httpOnly: true,
		path: '/',
		maxAge: 60 * 60,
	})
}

export const removeCookie = (name: string) => {
	cookies().delete({
		name,
		domain: process.env.ENVIRONMENT === 'production' ? 'https://koushikpuppala-zupay.vercel.app' : 'localhost',
		secure: process.env.ENVIRONMENT === 'production',
		sameSite: 'strict',
		httpOnly: true,
		path: '/',
	})
}

export const getCookie = async (name: string) => {
	return cookies().get(name)?.value
}
