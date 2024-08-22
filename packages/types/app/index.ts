import React from 'react'

export type ErrorPageProps = {
	error: Error
	reset: () => void
}

export type RootLayoutProps = Readonly<{ children: React.ReactNode }>

export type SearchParamsProps = Readonly<{ searchParams: { [key: string]: string | string[] | undefined } }>

export type PostDetailsProps = Readonly<{ params: { id: string } }>
