import { contentRepository } from '@/lib/content/repository';
import { HomePage } from '@/components/home-page';
import { pageMetadata } from '@/lib/metadata';
import { getLocale } from '@/lib/locale';
export async function generateMetadata() {
  const locale = await getLocale();
  return pageMetadata(
    locale === 'ko'
      ? '일상에 맞는 편안함, NINESOCKS'
      : 'Everyday comfort, NINESOCKS',
    locale === 'ko'
      ? '등산부터 일상까지, 당신의 하루에 맞는 NINESOCKS 양말을 만나보세요.'
      : 'From the trail to everyday life. Discover your next favorite pair of NINESOCKS.',
    '/',
  );
}
export default async function Home() {
  return <HomePage content={await contentRepository.getPublishedContent()} />;
}
