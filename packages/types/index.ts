import { DecodedIdToken } from 'firebase-admin/auth'
import { NextRequest } from 'next/server'
import { Request } from 'express'

export type { ChildrenProps, AuthContextProps } from './contexts'
export type { ErrorPageProps, RootLayoutProps, SearchParamsProps, PostDetailsProps } from './app'
export type { CommentsProps, PostsProps, UsersProps } from './models'

export type DecodedUser = { user?: DecodedIdToken }

export type EnhancedNextRequest = NextRequest & DecodedUser

export type EnhancedExpressRequest = Request & DecodedUser
