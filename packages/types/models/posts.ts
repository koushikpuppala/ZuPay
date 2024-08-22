import { Document } from 'mongoose'

export type PostsProps = {
	_id: string
	title: string
	content: string
	author: string
	uid: string
	createdAt: Date
	updatedAt: Date
} & Document<string>
