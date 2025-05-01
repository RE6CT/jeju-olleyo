/** @type {import('next').NextConfig} */
const nextConfig = {
  // 성능 최적화 설정
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['lucide-react'], // 특정 패키지 트랜스파일링
  compress: true,

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
        protocol: 'http',
        hostname: 'img1.kakaocdn.net',
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
      {
        protocol: 'https',
        hostname: 'media.interparkcdn.net',
        pathname: '/**',
      },
    ],
  },

  // 폰트 최적화
  optimizeFonts: true,

  // 웹팩 설정 최적화
  webpack: (config, { isServer }) => {
    // SVG 파일을 React 컴포넌트로 처리
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // App Router 최적화 설정
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // 패키지 임포트 최적화 유지
    optimizePackageImports: [
      'zustand',
      'react-hook-form',
      'zod',
      'lucide-react',
    ],
  },

  // 캐시 설정 최적화
  onDemandEntries: {
    // 서버 사이드에서 컴파일된 페이지를 메모리에 보관하는 시간
    maxInactiveAge: 25 * 1000,
    // 한 번에 메모리에 보관할 페이지 수
    pagesBufferLength: 5,
  },
};

export default nextConfig;
