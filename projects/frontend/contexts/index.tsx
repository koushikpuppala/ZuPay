'use client'

import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	onIdTokenChanged,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextProps, ChildrenProps } from '@repo/types'
import { Loading } from '@import/components'
import { auth } from '@import/firebase'
import { toast } from 'react-toastify'
import { removeCookie, setCookie } from '@import/cookies'
import { TOAST_OPTIONS } from '@import/constants'

const AuthContext = createContext<AuthContextProps>({
	currentUser: null,
	userAuthLoading: true,
	login: () => new Promise<void>(() => {}),
	register: () => new Promise<void>(() => {}),
	resetPassword: () => new Promise<void>(() => {}),
	logout: () => new Promise<void>(() => {}),
})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: ChildrenProps) => {
	const [currentUser, setCurrentUser] = useState<AuthContextProps['currentUser']>(null)
	const [userAuthLoading, setUserAuthLoading] = useState<AuthContextProps['userAuthLoading']>(true)

	const handleErrors = (error: any) => {
		const error_code = error.customData?.message?.match(/\((.*?)\)/)[1] || error.code || 'unknown'

		switch (error_code) {
			case 'auth/invalid-email':
				toast.error('Invalid email address.', TOAST_OPTIONS)
				break
			case 'auth/invalid-credential':
				toast.error('Invalid credential. Please check your email and password.', TOAST_OPTIONS)
				break
			case 'auth/user-disabled':
				toast.error('The user corresponding to the given email has been disabled.', TOAST_OPTIONS)
				break
			case 'auth/user-not-found':
				toast.error('There is no user corresponding to the given email.', TOAST_OPTIONS)
				break
			case 'auth/wrong-password':
				toast.error('The password is invalid for the given email.', TOAST_OPTIONS)
				break
			case 'auth/email-already-in-use':
				toast.error('Email already in use.', TOAST_OPTIONS)
				break
			case 'auth/operation-not-allowed':
				toast.error('Operation not allowed.', TOAST_OPTIONS)
				break
			case 'auth/weak-password':
				toast.error('Weak password.', TOAST_OPTIONS)
				break
			case 'auth/network-request-failed':
				toast.error('A network error has occurred. Please check your internet connection.', TOAST_OPTIONS)
				break
			case 'auth/popup-closed-by-user':
				toast.error('Popup closed by user.', TOAST_OPTIONS)
				break
			default:
				toast.error('An unknown error occurred.', TOAST_OPTIONS)
				break
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async user => {
			setCurrentUser(user)
			setUserAuthLoading(false)
		})

		return unsubscribe
	}, [])

	useEffect(() => {
		const unsubscribe = onIdTokenChanged(auth, async user => {
			if (user) setCookie('token', await user.getIdToken())
			else removeCookie('token')
		})

		return unsubscribe
	}, [])

	const login: AuthContextProps['login'] = async (email, password) => {
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password)

			if (!user.emailVerified) {
				toast.error('Please verify your email address to continue.', TOAST_OPTIONS)
				await auth.signOut()
			} else {
				window.location.replace('/')
			}
		} catch (error) {
			process.env.NODE_ENV === 'development' && console.log(error)
			handleErrors(error)
		}
	}

	const register: AuthContextProps['register'] = async (name, email, password) => {
		try {
			const { user } = await createUserWithEmailAndPassword(auth, email, password)

			const token = await user.getIdToken()

			await updateProfile(user, { displayName: name })

			await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: JSON.stringify({ name }),
			})

			await sendEmailVerification(user, { url: `${process.env.NEXT_PUBLIC_ROOT_URL}/login` })

			await logout()

			window.location.href = '/login?verify-email-sent=true'
		} catch (error) {
			process.env.NODE_ENV === 'development' && console.log(error)
			handleErrors(error)
		}
	}

	const resetPassword: AuthContextProps['resetPassword'] = async email => {
		try {
			await sendPasswordResetEmail(auth, email, { url: `${process.env.NEXT_PUBLIC_ROOT_URL}/login` })

			window.location.href = '/login?reset-email-sent=true'
		} catch (error) {
			process.env.NODE_ENV === 'development' && console.log(error)
			handleErrors(error)
		}
	}

	const logout: AuthContextProps['logout'] = async () => {
		try {
			await auth.signOut()

			window.location.href = '/login'
		} catch (error) {
			process.env.NODE_ENV === 'development' && console.log(error)
		}
	}

	const value = { currentUser, userAuthLoading, login, register, resetPassword, logout }

	return <AuthContext.Provider value={value}>{userAuthLoading ? <Loading /> : children}</AuthContext.Provider>
}
