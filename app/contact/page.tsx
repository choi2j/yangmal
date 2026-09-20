import { ContactPage } from '@/components/contact-page';
import { contentRepository } from '@/lib/content/repository';
import { getLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
export async function generateMetadata() {
  const locale = await getLocale();
  return pageMetadata(
    locale === 'ko' ? '문의하기' : 'Contact',
    locale === 'ko'
      ? '나인양말 제품, OEM 제작, 도매 및 협업 문의.'
      : 'Contact NINESOCKS about products, OEM production, wholesale, and collaborations.',
    '/contact',
  );
}
export default async function Contact() {
  return (
    <ContactPage content={await contentRepository.getPublishedContent()} />
  );
}
