import React from 'react'
import { User } from 'firebase/auth'

export type ChildrenProps = Readonly<{ children: React.ReactNode }>

export type AuthContextProps = {
	currentUser: User | null
	userAuthLoading: boolean
	login: (email: string, password: string) => Promise<void>
	register: (name: string, email: string, password: string) => Promise<void>
	resetPassword: (email: string) => Promise<void>
	logout: () => Promise<void>
}
