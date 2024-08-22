'use server'

import { getCookie } from '@import/cookies'
import { revalidateTag } from 'next/cache'

export const getPost = async (id: string) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
			next: { revalidate: 60 * 60 * 24, tags: [`post:${id}`] },
		})

		if (!res.ok) throw new Error('Failed to fetch post ' + id)

		const { post } = await res.json()

		return post
	} catch (error) {
		console.log(error)
		return null
	}
}

export const getPosts = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
			next: { revalidate: 60 * 60 * 24, tags: ['posts'] },
		})

		if (!res.ok) throw new Error('Failed to fetch posts')

		const { posts } = await res.json()

		return posts
	} catch (error) {
		console.log(error)
		return []
	}
}

export const getMyPost = async (id: string) => {
	try {
		const token = (await getCookie('token')) ?? null

		if (!token) return null

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/my-posts/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
			next: { revalidate: 60 * 60 * 24, tags: [`my-post:${id}`] },
		})

		if (!res.ok) throw new Error('Failed to fetch post ' + id)

		const { post } = await res.json()

		return post
	} catch (error) {
		console.log(error)
		return null
	}
}

export const getMyPosts = async () => {
	try {
		const token = (await getCookie('token')) ?? null

		if (!token) return []

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/my-posts`, {
			headers: { Authorization: `Bearer ${token}` },
			next: { revalidate: 60 * 60 * 24, tags: ['my-posts'] },
		})

		if (!res.ok) throw new Error('Failed to fetch posts')

		const { posts } = await res.json()

		return posts
	} catch (error) {
		console.log(error)
		return []
	}
}

export const createPost = async (form: FormData) => {
	try {
		const token = (await getCookie('token')) ?? null

		if (!token) return null

		const title = form.get('title')!.toString()
		const content = form.get('content')!.toString()

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify({ title, content }),
		})

		if (!res.ok) {
			console.log(await res.text())
			throw new Error('Failed to create post')
		}

		return res.json()
	} catch (error) {
		console.log(error)
		return { statusCode: 500, statusMessage: 'Failed to create post' }
	} finally {
		revalidateTag('posts')
		revalidateTag('my-posts')
	}
}

export const updatePost = async (id: string, form: FormData) => {
	try {
		const token = (await getCookie('token')) ?? null

		if (!token) return null

		const title = form.get('title')!.toString()
		const content = form.get('content')!.toString()

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify({ title, content }),
		})

		if (!res.ok) {
			console.log(await res.text())
			throw new Error('Failed to update post')
		}

		return res.json()
	} catch (error) {
		console.log(error)
		return { statusCode: 500, statusMessage: 'Failed to update post' }
	} finally {
		revalidateTag(`post:${id}`)
		revalidateTag(`my-post:${id}`)
		revalidateTag('posts')
		revalidateTag('my-posts')
	}
}

export const deletePost = async (id: string) => {
	try {
		const token = (await getCookie('token')) ?? null

		if (!token) return null

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` },
		})

		if (!res.ok) {
			console.log(await res.text())
			throw new Error('Failed to delete post')
		}

		return res.json()
	} catch (error) {
		console.log(error)
		return { statusCode: 500, statusMessage: 'Failed to delete post' }
	} finally {
		revalidateTag('posts')
		revalidateTag('my-posts')
	}
}

export const addComment = async (id: string, comment: string) => {
	try {
		const token = (await getCookie('token')) ?? null

		if (!token) return null

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify({ comment }),
		})

		if (!res.ok) {
			console.log(await res.text())
			throw new Error('Failed to add comment')
		}

		return res.json()
	} catch (error) {
		console.log(error)
		return { statusCode: 500, statusMessage: 'Failed to add comment' }
	} finally {
		revalidateTag(`comments:${id}`)
	}
}

export const getComments = async (id: string) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`, {
			next: { revalidate: 60 * 60 * 24, tags: [`comments:${id}`] },
		})

		if (!res.ok) throw new Error('Failed to fetch comments ' + id)

		const { comments } = await res.json()

		return comments
	} catch (error) {
		console.log(error)
		return []
	}
}

export const deleteComment = async (id: string) => {
	try {
		const token = (await getCookie('token')) ?? null

		if (!token) return null

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` },
		})

		if (!res.ok) {
			console.log(await res.text())
			throw new Error('Failed to delete comment')
		}

		return res.json()
	} catch (error) {
		console.log(error)
		return { statusCode: 500, statusMessage: 'Failed to delete comment' }
	} finally {
		revalidateTag(`comments:${id}`)
	}
}
