import { CommentsProps } from '@repo/types'
import { Model, model, models, Schema } from 'mongoose'

export default (models?.Comments as Model<CommentsProps>) ||
	model<CommentsProps>(
		'Comments',
		new Schema<CommentsProps>(
			{
				postId: { type: String, required: true },
				user: { type: String, required: true },
				uid: { type: String, required: true },
				comment: { type: String, required: true },
			},
			{ timestamps: true },
		),
	)
