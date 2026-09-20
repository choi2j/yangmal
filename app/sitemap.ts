import { contentRepository } from '@/lib/content/repository';
import { productPath } from '@/lib/content/catalog';
import { siteOrigin } from '@/lib/metadata';
export default async function sitemap() {
  const content = await contentRepository.getPublishedContent();
  return [
    '/',
    '/products',
    '/about',
    '/contact',
    ...content.categories.map((category) => `/product/${category.slug}`),
    ...content.products.map((product) => productPath(product, content)),
  ].map((path) => ({ url: new URL(path, siteOrigin).href }));
}
