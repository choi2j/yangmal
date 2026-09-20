'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ChevronRight,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import type { Category, Product, SiteContent } from '@/lib/content/types';
import { canPurchase } from '@/lib/content/catalog';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from './language-provider';
import { Media } from './media';
import { Price, ProductCard } from './product-card';

export function ProductPage({
  product,
  category,
  content,
}: {
  product: Product;
  category: Category;
  content: SiteContent;
}) {
  const { t, pick } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);
  const image = product.images[activeImage] ?? product.images[0];
  const purchasable = canPurchase(product);
  const related = content.products
    .filter((entry) => entry.id !== product.id)
    .slice(0, 3);
  const unavailable =
    product.availability === 'sold-out'
      ? t('현재 품절된 상품입니다', 'Currently sold out')
      : product.availability === 'coming-soon'
        ? t('곧 만나보실 수 있어요', 'Something good is coming')
        : t(
            '구매 정보를 준비하고 있습니다',
            'Purchase information is being prepared',
          );
  return (
    <main id="main">
      <div className="container">
        <nav className="breadcrumbs" aria-label={t('현재 위치', 'Breadcrumb')}>
          <Link href="/">HOME</Link>
          <ChevronRight size={12} />
          <Link href={`/product/${category.slug}`}>{pick(category.name)}</Link>
          <ChevronRight size={12} />
          <span aria-current="page">{pick(product.name)}</span>
        </nav>
        <section className="product-overview">
          <div className="product-gallery">
            <Media asset={image} slot="gallery" priority />
            <div
              className="gallery-thumbnails"
              role="group"
              aria-label={t('상품 이미지 선택', 'Select product image')}
            >
              {product.images.map((asset, index) => (
                <Button
                  variant="ghost"
                  className="gallery-thumb"
                  key={asset.id}
                  aria-label={pick(asset.alt)}
                  aria-pressed={index === activeImage}
                  onClick={() => setActiveImage(index)}
                >
                  <Media asset={asset} slot="gallery" />
                  <span className="thumb-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </Button>
              ))}
            </div>
          </div>
          <div className="product-information">
            <p className="eyebrow">{category.slug.toUpperCase()} / NINESOCKS</p>
            <h1>{pick(product.name)}</h1>
            <p className="product-subtitle">{pick(product.summary)}</p>
            <div className="product-main-price">
              <Price product={product} />
              <span className="tax-note">
                {t(
                  '옵션별 최종 가격은 스마트스토어에서 확인해 주세요.',
                  'Check Smartstore for the final price of each option.',
                )}
              </span>
            </div>
            <p className="product-description">{pick(product.description)}</p>
            <div className="feature-tags">
              {product.features.map((feature) => (
                <span key={feature.ko}>{pick(feature)}</span>
              ))}
            </div>
            <dl className="purchase-facts">
              <div>
                <dt>
                  <Truck size={16} />
                  {t('배송', 'Delivery')}
                </dt>
                <dd>
                  {product.shippingFee !== null
                    ? `${product.shippingFee.toLocaleString()}${t('원', ' KRW')}`
                    : t('스마트스토어에서 확인', 'See Smartstore')}
                </dd>
              </div>
              <div>
                <dt>
                  <ShieldCheck size={16} />
                  {t('구매', 'Purchase')}
                </dt>
                <dd>{t('네이버 스마트스토어', 'Naver Smartstore')}</dd>
              </div>
            </dl>
            {purchasable ? (
              <a
                className="button-link product-buy"
                href={product.purchaseUrl!}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('스마트스토어에서 구매하기', 'Shop on Smartstore')}
                <ArrowUpRight size={20} />
              </a>
            ) : (
              <div className="availability-notice">
                <span className="availability-dot" />
                <strong>{unavailable}</strong>
                <p>
                  {t(
                    '출시 및 재입고 관련 문의는 문의 페이지를 이용해 주세요.',
                    'Contact us for launch or restock inquiries.',
                  )}
                </p>
                <Link href="/contact">
                  {t('상품 문의하기', 'Ask about this product')}
                </Link>
              </div>
            )}
            <p className="purchase-note">
              {t(
                '색상과 사이즈 선택, 결제 및 배송은 스마트스토어에서 진행됩니다.',
                'Choose colors and sizes, pay, and arrange delivery on Smartstore.',
              )}
            </p>
          </div>
        </section>
      </div>
      <nav
        className="detail-navigation"
        aria-label={t('상품 정보 바로가기', 'Product sections')}
      >
        <div className="container">
          <a href="#product-details">{t('상품 이야기', 'Product details')}</a>
          <a href="#product-guide">{t('구매 안내', 'Shopping guide')}</a>
          {related.length > 0 && (
            <a href="#related-products">{t('함께 살펴보기', 'Explore more')}</a>
          )}
        </div>
      </nav>
      <section
        id="product-details"
        className="container section product-details"
      >
        <div className={`detail-story ${product.detailImages.some(asset => asset.src) ? 'detail-story-intro' : ''}`}>
          <div>
            <p className="eyebrow">MADE FOR YOUR EVERYDAY</p>
            <h2>{pick(product.summary)}</h2>
            <p>{pick(product.description)}</p>
            <div className="detail-features">
              {product.features.map((feature, index) => (
                <div key={feature.ko}>
                  <span>0{index + 1}</span>
                  <strong>{pick(feature)}</strong>
                </div>
              ))}
            </div>
          </div>
          {!product.detailImages.some(asset => asset.src) && <Media asset={product.detailImages[0]} slot="detail" />}
        </div>
        <div className="product-detail-images">
        {(product.detailImages.some(asset => asset.src) ? product.detailImages : product.detailImages.slice(1)).map((asset) => (
          <Media
            key={asset.id}
            asset={asset}
            slot="detail"
            className="additional-detail"
          />
        ))}
        </div>
      </section>
      <section id="product-guide" className="guide-section">
        <div className="container guide-grid">
          <div>
            <p className="eyebrow">BEFORE YOU SHOP</p>
            <h2>
              {t('구매 전, 확인해 주세요.', 'A few things before you shop.')}
            </h2>
            <p>
              {t(
                '궁금한 점이 있다면 편하게 문의해 주세요.',
                'We are here if you have any questions.',
              )}
            </p>
            <Link className="text-link" href="/contact">
              {t('문의하기', 'Contact us')}
            </Link>
          </div>
          <Accordion className="shopping-faq">
            <AccordionItem value="options">
              <AccordionTrigger>
                {t(
                  '사이즈와 소재는 어디서 확인하나요?',
                  'Where can I find sizes and materials?',
                )}
              </AccordionTrigger>
              <AccordionContent>
                {t(
                  '색상, 사이즈, 소재 혼용률과 세탁 방법은 스마트스토어의 상품 상세 정보를 확인해 주세요. 실제 판매 옵션을 기준으로 안내합니다.',
                  'See the product listing on Smartstore for available colors, sizes, fabric composition, and care instructions.',
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="delivery">
              <AccordionTrigger>
                {t(
                  '배송과 교환·반품은 어떻게 진행되나요?',
                  'How do delivery and returns work?',
                )}
              </AccordionTrigger>
              <AccordionContent>
                {t(
                  '배송 일정과 배송비, 교환·반품 조건은 주문 시 스마트스토어에 표시된 안내가 적용됩니다. 주문 관련 문의도 스마트스토어를 통해 접수해 주세요.',
                  'Delivery schedules, fees, and return conditions follow the information shown on Smartstore at checkout. Please send order inquiries through Smartstore.',
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reviews">
              <AccordionTrigger>
                {t(
                  '상품 후기와 문의를 보고 싶어요.',
                  'Where can I read reviews and questions?',
                )}
              </AccordionTrigger>
              <AccordionContent>
                {t(
                  '실제 구매 후기와 상품 문의는 네이버 스마트스토어에서 확인하실 수 있습니다.',
                  'Read customer reviews and product questions on Naver Smartstore.',
                )}{' '}
                <a
                  href={content.settings.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('스마트스토어 열기', 'Open Smartstore')} ↗
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      {related.length > 0 && (
        <section id="related-products" className="container section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MORE FOR YOUR DAY</p>
              <h2>{t('이런 양말도 있어요', 'A little more to explore')}</h2>
            </div>
            <Link className="text-link" href="/products">
              {t('전체 보기', 'View all')}
            </Link>
          </div>
          <div className="product-grid related-grid">
            {related.map((entry) => (
              <ProductCard key={entry.id} product={entry} content={content} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
