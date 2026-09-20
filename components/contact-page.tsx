'use client';
import { Mail, Phone, MapPin, ArrowUpRight, ShoppingBag } from 'lucide-react';
import type { SiteContent } from '@/lib/content/types';
import { useLanguage } from './language-provider';

export function ContactPage({ content }: { content: SiteContent }) {
  const { t, pick } = useLanguage();
  const settings = content.settings;
  return (
    <main id="main">
      <section className="container page-intro">
        <p className="eyebrow">GET IN TOUCH</p>
        <h1>
          {t('반가운 이야기를 기다립니다.', 'We would love to hear from you.')}
        </h1>
        <p>
          {t(
            '상품에 대한 궁금증부터 새로운 협업까지, 편하게 연락해 주세요.',
            'From product questions to new collaborations, let’s start a conversation.',
          )}
        </p>
      </section>
      <section className="container contact-grid">
        <div className="contact-card">
          <Mail size={27} strokeWidth={1.4} />
          <p className="eyebrow">BUSINESS & COLLABORATION</p>
          <h2>{t('함께 만들고 싶으신가요?', 'Have something in mind?')}</h2>
          <p>
            {t(
              'OEM 제작, 도매 및 브랜드 협업 문의는 이메일로 보내주세요.',
              'Email us about OEM production, wholesale, or brand collaborations.',
            )}
          </p>
          <a
            href={`mailto:${settings.businessEmail}`}
            className="contact-primary"
          >
            {settings.businessEmail}
            <ArrowUpRight size={21} />
          </a>
        </div>
        <div className="contact-card">
          <ShoppingBag size={27} strokeWidth={1.4} />
          <p className="eyebrow">PRODUCT & ORDER</p>
          <h2>
            {t('주문한 상품이 궁금하신가요?', 'A question about your order?')}
          </h2>
          <p>
            {t(
              '주문, 배송, 교환·반품 문의는 구매하신 스마트스토어에서 접수해 주세요.',
              'For orders, delivery, exchanges, and returns, please contact us through Smartstore.',
            )}
          </p>
          <a
            href={settings.storeUrl}
            className="contact-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('스마트스토어 문의하기', 'Contact us on Smartstore')}
            <ArrowUpRight size={21} />
          </a>
        </div>
      </section>
      <section className="container company-details">
        <div>
          <p className="eyebrow">NINESOCKS</p>
          <h2>{t('나인양말', 'NINESOCKS')}</h2>
          <p>{t('대표 최준규', 'Jun Kyu Choi, Representative')}</p>
        </div>
        <dl>
          <div>
            <dt>
              <Phone size={17} />
              {t('전화', 'Phone')}
            </dt>
            <dd>
              <a href={`tel:${settings.phone}`}>{settings.phone}</a>
              <span className="contact-fax">FAX {settings.fax}</span>
            </dd>
          </div>
          <div>
            <dt>
              <MapPin size={17} />
              {t('주소', 'Address')}
            </dt>
            <dd>
              {pick(settings.address)}
              <a
                className="map-link"
                href={`https://map.naver.com/p/search/${encodeURIComponent(settings.address.ko)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('지도에서 보기', 'View on map')}
                <ArrowUpRight size={15} />
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
