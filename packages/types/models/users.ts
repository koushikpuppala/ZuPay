import { Document } from 'mongoose'

export type UsersProps = {
	_id: string
	uid: string
	name: string
	email: string
	createdAt: Date
	updatedAt: Date
} & Document<string>
