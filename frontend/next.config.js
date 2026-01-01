/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8081/api/:path*',
            },
        ]
    },
}

module.exports = nextConfig
