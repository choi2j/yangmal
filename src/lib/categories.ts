import type { Lang, Localized } from './i18n/dict';

export type Product = {
	name: Localized;
	slug: string;
	images: string[];
	/** 가격 미정 시 null */
	price: number | null;
	/** 가격 미정 시 null */
	salePrice: number | null;
	/** 표기용 할인율(%). 지정 시 가격에서 자동 계산한 값 대신 이 값을 사용한다. */
	discountRate?: number;
	/** 배송비(원). 미지정 시 표기하지 않는다. */
	shippingFee?: number;
	smartStoreUrl: string;
	detailImages: string[];
};

export type Category = {
	name: Localized;
	slug: string;
	tagline: Localized;
	description: Localized[];
	hero: string;
	/** 모바일 hero용 1:1 라인업 이미지 */
	heroMobile: string;
	items: Product[];
};

// src/lib/assets 의 이미지를 URL 문자열로 일괄 로드 (샘플 데이터용)
const assets = import.meta.glob('./assets/**/*.{png,jpg}', {
	eager: true,
	query: '?url',
	import: 'default'
}) as Record<string, string>;

function img(name: string): string {
	// 파일명 접두어(hiking/men/student/women)를 카테고리 폴더로 사용한다.
	const folder = name.split('_')[0];
	const base = `./assets/${folder}/${name}`;
	// 확장자(png/jpg)는 파일명에 포함하지 않고 자동으로 탐색한다.
	const url = assets[`${base}.png`] ?? assets[`${base}.jpg`];
	if (!url) throw new Error(`이미지 자산을 찾을 수 없습니다: ${name}`);
	return url;
}

const SMARTSTORE_URL = 'https://smartstore.naver.com/yangmal_socks';

export const categories: Category[] = [
	{
		name: { ko: '등산양말', en: 'Hiking Socks' },
		slug: 'hiking',
		tagline: { ko: '발끝까지 기능을 신다', en: 'Function, from Heel to Toe' },
		description: [
			{
				ko: '험한 산길에서도 발을 보호하는 두툼한 쿠셔닝과 땀을 빠르게 배출하는 통기성 설계로, 장시간 산행에도 물집 걱정 없이 편안합니다.',
				en: 'Thick cushioning protects your feet on rough trails, while a breathable knit wicks sweat fast — so even long hikes stay comfortable and blister-free.'
			},
			{
				ko: '발바닥·발목·발등 부위별로 짜임을 다르게 해 충격을 분산하고, 흘러내림 없이 발을 단단히 잡아줍니다.',
				en: 'Zoned knitting across the sole, ankle, and instep disperses impact and holds your foot securely without slipping down.'
			}
		],
		hero: img('hiking_hero'),
		heroMobile: img('hiking_lineup'),
		items: [
			{
				name: { ko: '스페셜쿨트레킹양말', en: 'Special Cool Trekking Socks' },
				slug: 'trekking-cushion-crew',
				images: [img('hiking_item'), img('hiking_description_01'), img('hiking_description_02')],
				price: 5900,
				salePrice: 4900,
				discountRate: 16,
				smartStoreUrl: SMARTSTORE_URL,
				detailImages: [img('hiking_description_01'), img('hiking_description_02')]
			}
		]
	},
	{
		name: { ko: '학생양말', en: 'Student Socks' },
		slug: 'student',
		tagline: { ko: '매일이 편한 데일리 삭스', en: 'Everyday Comfort, Daily Socks' },
		description: [
			{
				ko: '매일 신어도 부담 없는 가성비 베이직 라인으로, 질리지 않는 컬러와 튼튼한 내구성으로 활동량 많은 학생에게 딱 맞습니다.',
				en: 'A great-value basic line you can wear every day, with timeless colors and rugged durability that suit active students perfectly.'
			},
			{
				ko: '잦은 세탁에도 형태가 변하지 않는 탄탄한 조직과 부드러운 면 혼방으로 하루 종일 쾌적합니다.',
				en: 'A firm knit that keeps its shape through frequent washing, plus a soft cotton blend that stays comfortable all day.'
			}
		],
		hero: img('student_hero'),
		heroMobile: img('student_lineup'),
		items: [
			{
				name: { ko: '데일리 베이직 3팩', en: 'Daily Basic 3-Pack' },
				slug: 'daily-basic-3pack',
				images: [img('student_item'), img('student_description_01'), img('student_description_02')],
				price: null,
				salePrice: null,
				smartStoreUrl: SMARTSTORE_URL,
				detailImages: [img('student_description_01'), img('student_description_02')]
			}
		]
	},
	{
		name: { ko: '남성양말', en: "Men's Socks" },
		slug: 'men',
		tagline: { ko: '단정함은 디테일에서', en: 'Sharp Is in the Details' },
		description: [
			{
				ko: '슈트에도 캐주얼에도 어울리는 단정한 핏으로, 발목을 편안하게 잡아주는 밴드와 오래가는 마감으로 비즈니스 룩을 완성합니다.',
				en: 'A clean fit that works with a suit or casual wear, with a comfortable ankle band and long-lasting finish to complete your business look.'
			},
			{
				ko: '땀과 냄새를 줄여주는 항균·소취 가공으로, 오래 신어도 산뜻함을 유지합니다.',
				en: 'Antibacterial, odor-reducing treatment keeps them fresh even after long wear.'
			}
		],
		hero: img('men_hero'),
		heroMobile: img('men_item'),
		items: [
			{
				name: { ko: '데일리신사중목양말', en: 'Daily Gentleman Mid-Calf Socks' },
				slug: 'daily-gentleman',
				images: [
					img('men_item'),
					img('men_item_real'),
					img('men_item_black_ps'),
					img('men_item_gray_ps'),
					img('men_item_mousegray_ps'),
					img('men_flat_fold'),
					img('men_flat_fold_ps'),
					img('men_flat_straight_ps')
				],
				price: 3500,
				salePrice: 2900,
				discountRate: 17,
				shippingFee: 3000,
				smartStoreUrl: '',
				detailImages: [img('men_description_01'), img('men_description_02')]
			}
		]
	},
	{
		name: { ko: '여성양말', en: "Women's Socks" },
		slug: 'women',
		tagline: { ko: '코디의 마침표', en: 'The Finishing Touch' },
		description: [
			{
				ko: '다양한 컬러와 패턴으로 코디의 포인트를 더하는 패션 라인으로, 부드러운 촉감과 산뜻한 착용감으로 하루 종일 가볍습니다.',
				en: 'A fashion line that adds a point of interest to any outfit with a range of colors and patterns — soft to the touch and light all day.'
			},
			{
				ko: '얇고 부드러운 원사로 신발 안에서도 답답함 없이, 발이 편안한 여성 양말입니다.',
				en: 'Thin, soft yarn keeps feet comfortable and unconfined, even inside your shoes.'
			}
		],
		hero: img('women_hero'),
		heroMobile: img('women_lineup'),
		items: [
			{
				name: { ko: '패턴 패션 삭스', en: 'Pattern Fashion Socks' },
				slug: 'pattern-fashion',
				images: [img('women_item'), img('women_description_01'), img('women_description_02')],
				price: null,
				salePrice: null,
				smartStoreUrl: SMARTSTORE_URL,
				detailImages: [img('women_description_01'), img('women_description_02')]
			}
		]
	}
];

export function getCategory(slug: string): Category | undefined {
	return categories.find((category) => category.slug === slug);
}

export function isCategorySlug(slug: string): boolean {
	return categories.some((category) => category.slug === slug);
}

export function findItem(
	categorySlug: string,
	itemSlug: string
): { category: Category; item: Product } | undefined {
	const category = getCategory(categorySlug);
	const item = category?.items.find((entry) => entry.slug === itemSlug);
	if (!category || !item) return undefined;
	return { category, item };
}

export function formatPrice(value: number, lang: Lang): string {
	return lang === 'ko' ? `${value.toLocaleString('ko-KR')}원` : `₩${value.toLocaleString('en-US')}`;
}
