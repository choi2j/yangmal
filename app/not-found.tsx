'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
export default function NotFound() {
  const { t } = useLanguage();
  return (
    <main id="main" className="container not-found">
      <p className="eyebrow">404 / A DIFFERENT PATH</p>
      <h1>{t('잠시, 다른 길로 오셨네요.', 'Let’s find another path.')}</h1>
      <p>
        {t(
          '요청하신 페이지나 상품을 찾을 수 없습니다.',
          'We could not find that page or product.',
        )}
      </p>
      <Link className="button-link" href="/products">
        {t('양말 둘러보기', 'Explore the collection')}
        <ArrowRight size={18} />
      </Link>
    </main>
  );
}
