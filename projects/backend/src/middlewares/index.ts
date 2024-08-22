import { EnhancedExpressRequest } from '@repo/types'
import { NextFunction, Response } from 'express'
import { auth } from 'firebase-admin'

export const verifyToken = async (req: EnhancedExpressRequest, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split('Bearer ')[1]

		if (!token) return res.status(401).send('No token provided')

		const decodedToken = await auth().verifyIdToken(token, true)

		if (!decodedToken) return res.status(401).send('Invalid token')

		req.user = decodedToken

		next()
	} catch (error: any) {
		process.env.NODE_ENV === 'development' && console.log(error)
		res.status(401).send('Error verifying token')
	}
}
