/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    /**
     * @description Next.js uses deprecated eslint config. Now it's replace in build command of package.json
     */
    ignoreDuringBuilds: true,
  },
  experimental: {
    instrumentationHook: true,
  },
}

export default nextConfig
