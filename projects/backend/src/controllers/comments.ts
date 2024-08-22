import { CommentsModal, createCommentValidation, UsersModal } from '@repo/database'
import { EnhancedExpressRequest } from '@repo/types'
import { Response } from 'express'
import { Types } from 'mongoose'
import { fromZodError } from 'zod-validation-error'

export const createComment = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { uid } = req.user!

		const { success, error } = await createCommentValidation.safeParseAsync(req.body)

		if (!success) return res.status(400).json({ error: fromZodError(error).details[0].message })

		const { comment } = req.body

		const { id: postId } = req.params

		const isValid = Types.ObjectId.isValid(postId)

		if (!isValid) return res.status(500).send('Invalid post id')

		const { name: user } = (await UsersModal.findOne({ uid }))!

		res.status(201).json({
			message: 'Comment created successfully',
			comment: await CommentsModal.create({ postId, comment, user, uid }),
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}

export const getComments = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { id: postId } = req.params

		const isValid = Types.ObjectId.isValid(postId)

		if (!isValid) return res.status(500).send('Invalid post id')

		const comments = await CommentsModal.find({ postId })

		res.status(200).json({
			message: 'Comments fetched successfully',
			comments,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}

export const deleteComment = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { id } = req.params

		const isValid = Types.ObjectId.isValid(id)

		if (!isValid) return res.status(500).send('Invalid comment id')

		const comment = await CommentsModal.findByIdAndDelete(id)

		if (!comment) return res.status(404).send('Comment not found')

		res.status(200).json({
			message: 'Comment deleted successfully',
			comment,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}
