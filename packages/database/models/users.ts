import { UsersProps } from '@repo/types'
import { Model, model, models, Schema } from 'mongoose'

export default (models?.Users as Model<UsersProps>) ||
	model<UsersProps>(
		'Users',
		new Schema<UsersProps>(
			{
				uid: { type: String, required: true },
				name: { type: String, required: true },
				email: { type: String, required: true },
			},
			{ timestamps: true },
		),
	)
