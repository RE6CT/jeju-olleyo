/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'k.kakaocdn.net', // 카카오 프로필 이미지
      'lh3.googleusercontent.com', // 구글 프로필 이미지
    ],
    formats: ['image/avif', 'image/webp'],
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
