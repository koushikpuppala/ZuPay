import { getApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { config } from '@import/config'

try {
	initializeApp(config.firebaseConfig)
	process.env.NODE_ENV === 'development' && console.log('Firebase App Initialized')
} catch (error) {
	process.env.NODE_ENV === 'development' && console.log('Firebase App Initialization Error:', error)
}

export const app = getApp()

export const auth = getAuth(app)
