import type { Metadata } from 'next';
import { LanguageProvider } from '@/components/language-provider';
import { Header, Footer } from '@/components/site-shell';
import { contentRepository } from '@/lib/content/repository';
import { getLocale } from '@/lib/locale';
import { siteOrigin } from '@/lib/metadata';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: 'yangmal.kr — NINESOCKS', template: '%s | yangmal.kr' },
  description:
    '등산부터 일상까지, 당신의 하루에 맞는 NINESOCKS 양말을 만나보세요.',
  icons: { icon: '/favicon.svg' },
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [content, locale] = await Promise.all([
    contentRepository.getPublishedContent(),
    getLocale(),
  ]);
  return (
    <html lang={locale}>
      <body>
        <LanguageProvider initialLocale={locale}>
          <a href="#main" className="skip-link">
            {locale === 'ko' ? '본문으로 바로가기' : 'Skip to content'}
          </a>
          <Header content={content} />
          {children}
          <Footer content={content} />
        </LanguageProvider>
      </body>
    </html>
  );
}
