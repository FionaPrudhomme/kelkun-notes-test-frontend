/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '**',
            }
        ],
        dangerouslyAllowSVG: true,
    },
    output: 'standalone'
}

export default nextConfig
