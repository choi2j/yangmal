import type { Product, SiteContent } from './types.ts';

export function publishedContent(content: SiteContent): SiteContent {
  const categories = [...content.categories].sort((a, b) => a.order - b.order);
  const categoryIds = new Set(categories.map((category) => category.id));
  return {
    ...content,
    categories,
    products: content.products
      .filter(
        (product) =>
          product.status === 'published' && categoryIds.has(product.categoryId),
      )
      .sort((a, b) => a.order - b.order),
  };
}

export function sellingPrice(product: Product): number | null {
  return product.salePrice ?? product.price;
}

export function discountPercent(product: Product): number {
  if (
    product.price === null ||
    product.price <= 0 ||
    product.salePrice === null ||
    product.salePrice >= product.price
  )
    return 0;
  // Truncate fractional discounts so the displayed percentage is not overstated.
  return Math.floor(((product.price - product.salePrice) * 100) / product.price);
}

export function canPurchase(product: Product): boolean {
  if (
    product.status !== 'published' ||
    product.availability !== 'available' ||
    !product.purchaseUrl
  )
    return false;
  try {
    return new URL(product.purchaseUrl).protocol === 'https:';
  } catch {
    return false;
  }
}

export function productPath(product: Product, content: SiteContent): string {
  const category = content.categories.find(
    (entry) => entry.id === product.categoryId,
  );
  return category
    ? `/product/${encodeURIComponent(category.slug)}/${encodeURIComponent(product.slug)}`
    : '/products';
}

export type CatalogSort = 'featured' | 'price-low' | 'price-high';
export function filterProducts(
  products: Product[],
  categoryId: string,
  query: string,
  sort: CatalogSort,
): Product[] {
  const term = query.trim().normalize('NFKC').toLocaleLowerCase();
  const result = products.filter(
    (product) =>
      product.status === 'published' &&
      (categoryId === 'all' || product.categoryId === categoryId) &&
      (!term ||
        [
          product.name.ko,
          product.name.en,
          product.summary.ko,
          product.summary.en,
          ...product.features.flatMap((feature) => [feature.ko, feature.en]),
        ].some((value) =>
          value.normalize('NFKC').toLocaleLowerCase().includes(term),
        )),
  );
  return result.sort((a, b) => {
    if (sort === 'featured') return a.order - b.order;
    const aPrice = sellingPrice(a),
      bPrice = sellingPrice(b);
    if (aPrice === null && bPrice === null) return a.order - b.order;
    if (aPrice === null) return 1;
    if (bPrice === null) return -1;
    return sort === 'price-low' ? aPrice - bPrice : bPrice - aPrice;
  });
}
