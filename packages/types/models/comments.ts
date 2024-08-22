import { Document } from 'mongoose'

export type CommentsProps = {
	_id: string
	postId: string
	user: string
	uid: string
	comment: string
	createdAt: Date
	updatedAt: Date
} & Document<string>
