'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useLanguage } from './language-provider';
import type { SiteContent } from '@/lib/content/types';

export function Brand() {
  return (
    <Link href="/" className="wordmark" aria-label="yangmal.kr home">
      yangmal<span>.kr</span>
      <small>BY NINESOCKS</small>
    </Link>
  );
}
export function Header({ content }: { content: SiteContent }) {
  const { locale, setLocale, t, pick } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: '/products', label: t('모든 양말', 'All socks') },
    { href: '/about', label: t('우리의 이야기', 'Our story') },
    { href: '/contact', label: t('문의하기', 'Contact') },
  ];
  const current = (href: string) =>
    pathname === href ||
    (href === '/products' && pathname.startsWith('/product/'));
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav
            className="desktop-nav"
            aria-label={t('주 메뉴', 'Main navigation')}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <div
              className="language-switch"
              aria-label={t('언어 선택', 'Language')}
            >
              <Button
                size="sm"
                variant="ghost"
                aria-pressed={locale === 'ko'}
                onClick={() => setLocale('ko')}
              >
                KR
              </Button>
              <span aria-hidden="true">/</span>
              <Button
                size="sm"
                variant="ghost"
                aria-pressed={locale === 'en'}
                onClick={() => setLocale('en')}
              >
                EN
              </Button>
            </div>
            <a
              href={content.settings.storeUrl}
              className="header-store"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('스마트스토어', 'Smartstore')} <ArrowUpRight size={16} />
              <span className="sr-only">{t('새 창', 'New window')}</span>
            </a>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                render={
                  <Button
                    className="mobile-menu-button"
                    variant="ghost"
                    size="icon"
                    aria-label={t('메뉴 열기', 'Open menu')}
                  />
                }
              >
                <Menu size={23} />
              </SheetTrigger>
              <SheetContent className="mobile-menu">
                <SheetHeader>
                  <SheetTitle>yangmal.kr</SheetTitle>
                  <SheetDescription>
                    {t(
                      '당신의 하루에 맞는 편안함',
                      'Comfort for your everyday',
                    )}
                  </SheetDescription>
                </SheetHeader>
                <nav aria-label={t('모바일 메뉴', 'Mobile navigation')}>
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={current(link.href) ? 'page' : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mobile-categories">
                    {content.categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/product/${category.slug}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {pick(category.name)}
                      </Link>
                    ))}
                  </div>
                  <a
                    href={content.settings.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('스마트스토어 바로가기', 'Visit Smartstore')}
                    <ArrowUpRight size={18} />
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

export function Footer({ content }: { content: SiteContent }) {
  const { t, pick } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              {t(
                '매일 신는 것부터, 더 편안하게.',
                'Everyday comfort starts here.',
              )}
            </p>
            <span>GOOD SOCKS. BETTER DAYS.</span>
          </div>
          <div>
            <h2>{t('컬렉션', 'Collections')}</h2>
            <ul>
              {content.categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/product/${category.slug}`}>
                    {pick(category.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t('브랜드', 'NINESOCKS')}</h2>
            <ul>
              <li>
                <Link href="/about">{t('우리의 이야기', 'Our story')}</Link>
              </li>
              <li>
                <Link href="/contact">
                  {t('사업 · 제품 문의', 'Business & product inquiries')}
                </Link>
              </li>
              <li>
                <a
                  href={content.settings.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('스마트스토어', 'Smartstore')} ↗
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <h2>{t('고객 · 사업 문의', 'Get in touch')}</h2>
            <a href={`tel:${content.settings.phone}`}>
              {content.settings.phone}
            </a>
            <a href={`mailto:${content.settings.businessEmail}`}>
              {content.settings.businessEmail}
            </a>
            <p>{pick(content.settings.address)}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} NINESOCKS. All rights reserved.
          </span>
          <span>
            {t('나인양말 · 대표 최준규', 'NINESOCKS · Jun Kyu Choi')}
            <span className="footer-dot">·</span>FUNCTIONAL SOCKS, SINCE 2019
          </span>
        </div>
      </div>
    </footer>
  );
}

export function StoreBanner({ url }: { url: string }) {
  const { t } = useLanguage();
  return (
    <section className="store-banner">
      <div className="container store-banner-inner">
        <div>
          <h2>
            {t(
              '당신의 다음 발걸음을 함께할 양말.',
              'Your next everyday favorite.',
            )}
          </h2>
          <p>
            {t(
              '구매와 배송, 후기 확인은 네이버 스마트스토어에서.',
              'Shop, arrange delivery, and read reviews on Naver Smartstore.',
            )}
          </p>
        </div>
        <a
          className="button-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('스마트스토어 바로가기', 'Visit Smartstore')}
          <ArrowUpRight size={19} />
        </a>
      </div>
    </section>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
    </Link>
  );
}
