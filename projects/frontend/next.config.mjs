import path from 'path'

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	output: process.env.ENVIRONMENT === 'production' ? 'standalone' : undefined,
	transpilePackages: ['@repo/config', '@repo/database', '@repo/types'],
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'lh3.googleusercontent.com', port: '', pathname: '**' }],
	},
}

export default config
