import * as z from 'zod'

export const createPostValidation = z.object({
	title: z.string().min(5),
	content: z.string().min(10),
})

export const createCommentValidation = z.object({
	comment: z.string().min(10),
})

export const createUserValidation = z.object({
	name: z.string().min(3),
})
