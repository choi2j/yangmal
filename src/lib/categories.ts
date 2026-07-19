import type { Lang, Localized } from './i18n/dict';
import productData from './data/products.json';

export type Product = {
	name: Localized;
	slug: string;
	/** static/ 기준 public 경로 (예: /images/hiking_item.png) */
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
	/** static/ 기준 public 경로 */
	detailImages: string[];
};

export type Category = {
	name: Localized;
	slug: string;
	tagline: Localized;
	description: Localized[];
	/** static/ 기준 public 경로 (예: /images/hiking_hero.png) */
	hero: string;
	/** 모바일 hero용 1:1 라인업 이미지 (public 경로) */
	heroMobile: string;
	items: Product[];
};

// 상품·카테고리 데이터는 src/lib/data/products.json 에서 로드한다.
// 이미지는 static/ 하위의 public 경로 문자열로 참조한다 (빌드 없이 파일 교체/추가 가능).
// 이 JSON은 향후 Git 기반 CMS가 편집하는 콘텐츠 소스가 된다.
export const categories = productData.categories as Category[];

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
