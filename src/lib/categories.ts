export type Product = {
	name: string;
	slug: string;
	images: string[];
	price: number;
	salePrice: number;
	/** 표기용 할인율(%). 지정 시 가격에서 자동 계산한 값 대신 이 값을 사용한다. */
	discountRate?: number;
	smartStoreUrl: string;
	detailImages: string[];
};

export type Category = {
	name: string;
	slug: string;
	tagline: string;
	description: string[];
	hero: string;
	/** 모바일 hero용 1:1 라인업 이미지 */
	heroMobile: string;
	items: Product[];
};

// src/lib/assets 의 이미지를 URL 문자열로 일괄 로드 (샘플 데이터용)
const assets = import.meta.glob('./assets/*.png', {
	eager: true,
	query: '?url',
	import: 'default'
}) as Record<string, string>;

function img(name: string): string {
	const url = assets[`./assets/${name}.png`];
	if (!url) throw new Error(`이미지 자산을 찾을 수 없습니다: ${name}`);
	return url;
}

const SMARTSTORE_URL = 'https://smartstore.naver.com/yangmal_socks';

export const categories: Category[] = [
	{
		name: '등산양말',
		slug: 'hiking',
		tagline: '발끝까지 기능을 신다',
		description: [
			'험한 산길에서도 발을 보호하는 두툼한 쿠셔닝과 땀을 빠르게 배출하는 통기성 설계로, 장시간 산행에도 물집 걱정 없이 편안합니다.',
			'발바닥·발목·발등 부위별로 짜임을 다르게 해 충격을 분산하고, 흘러내림 없이 발을 단단히 잡아줍니다.'
		],
		hero: img('hiking_hero'),
		heroMobile: img('hiking_lineup'),
		items: [
			{
				name: '스페셜쿨트레킹양말',
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
		name: '학생양말',
		slug: 'student',
		tagline: '매일이 편한 데일리 삭스',
		description: [
			'매일 신어도 부담 없는 가성비 베이직 라인으로, 질리지 않는 컬러와 튼튼한 내구성으로 활동량 많은 학생에게 딱 맞습니다.',
			'잦은 세탁에도 형태가 변하지 않는 탄탄한 조직과 부드러운 면 혼방으로 하루 종일 쾌적합니다.'
		],
		hero: img('student_hero'),
		heroMobile: img('student_lineup'),
		items: [
			{
				name: '데일리 베이직 3팩',
				slug: 'daily-basic-3pack',
				images: [img('student_item'), img('student_description_01'), img('student_description_02')],
				price: 890,
				salePrice: 690,
				smartStoreUrl: SMARTSTORE_URL,
				detailImages: [img('student_description_01'), img('student_description_02')]
			}
		]
	},
	{
		name: '남성양말',
		slug: 'men',
		tagline: '단정함은 디테일에서',
		description: [
			'슈트에도 캐주얼에도 어울리는 단정한 핏으로, 발목을 편안하게 잡아주는 밴드와 오래가는 마감으로 비즈니스 룩을 완성합니다.',
			'땀과 냄새를 줄여주는 항균·소취 가공으로, 오래 신어도 산뜻함을 유지합니다.'
		],
		hero: img('men_hero'),
		heroMobile: img('men_lineup'),
		items: [
			{
				name: '비즈니스 정장 양말',
				slug: 'business-dress',
				images: [img('men_item'), img('men_description_01'), img('men_description_02')],
				price: 790,
				salePrice: 590,
				smartStoreUrl: SMARTSTORE_URL,
				detailImages: [
					img('men_description_01'),
					img('men_description_02'),
					img('men_description_03'),
					img('men_description_04'),
					img('men_description_05')
				]
			}
		]
	},
	{
		name: '여성양말',
		slug: 'women',
		tagline: '코디의 마침표',
		description: [
			'다양한 컬러와 패턴으로 코디의 포인트를 더하는 패션 라인으로, 부드러운 촉감과 산뜻한 착용감으로 하루 종일 가볍습니다.',
			'얇고 부드러운 원사로 신발 안에서도 답답함 없이, 발이 편안한 여성 양말입니다.'
		],
		hero: img('women_hero'),
		heroMobile: img('women_lineup'),
		items: [
			{
				name: '패턴 패션 삭스',
				slug: 'pattern-fashion',
				images: [img('women_item'), img('women_description_01'), img('women_description_02')],
				price: 690,
				salePrice: 490,
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

export function formatPriceKRW(value: number): string {
	return `${value.toLocaleString('ko-KR')}원`;
}
