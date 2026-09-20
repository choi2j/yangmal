'use client';
import Link from 'next/link';
import { Layers, Footprints, HeartHandshake } from 'lucide-react';
import type { SiteContent } from '@/lib/content/types';
import { useLanguage } from './language-provider';
import { Media } from './media';

export function AboutPage({ content }: { content: SiteContent }) {
  const { t } = useLanguage();
  const values = [
    {
      icon: Footprints,
      title: t('쓰임을 먼저 생각합니다', 'Purpose comes first'),
      text: t(
        '매일의 출근길, 긴 산행, 바쁜 학교생활. 양말을 신는 순간과 움직임에서 출발합니다.',
        'A daily commute, a long hike, a busy school day. We start with the moments and movements that socks are made for.',
      ),
    },
    {
      icon: Layers,
      title: t('기본을 세심하게 살핍니다', 'Attention to the essentials'),
      text: t(
        '원사의 촉감과 짜임, 발목을 잡아주는 밴드까지. 작은 부분이 하루의 착용감을 만든다고 믿습니다.',
        'Yarn, knitting, and the band around your ankle. Small details shape how a pair feels throughout the day.',
      ),
    },
    {
      icon: HeartHandshake,
      title: t('함께 오래 만들어 갑니다', 'Building lasting relationships'),
      text: t(
        '소비자와 파트너의 이야기에 귀 기울이며, 일상 속에서 오래 사랑받는 제품을 고민합니다.',
        'Listening to our customers and partners helps us create products that find a lasting place in everyday life.',
      ),
    },
  ];
  return (
    <main id="main">
      <section className="container page-intro about-intro">
        <p className="eyebrow">OUR STORY / NINESOCKS</p>
        <h1>
          {t('작은 양말 하나가', 'Small essentials.')}
          <br />
          {t('만드는 일상의 차이.', 'An everyday difference.')}
        </h1>
        <p>
          {t(
            '매일 신는 것일수록, 더 세심하게 만듭니다.',
            'The things you wear every day deserve a little extra thought.',
          )}
        </p>
      </section>
      <section className="container about-story">
        <Media asset={content.home.story} slot="story" />
        <div>
          <p className="eyebrow">FROM EXPERIENCE TO EVERYDAY COMFORT</p>
          <h2>
            {t('양말을 알아온 시간,', 'Years of experience,')}
            <br />
            {t('편안함을 향한 생각.', 'thoughtfully put to work.')}
          </h2>
          <p>
            {t(
              '나인양말은 기능성 양말을 중심으로 제품을 개발하는 브랜드입니다. 소비자의 입장에서 더 나은 착용감을 만드는 것. 우리가 양말을 바라보는 기준입니다.',
              'NINESOCKS develops socks with a focus on function. Our starting point is simple: making the experience of wearing them better, from the customer’s point of view.',
            )}
          </p>
          <p>
            {t(
              '2001년부터 양말 산업에서 쌓아온 경험을 바탕으로 2019년 나인양말을 시작했습니다. 일상과 활동에 맞는 소재와 짜임을 고민하며, 익숙한 기본을 조금씩 발전시키고 있습니다.',
              'After working in the sock industry since 2001, we founded NINESOCKS in 2019. We continue to explore materials and knitting suited to daily life and activity, refining a familiar essential.',
            )}
          </p>
          <div className="brand-timeline">
            <div>
              <strong>2001</strong>
              <span>
                {t('양말 산업에서의 시작', 'Our start in the sock industry')}
              </span>
            </div>
            <div>
              <strong>2019</strong>
              <span>{t('나인양말 설립', 'NINESOCKS established')}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT WE BELIEVE</p>
            <h2>
              {t('우리가 양말을 만드는 방식', 'The way we think about socks')}
            </h2>
          </div>
        </div>
        <div className="principles-grid about-values">
          {values.map(({ icon: Icon, title, text }, index) => (
            <article className="principle" key={title}>
              <div className="principle-top">
                <Icon size={26} strokeWidth={1.4} />
                <span>0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="business-banner">
        <div className="container">
          <p className="eyebrow">LET’S MAKE SOMETHING GOOD</p>
          <h2>
            {t(
              '다음 이야기는, 함께 만들어요.',
              'Let’s write the next chapter together.',
            )}
          </h2>
          <p>
            {t(
              'OEM 제작, 도매, 브랜드 협업에 관한 제안을 기다립니다.',
              'Get in touch about OEM production, wholesale, and brand collaborations.',
            )}
          </p>
          <Link className="button-link" href="/contact">
            {t('사업 문의하기', 'Talk to us')}
          </Link>
        </div>
      </section>
    </main>
  );
}
