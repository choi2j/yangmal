'use client';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Footprints,
  Layers,
  PackageCheck,
} from 'lucide-react';
import type { SiteContent } from '@/lib/content/types';
import { useLanguage } from './language-provider';
import { Media } from './media';
import { ProductCard } from './product-card';
import { StoreBanner, TextLink } from './site-shell';

export function HomePage({ content }: { content: SiteContent }) {
  const { locale, t, pick } = useLanguage();
  const headline = content.home.headline[locale];
  const featured = content.products
    .filter((product) => product.featured)
    .slice(0, 4);
  const values = [
    {
      icon: Footprints,
      title: t('하루의 움직임을 생각합니다', 'Made for the way you move'),
      description: t(
        '오래 걷는 날과 바쁘게 움직이는 날. 서로 다른 일상에 맞는 양말을 제안합니다.',
        'Long walks or busy days. Find a pair that fits the way you spend your day.',
      ),
    },
    {
      icon: Layers,
      title: t('작은 디테일을 살핍니다', 'Considered in every detail'),
      description: t(
        '발에 닿는 촉감부터 신발 안의 착용감까지. 매일 신는 기본을 고민합니다.',
        'From the feel against your skin to the fit inside your shoes. The little things matter.',
      ),
    },
    {
      icon: PackageCheck,
      title: t('선택은 쉽게, 구매는 편하게', 'Easy to choose, easy to shop'),
      description: t(
        '여기서 나에게 맞는 제품을 살펴보고, 스마트스토어에서 구매를 이어가세요.',
        'Explore the collection here, then head to our Smartstore when you find your pair.',
      ),
    },
  ];
  return (
    <main id="main">
      <section className="container home-hero">
        <div className="hero-copy">
          <p className="eyebrow">GOOD SOCKS. BETTER DAYS.</p>
          <h1>
            {headline[0]}
            <br />
            {headline[1]}
            <br />
            <span>{headline[2]}</span>
          </h1>
          <p className="hero-description">{pick(content.home.description)}</p>
          <Link className="button-link" href="/products">
            {t('나에게 맞는 양말 찾기', 'Find your everyday pair')}
            <ArrowRight size={18} />
          </Link>
          <p className="hero-footnote">FUNCTIONAL SOCKS, SINCE 2019</p>
        </div>
        <div className="hero-visual">
          <Media asset={content.home.hero} slot="hero" priority />
          <div className="hero-image-caption">
            <div>
              <span>THE EVERYDAY EDIT</span>
              <strong>
                {t(
                  '매일 신는 것부터, 더 편안하게.',
                  'A little comfort, every day.',
                )}
              </strong>
            </div>
            <Link
              href="/products"
              aria-label={t('전체 컬렉션 보기', 'View all collections')}
            >
              <ArrowUpRight size={24} />
            </Link>
          </div>
        </div>
      </section>
      <div className="container value-strip">
        <p>
          <strong>
            {t('일상에 맞춘 네 가지 라인', 'Four ways to find your fit')}
          </strong>
          <span>
            {t('등산 · 학생 · 남성 · 여성', 'Hiking · Student · Men · Women')}
          </span>
        </p>
        <p>
          <strong>
            {t('기본을 생각하는 디테일', 'Thoughtful everyday details')}
          </strong>
          <span>{t('소재부터 착용감까지', 'From the knit to the fit')}</span>
        </p>
        <p>
          <strong>{t('네이버 스마트스토어', 'Naver Smartstore')}</strong>
          <span>
            {t(
              '구매부터 배송까지 한곳에서',
              'Shop and arrange delivery in one place',
            )}
          </span>
        </p>
      </div>
      <section className="container section collection-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SHOP BY YOUR DAY</p>
            <h2>
              {t('어떤 하루를 보내시나요?', 'What does your day look like?')}
            </h2>
          </div>
          <TextLink href="/products">{t('전체 보기', 'View all')}</TextLink>
        </div>
        <div className="collection-grid">
          {content.categories.map((category, index) => (
            <Link
              className="collection-card"
              key={category.id}
              href={`/product/${category.slug}`}
            >
              <Media asset={category.image} slot="category" />
              <div className="collection-copy">
                <span className="collection-number">0{index + 1}</span>
                <div>
                  <h3>{pick(category.name)}</h3>
                  <p>{pick(category.subtitle)}</p>
                </div>
                <ArrowUpRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      {featured.length > 0 && (
        <section className="section featured-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">THE NINESOCKS SELECTION</p>
                <h2>
                  {t('매일 함께하고 싶은 양말', 'Good pairs for better days')}
                </h2>
                <p className="section-description">
                  {t(
                    '당신의 취향과 일상에 맞춰 골라보세요.',
                    'Find something that feels like you.',
                  )}
                </p>
              </div>
              <TextLink href="/products">
                {t('모든 상품 보기', 'Explore all socks')}
              </TextLink>
            </div>
            <div className="product-grid">
              {featured.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  content={content}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="container section story-section">
        <Media asset={content.home.story} slot="story" />
        <div className="story-copy">
          <p className="eyebrow">SMALL DETAILS. EVERYDAY DIFFERENCE.</p>
          <h2>
            {t('양말 하나에도,', 'A simple essential.')}
            <br />
            {t('우리만의 기준이 있습니다.', 'A thoughtful approach.')}
          </h2>
          <p>
            {t(
              '눈에 잘 띄지 않아도, 하루 종일 함께하는 것.\n우리는 양말이 만드는 작은 차이를 믿습니다.',
              'Often unnoticed, always with you.\nWe believe in the small difference a good pair can make.',
            )}
          </p>
          <p>
            {t(
              '2001년부터 쌓아온 양말 산업의 경험을 바탕으로, 2019년 나인양말을 시작했습니다. 익숙한 일상에 더 나은 착용감을 전하기 위해 소재와 디테일을 살핍니다.',
              'With experience in the sock industry since 2001, we founded NINESOCKS in 2019. We pay attention to materials and details to bring comfort to familiar routines.',
            )}
          </p>
          <TextLink href="/about">
            {t('나인양말 이야기', 'The NINESOCKS story')}
          </TextLink>
        </div>
      </section>
      <section
        className="container principles-grid"
        aria-label={t('나인양말의 생각', 'Our approach')}
      >
        {values.map(({ icon: Icon, title, description }, index) => (
          <div className="principle" key={title}>
            <div className="principle-top">
              <Icon size={25} strokeWidth={1.4} />
              <span>0{index + 1}</span>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </section>
      <StoreBanner url={content.settings.storeUrl} />
    </main>
  );
}
