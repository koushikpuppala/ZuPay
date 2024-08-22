import { EnhancedExpressRequest } from '@repo/types'
import { createUserValidation, UsersModal } from '@repo/database'
import { Response } from 'express'
import { fromZodError } from 'zod-validation-error'
import { Types } from 'mongoose'

export const createUser = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { uid, email } = req.user!

		const { success, error } = await createUserValidation.safeParseAsync(req.body)

		if (!success) return res.status(400).json({ error: fromZodError(error).details[0].message })

		const { name } = req.body

		const user = await UsersModal.create({ name, email, uid })

		res.status(201).json({
			message: 'User created successfully',
			user,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}

export const getUsers = async (_req: EnhancedExpressRequest, res: Response) => {
	try {
		const users = await UsersModal.find()

		res.status(200).json({
			message: 'Users fetched successfully',
			users,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}

export const getUser = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { id } = req.params

		const isValid = Types.ObjectId.isValid(id)

		if (!isValid) return res.status(400).send('Invalid post id')

		const user = await UsersModal.findById(id)

		if (!user) return res.status(404).send('User not found')

		res.status(200).json({
			message: 'User fetched successfully',
			user,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}

export const updateUser = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { id } = req.params

		const isValid = Types.ObjectId.isValid(id)

		if (!isValid) return res.status(400).send('Invalid post id')

		const { name } = req.body

		const user = await UsersModal.findByIdAndUpdate(id, { name }, { new: true })

		if (!user) return res.status(404).send('User not found')

		res.status(200).json({
			message: 'User updated successfully',
			user,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}

export const deleteUser = async (req: EnhancedExpressRequest, res: Response) => {
	try {
		const { id } = req.params

		const isValid = Types.ObjectId.isValid(id)

		if (!isValid) return res.status(400).send('Invalid post id')

		const user = await UsersModal.findByIdAndDelete(id)

		if (!user) return res.status(404).send('User not found')

		res.status(200).json({
			message: 'User deleted successfully',
			user,
		})
	} catch (err: any) {
		res.status(500).send({ error: 'Internal server error', message: err.message })
	}
}
