/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['i.namu.wiki'],
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
