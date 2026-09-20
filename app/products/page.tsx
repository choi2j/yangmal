import { contentRepository } from '@/lib/content/repository';
import { CatalogPage } from '@/components/catalog-page';
import { getLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const locale = await getLocale();
  return pageMetadata(
    locale === 'ko' ? '모든 양말' : 'All socks',
    locale === 'ko'
      ? '등산, 학생, 남성, 여성 양말을 한곳에서 살펴보세요.'
      : 'Explore hiking, student, men’s, and women’s socks.',
    '/products',
  );
}
export default async function Products() {
  return (
    <CatalogPage content={await contentRepository.getPublishedContent()} />
  );
}
