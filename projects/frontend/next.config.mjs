import path from 'path'

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	output: process.env.ENVIRONMENT === 'production' ? 'standalone' : undefined,
	experimental:
		process.env.ENVIRONMENT === 'production'
			? { outputFileTracingRoot: path.join(__dirname, '../../') }
			: undefined,
	transpilePackages: ['@repo/database', '@repo/types'],
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'lh3.googleusercontent.com', port: '', pathname: '**' }],
	},
}

export default config
