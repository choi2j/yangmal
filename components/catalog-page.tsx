'use client';
import { useMemo, useState } from 'react';
import { Search, ArrowRight, SlidersHorizontal } from 'lucide-react';
import type { SiteContent } from '@/lib/content/types';
import { filterProducts, type CatalogSort } from '@/lib/content/catalog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductCard } from './product-card';
import { useLanguage } from './language-provider';
import { StoreBanner } from './site-shell';

export function CatalogPage({
  content,
  initialCategory = 'all',
}: {
  content: SiteContent;
  initialCategory?: string;
}) {
  const { t, pick } = useLanguage();
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<CatalogSort>('featured');
  const products = useMemo(
    () => filterProducts(content.products, categoryId, query, sort),
    [content.products, categoryId, query, sort],
  );
  const category = content.categories.find((entry) => entry.id === categoryId);
  const sortOptions = [
    { value: 'featured', label: t('추천순', 'Recommended') },
    { value: 'price-low', label: t('낮은 가격순', 'Price: low to high') },
    { value: 'price-high', label: t('높은 가격순', 'Price: high to low') },
  ];
  return (
    <main id="main">
      <section className="container page-intro catalog-intro">
        <div>
          <p className="eyebrow">THE COLLECTION</p>
          <h1>
            {category
              ? pick(category.name)
              : t('당신의 하루에 맞는 양말', 'A pair for every kind of day')}
          </h1>
          <p>
            {category
              ? pick(category.description)
              : t(
                  '등산부터 일상까지. 필요한 편안함을 찾아보세요.',
                  'From the trail to your daily routine. Find your kind of comfort.',
                )}
          </p>
        </div>
        <span className="intro-index">N° 01—04</span>
      </section>
      <section
        className="container catalog-section"
        aria-label={t('상품 목록', 'Product collection')}
      >
        <div className="catalog-controls">
          <div
            className="filter-tabs"
            role="group"
            aria-label={t('카테고리 필터', 'Filter by category')}
          >
            <Button
              variant="ghost"
              className="filter-chip"
              aria-pressed={categoryId === 'all'}
              onClick={() => setCategoryId('all')}
            >
              {t('전체', 'All')}
              <span>{content.products.length}</span>
            </Button>
            {content.categories.map((entry) => (
              <Button
                key={entry.id}
                variant="ghost"
                className="filter-chip"
                aria-pressed={categoryId === entry.id}
                onClick={() => setCategoryId(entry.id)}
              >
                {pick(entry.name)}
              </Button>
            ))}
          </div>
          <div className="catalog-search">
            <Search size={17} />
            <Input
              aria-label={t('상품 검색', 'Search products')}
              placeholder={t(
                '이름이나 특징으로 검색',
                'Search by name or feature',
              )}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
            />
          </div>
        </div>
        <div className="catalog-results-row">
          <p role="status" aria-live="polite">
            {t('총', '')} <strong>{products.length}</strong>
            {t('개의 상품', products.length === 1 ? ' product' : ' products')}
          </p>
          <div className="sort-control">
            <SlidersHorizontal size={15} />
            <Select
              value={sort}
              onValueChange={(value) => setSort(value as CatalogSort)}
              items={sortOptions}
            >
              <SelectTrigger aria-label={t('상품 정렬', 'Sort products')}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {products.length ? (
          <div
            className={`product-grid ${products.length === 1 ? 'single-product-grid' : ''}`}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                content={content}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={28} strokeWidth={1.4} />
            <h2>
              {t('조건에 맞는 상품이 없어요.', 'No matching socks just yet.')}
            </h2>
            <p>
              {t(
                '다른 검색어를 입력하거나 전체 상품을 살펴보세요.',
                'Try a different search or explore the full collection.',
              )}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setQuery('');
                setCategoryId('all');
                setSort('featured');
              }}
            >
              {t('전체 상품 보기', 'Show all socks')}
              <ArrowRight size={16} />
            </Button>
          </div>
        )}
        <div className="catalog-note">
          <span>NINESOCKS</span>
          <p>
            {t(
              '판매 예정 상품은 준비가 끝나는 대로 스마트스토어에서 만나보실 수 있습니다.',
              'Coming-soon products will be available on Smartstore when they are ready.',
            )}
          </p>
        </div>
      </section>
      <StoreBanner url={content.settings.storeUrl} />
    </main>
  );
}
