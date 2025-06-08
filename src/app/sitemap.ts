import { PATH } from '@/constants/path.constants';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!baseUrl) {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL environment variable is required for sitemap generation',
    );
  }

  const staticRoutes = [
    PATH.TICKET,
    PATH.CATEGORIES,
    PATH.COMMUNITY,
    PATH.MYPLAN,
  ];
  return [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    })),
  ];
}
