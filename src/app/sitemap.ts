import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bannadoi.ac.th';

  const routes = [
    '',
    '/about',
    '/staff',
    '/news',
    '/calendar',
    '/boarding',
    '/canteen',
    '/gallery',
    '/admissions',
    '/student-card',
    '/learning',
    '/certificates',
    '/awards',
    '/ita',
    '/downloads',
    '/survey',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
