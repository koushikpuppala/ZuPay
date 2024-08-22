import { config } from 'dotenv'

config({ path: process.env.ENVIRONMENT === 'production' ? '.env' : '.env.local' })

import { MongoDB } from '@repo/database'
import cookieParser from 'cookie-parser'
import * as admin from 'firebase-admin'
import router from '@import/routes'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

MongoDB.connect()

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: process.env.FIREBASE_PROJECT_ID,
		privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	}),
})

export const app = express()
const PORT = Number(process.env.PORT) || 8081

const whitelist = { frontend: process.env.NEXT_PUBLIC_ROOT_URL! }

const origin = [...Object.values(whitelist)]

app.use(cors({ origin: origin, methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }))
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.get('/', (_req, res) => res.status(200).json({ message: 'API server Running /' }))

app.use('/', router)

MongoDB.client.on('error', console.log.bind(console, 'connection error:'))
MongoDB.client.once('open', async () => {
	console.log(process.env.NODE_ENV === 'production' ? 'Connected to Prod MongoDB' : 'Connected to Dev MongoDB')
	app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})
