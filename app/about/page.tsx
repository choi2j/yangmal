import { AboutPage } from '@/components/about-page';
import { contentRepository } from '@/lib/content/repository';
import { getLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
export async function generateMetadata() {
  const locale = await getLocale();
  return pageMetadata(
    locale === 'ko' ? '우리의 이야기' : 'Our story',
    locale === 'ko'
      ? '작은 양말 하나가 만드는 일상의 차이. 나인양말의 이야기를 만나보세요.'
      : 'Small essentials. An everyday difference. Discover the NINESOCKS story.',
    '/about',
  );
}
export default async function About() {
  return <AboutPage content={await contentRepository.getPublishedContent()} />;
}
