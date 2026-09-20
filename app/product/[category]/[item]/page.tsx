import { notFound } from 'next/navigation';
import { contentRepository } from '@/lib/content/repository';
import { ProductPage } from '@/components/product-page';
import { getLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
type Props = { params: Promise<{ category: string; item: string }> };

async function getProduct(params: Props['params']) {
  const { category: categorySlug, item: itemSlug } = await params;
  const content = await contentRepository.getPublishedContent();
  const category = content.categories.find(
    (entry) => entry.slug === categorySlug,
  );
  const product = content.products.find(
    (entry) => entry.slug === itemSlug && entry.categoryId === category?.id,
  );
  if (!category || !product) notFound();
  return { content, category, product };
}
export async function generateMetadata({ params }: Props) {
  const { category, product } = await getProduct(params);
  const locale = await getLocale();
  return pageMetadata(
    product.name[locale],
    product.description[locale],
    `/product/${category.slug}/${product.slug}`,
    product.images[0],
  );
}
export default async function Product({ params }: Props) {
  const data = await getProduct(params);
  return <ProductPage key={data.product.id} {...data} />;
}
