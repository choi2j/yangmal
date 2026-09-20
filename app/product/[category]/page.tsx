import { notFound } from 'next/navigation';
import { contentRepository } from '@/lib/content/repository';
import { CatalogPage } from '@/components/catalog-page';
import { getLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props) {
  const { category: slug } = await params;
  const content = await contentRepository.getPublishedContent();
  const category = content.categories.find((entry) => entry.slug === slug);
  if (!category) notFound();
  const locale = await getLocale();
  return pageMetadata(
    category.name[locale],
    category.description[locale],
    `/product/${category.slug}`,
    category.image,
  );
}
export default async function Category({ params }: Props) {
  const { category: slug } = await params;
  const content = await contentRepository.getPublishedContent();
  const category = content.categories.find((entry) => entry.slug === slug);
  if (!category) notFound();
  return (
    <CatalogPage
      key={category.id}
      content={content}
      initialCategory={category.id}
    />
  );
}
