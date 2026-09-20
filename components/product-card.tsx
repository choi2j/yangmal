'use client';
import Link from 'next/link';
import type { Product, SiteContent } from '@/lib/content/types';
import {
  productPath,
  sellingPrice,
  discountPercent,
} from '@/lib/content/catalog';
import { useLanguage } from './language-provider';
import { Media } from './media';

export function Price({ product }: { product: Product }) {
  const { locale, t } = useLanguage();
  const price = sellingPrice(product);
  const discount = discountPercent(product);
  const format = (value: number) =>
    locale === 'ko'
      ? `${value.toLocaleString('ko-KR')}원`
      : `₩${value.toLocaleString('en-US')}`;
  return (
    <div className="product-price">
      {price !== null ? (
        <>
          <strong>{format(price)}</strong>
          {discount > 0 && (
            <>
              <span className="discount">{discount}%</span>
              <del>{format(product.price!)}</del>
            </>
          )}
        </>
      ) : (
        <span className="price-pending">
          {t('가격 공개 예정', 'Price to be announced')}
        </span>
      )}
    </div>
  );
}

export function ProductCard({
  product,
  content,
}: {
  product: Product;
  content: SiteContent;
}) {
  const { t, pick } = useLanguage();
  const category = content.categories.find(
    (entry) => entry.id === product.categoryId,
  );
  return (
    <article className="product-card">
      <Link href={productPath(product, content)} className="product-card-link">
        <div className="product-card-media">
          <Media asset={product.images[0]} slot="product" />
        </div>
        <div className="product-card-info">
          <p className="card-category">
            {category ? pick(category.name) : 'NINESOCKS'}
            <span aria-hidden="true">·</span>
            <span>
              {product.availability === 'available'
                ? t('판매 중', 'Available')
                : product.availability === 'sold-out'
                  ? t('품절', 'Sold out')
                  : t('판매 예정', 'Coming soon')}
            </span>
          </p>
          <h3>{pick(product.name)}</h3>
          <p className="card-summary">{pick(product.summary)}</p>
          <Price product={product} />
        </div>
      </Link>
    </article>
  );
}
