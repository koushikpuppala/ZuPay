export * from './models'
export * from './validations'

import { Connection, connect, connection } from 'mongoose'

class Database {
	private static _instance: Database
	private _client: Connection

	private constructor() {
		this._client = connection
	}

	public static get instance(): Database {
		return this._instance || (this._instance = new this())
	}

	public get client(): Connection {
		return this._client
	}

	public async connect(): Promise<void> {
		if (this._client?.readyState === 1) return

		console.log('Connecting to MongoDB...', process.env.MONGO_URI)

		await connect(process.env.MONGO_URI!, {
			dbName: process.env.ENVIRONMENT ?? 'development',
			monitorCommands: true,
			bufferCommands: false,
			maxPoolSize: 100,
			minPoolSize: 20,
		})
		this._client = connection
		this._client.on('error', console.log.bind(console, 'connection error:'))
		this._client.once('open', () => {
			process.env.NODE_ENV === 'development' && console.log('Connected to MongoDB')
		})
	}

	public async disconnect(): Promise<void> {
		if (!this._client) return

		await connection.close()

		this._client.once('disconnected', () => {
			process.env.NODE_ENV === 'development' && console.log('Disconnected from MongoDB')
		})
	}
}

export const MongoDB = Database.instance
