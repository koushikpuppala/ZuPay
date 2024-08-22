import { PostsProps } from '@repo/types'
import { Model, model, models, Schema } from 'mongoose'

export default (models?.Posts as Model<PostsProps>) ||
	model<PostsProps>(
		'Posts',
		new Schema<PostsProps>(
			{
				title: { type: String, required: true },
				content: { type: String, required: true },
				author: { type: String, required: true },
				uid: { type: String, required: true },
			},
			{ timestamps: true },
		),
	)
