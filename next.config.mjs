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
    remotePatterns: [
      {
        protocol: 'http', // https에서 http로 변경
        hostname: 'k.kakaocdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https', // 혹시 모르니 https도 추가
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
};

export default nextConfig;
