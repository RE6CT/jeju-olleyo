/** @type {import('next').NextConfig} */
const nextConfig = {
  // 성능 최적화 설정
  reactStrictMode: true,
  swcMinify: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600, // 이미지 캐싱 시간 (1시간)

    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.namu.wiki',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'k.kakaocdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'tong.visitkorea.or.kr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bgznxwfpnvskfzsiisrn.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // App Router 최적화 설정
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
