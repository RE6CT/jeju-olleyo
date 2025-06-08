import { PATH } from '@/constants/path.constants';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

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
