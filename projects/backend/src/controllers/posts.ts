import { createPostValidation, PostsModal, UsersModal } from '@repo/database'
import { EnhancedExpressRequest } from '@repo/types'
import { Response } from 'express'
import { Types } from 'mongoose'
import { fromZodError } from 'zod-validation-error'

export const createPost = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { uid } = req.user!

		const { success, error } = await createPostValidation.safeParseAsync(req.body)

		if (!success) return res.status(400).json({ error: fromZodError(error).details[0].message })

		const { title, content } = req.body

		const { name: author } = (await UsersModal.findOne({ uid }))!

		const post = await PostsModal.create({ title, content, author, uid })

		res.status(201).json({
			message: 'Post created successfully',
			post,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}

export const getPosts = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const posts = await PostsModal.find()

		res.status(200).json({
			message: 'Posts fetched successfully',
			posts,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}

export const getMyPosts = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { uid } = req.user!

		const posts = await PostsModal.find({ uid })

		res.status(200).json({
			message: 'My posts fetched successfully',
			posts,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}

export const getMyPost = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { id } = req.params

		const isValid = Types.ObjectId.isValid(id)

		if (!isValid) return res.status(400).send('Invalid post id')

		const { uid } = req.user!

		const post = await PostsModal.findOne({ _id: id, uid })

		if (!post) return res.status(404).send('Post not found')

		res.status(200).json({
			message: 'My post fetched successfully',
			post,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}

export const getPost = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { id } = req.params

		const isValid = Types.ObjectId.isValid(id)

		if (!isValid) return res.status(400).send('Invalid post id')

		const post = await PostsModal.findById(id)

		if (!post) return res.status(404).send('Post not found')

		res.status(200).json({
			message: 'Post fetched successfully',
			post,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}

export const updatePost = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { id } = req.params

		const isValid = Types.ObjectId.isValid(id)

		if (!isValid) return res.status(400).send('Invalid post id')

		const { success, error } = await createPostValidation.safeParseAsync(req.body)

		if (!success) return res.status(400).json({ error: fromZodError(error).details[0].message })

		const { title, content } = req.body

		const post = await PostsModal.findByIdAndUpdate(id, { title, content }, { new: true })

		if (!post) return res.status(404).send('Post not found')

		res.status(200).json({
			message: 'Post updated successfully',
			post,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}

export const deletePost = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { id } = req.params

		const isValid = Types.ObjectId.isValid(id)

		if (!isValid) return res.status(400).send('Invalid post id')

		const post = await PostsModal.findByIdAndDelete(id)

		if (!post) return res.status(404).send('Post not found')

		res.status(200).json({
			message: 'Post deleted successfully',
			post,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}
