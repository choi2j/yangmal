// 사이트 전역 UI 문구 사전. 카테고리/상품 데이터의 다국어 문구는 categories.ts 에 함께 둔다.
export type Lang = 'ko' | 'en';

/** 한 문구의 다국어 쌍 (categories.ts 등에서 공용으로 사용) */
export type Localized = { ko: string; en: string };

export const LANGS: Lang[] = ['ko', 'en'];

/** 언어 선택을 1년간 기억하는 쿠키. 서버(hooks)의 초기 언어 결정에서 최우선으로 읽는다. */
export const LANG_COOKIE = 'lang';

export function isLang(value: unknown): value is Lang {
	return value === 'ko' || value === 'en';
}

export const dict = {
	ko: {
		nav: {
			categories: {
				hiking: '등산양말',
				student: '학생양말',
				men: '남성양말',
				women: '여성양말'
			}
		},
		common: {
			shopNow: '제품 보러가기',
			prevSlide: '이전 슬라이드',
			nextSlide: '다음 슬라이드'
		},
		home: {
			title: 'yangmal.kr — NINESOCKS 기능성 양말 쇼핑몰',
			slides: [
				{ title: '발끝까지 기능을 신다', desc: '오래 걸어도 편안한 쿠셔닝과 통기성의 등산 양말' },
				{ title: '매일이 편한 데일리 삭스', desc: '질리지 않는 베이직, 학생을 위한 가성비 라인' },
				{ title: '단정함은 디테일에서', desc: '깔끔한 핏과 뛰어난 내구성의 남성 비즈니스 양말' },
				{ title: '코디의 마침표', desc: '다양한 컬러와 패턴으로 완성하는 여성 패션 양말' }
			],
			introHtml:
				'yangmal.kr은 <strong>NINESOCKS</strong>가 만든 기능성 양말을 판매하는 온라인 쇼핑몰입니다.<br /> 일상부터 활동까지, 발이 닿는 모든 순간을 더 편안하게 만들어 드립니다.',
			learnMore: '더 알아보기',
			lineupTitle: '제품 라인업',
			lineupSubtitle:
				'등산부터 데일리까지, 상황과 취향에 맞춰 고른 네 가지 양말 라인을 만나보세요.',
			lineup: [
				{
					name: '등산양말',
					desc: '험한 산길에서도 발을 보호하는 두툼한 쿠셔닝과 땀을 빠르게 배출하는 통기성 설계. 장시간 산행에도 물집 걱정 없이 편안합니다.'
				},
				{
					name: '학생양말',
					desc: '매일 신어도 부담 없는 가성비 베이직 라인. 질리지 않는 컬러와 튼튼한 내구성으로 활동량 많은 학생에게 딱 맞습니다.'
				},
				{
					name: '남성양말',
					desc: '슈트에도 캐주얼에도 어울리는 단정한 핏. 발목을 편안하게 잡아주는 밴드와 오래가는 마감으로 비즈니스 룩을 완성합니다.'
				},
				{
					name: '여성양말',
					desc: '다양한 컬러와 패턴으로 코디의 포인트를 더하는 패션 라인. 부드러운 촉감과 산뜻한 착용감으로 하루 종일 가볍습니다.'
				}
			],
			storeTitleHtml: '네이버 스마트스토어에서<br /> NINESOCKS를 만나보세요.',
			storeText:
				'모든 상품의 구매, 결제, 배송은 네이버 스마트스토어를 통해 안전하고 빠르게 진행됩니다. 후기와 Q&A도 스토어에서 확인하실 수 있습니다.',
			storeBtn: '네이버 스마트스토어 바로가기'
		},
		category: {
			lineupWord: '라인업',
			items: 'items'
		},
		product: {
			home: 'HOME',
			listPrice: '판매가',
			salePrice: '할인판매가',
			shipping: '배송비',
			tbd: '미정',
			buy: '네이버 스마트스토어에서 구매하기',
			buyNote: '결제 및 배송은 네이버 스마트스토어를 통해 안전하게 진행됩니다.',
			comingSoon: '판매 예정 상품',
			comingSoonNote: '현재 판매 준비 중인 상품입니다. 곧 만나보실 수 있습니다.',
			tabDetail: '상세정보',
			tabReview: '후기',
			tabQna: 'Q&A',
			detailEmpty: '상세 이미지와 설명이 곧 추가됩니다.',
			reviewEmpty: '등록된 후기가 없습니다.',
			qnaEmpty: '등록된 문의가 없습니다.',
			thumbsLabel: '상품 이미지 썸네일',
			tabNavLabel: '상품 정보 섹션',
			imageAlt: (i: number) => `${i}번째 이미지 보기`,
			detailAlt: (name: string, i: number) => `${name} 상세 이미지 ${i}`
		},
		about: {
			heroTitle: ['기능성 양말의', '미래를 만듭니다.'],
			lead: '나인양말은 기능성 양말을 중심으로 제품을 개발하며, 양말의 미래를 위해 끊임없이 노력하고 있습니다. 소비자의 입장에서 최고의 품질을 구현하는 것, 그것이 나인양말이 일하는 방식입니다.',
			storyTitle: ['20년의 노하우,', '그리고 기능성.'],
			storyText:
				"2001년부터 양말 산업에 몸담아 온 노하우를 바탕으로 2019년 나인양말을 창업했습니다. 남들이 하지 않던 당뇨양말을 비롯해 한방·황토·머드 양말 등 기능성 제품을 BYC, 미국 Dr. Leonard's, 스페인 Vibra confort 등 국내외 주요 브랜드에 납품하며 기능성 양말 분야를 선도해 왔습니다.",
			principlesHeading: '우리가 양말을 만드는 방식',
			principles: [
				{
					title: '기능성에 집중합니다',
					descHtml:
						'<strong>한방·황토·머드·죽탄</strong> 등 천연 소재와 <strong>나노실버·원적외선</strong> 섬유를 활용해, 단순히 신는 양말이 아닌 <strong>발의 건강을 지키는 양말</strong>을 만듭니다.'
				},
				{
					title: '검증된 기술력으로 만듭니다',
					descHtml:
						'항균·소취 효과를 가진 무독성 섬유 조성물 <strong>특허(제10-0887285호)</strong>와 <strong>20년간 축적된 노하우</strong>를 바탕으로, 한 켤레의 품질을 일관되게 유지합니다.'
				},
				{
					title: '세계가 인정한 품질입니다',
					descHtml:
						'<strong>미국·캐나다·스페인</strong> 등 글로벌 시장에 기능성 양말을 수출하고, <strong>BYC 최우수 협력업체</strong>로 선정되며 국내외에서 품질을 인정받아 왔습니다.'
				}
			],
			ctaTitle: '함께 만들어 갈 협업을 기다립니다.',
			ctaText: 'OEM·도매·협업 등 사업 관련 문의는 언제든 환영합니다.',
			ctaBtn: '사업 문의하기'
		},
		contact: {
			heroTitle: ['언제든', '연락주세요.'],
			lead: '제품 문의, OEM 주문, 협업 제안 등 무엇이든 편하게 연락 주세요.',
			labelCompany: '회사명',
			labelCeo: '대표자',
			labelAddress: '주소',
			labelPhone: '전화',
			labelFax: '팩스',
			labelEmail: '이메일',
			company: '나인양말',
			ceo: '최준규',
			address: '경기도 포천시 소흘읍 한성길 106',
			mapLink: '지도에서 보기 →'
		},
		footer: {
			labelCompany: 'COMPANY',
			labelInquiry: 'INQUIRY',
			company: '나인양말 NINESOCKS',
			address: '경기도 포천시 소흘읍 한성길 106',
			inquiryBusiness: '사업 문의',
			inquiryAdmin: '사이트 관리자',
			menuAlt: '푸터 메뉴'
		}
	},
	en: {
		nav: {
			categories: {
				hiking: 'Hiking Socks',
				student: 'Student Socks',
				men: "Men's Socks",
				women: "Women's Socks"
			}
		},
		common: {
			shopNow: 'Shop Now',
			prevSlide: 'Previous slide',
			nextSlide: 'Next slide'
		},
		home: {
			title: 'yangmal.kr — NINESOCKS Functional Socks',
			slides: [
				{
					title: 'Function, from Heel to Toe',
					desc: 'Cushioned, breathable hiking socks for the long haul'
				},
				{
					title: 'Everyday Comfort, Daily Socks',
					desc: 'Timeless basics — a great-value line for students'
				},
				{
					title: 'Sharp Is in the Details',
					desc: "Men's business socks with a clean fit and outstanding durability"
				},
				{
					title: 'The Finishing Touch',
					desc: "Women's fashion socks in a range of colors and patterns"
				}
			],
			introHtml:
				'yangmal.kr is the online store for functional socks made by <strong>NINESOCKS</strong>.<br /> From everyday life to active pursuits, we make every step more comfortable.',
			learnMore: 'Learn More',
			lineupTitle: 'Our Lineup',
			lineupSubtitle:
				'From hiking to daily wear, explore four sock lines chosen to fit every occasion and taste.',
			lineup: [
				{
					name: 'Hiking Socks',
					desc: 'Thick cushioning protects your feet on rough trails, with a breathable design that wicks sweat fast. Comfortable and blister-free, even on long hikes.'
				},
				{
					name: 'Student Socks',
					desc: 'A great-value basic line for everyday wear. Timeless colors and rugged durability make it perfect for active students.'
				},
				{
					name: "Men's Socks",
					desc: 'A clean fit for suits and casual wear alike. A comfortable ankle band and long-lasting finish complete your business look.'
				},
				{
					name: "Women's Socks",
					desc: 'A fashion line that adds a point of interest with varied colors and patterns. Soft to the touch and light all day.'
				}
			],
			storeTitleHtml: 'Find NINESOCKS on<br /> Naver Smartstore.',
			storeText:
				"All purchases, payments, and shipping are handled safely and quickly through Naver Smartstore. You'll find reviews and Q&A there too.",
			storeBtn: 'Go to Naver Smartstore'
		},
		category: {
			lineupWord: 'Lineup',
			items: 'items'
		},
		product: {
			home: 'HOME',
			listPrice: 'List Price',
			salePrice: 'Sale Price',
			shipping: 'Shipping',
			tbd: 'TBD',
			buy: 'Buy on Naver Smartstore',
			buyNote: 'Payment and shipping are handled securely through Naver Smartstore.',
			comingSoon: 'Coming Soon',
			comingSoonNote: 'This product is being prepared for sale. Coming soon.',
			tabDetail: 'Details',
			tabReview: 'Reviews',
			tabQna: 'Q&A',
			detailEmpty: 'Detailed images and descriptions coming soon.',
			reviewEmpty: 'No reviews yet.',
			qnaEmpty: 'No questions yet.',
			thumbsLabel: 'Product image thumbnails',
			tabNavLabel: 'Product information sections',
			imageAlt: (i: number) => `View image ${i}`,
			detailAlt: (name: string, i: number) => `${name} detail image ${i}`
		},
		about: {
			heroTitle: ['Building the future', 'of functional socks.'],
			lead: "NINESOCKS develops products centered on functional socks, working tirelessly to shape the future of the sock. Delivering the highest quality from the customer's point of view — that is how NINESOCKS works.",
			storyTitle: ['Two decades of know-how —', 'and function.'],
			storyText:
				"Drawing on know-how built in the sock industry since 2001, we founded NINESOCKS in 2019. From diabetic socks that no one else was making to herbal, ocher, and mud socks and other functional products, we've supplied major brands at home and abroad — including BYC, Dr. Leonard's in the U.S., and Vibra Confort in Spain — leading the way in functional socks.",
			principlesHeading: 'How We Make Our Socks',
			principles: [
				{
					title: 'We focus on function.',
					descHtml:
						'Using natural materials like <strong>herbs, ocher, mud, and bamboo charcoal</strong> along with <strong>nano-silver and far-infrared</strong> fibers, we make socks that <strong>protect your foot health</strong> — not just socks to wear.'
				},
				{
					title: 'We build on proven technology.',
					descHtml:
						'Backed by our <strong>patent for a non-toxic, antibacterial and odor-reducing fiber composition (No. 10-0887285)</strong> and <strong>two decades of accumulated know-how</strong>, we keep every pair consistent in quality.'
				},
				{
					title: 'Quality the world recognizes.',
					descHtml:
						'We export functional socks to global markets including <strong>the U.S., Canada, and Spain</strong>, and have been named a <strong>BYC Top Partner</strong> — earning recognition for quality at home and abroad.'
				}
			],
			ctaTitle: "Let's build something together.",
			ctaText: 'We welcome any business inquiry — OEM, wholesale, or partnership.',
			ctaBtn: 'Get in Touch'
		},
		contact: {
			heroTitle: ['Get in touch', 'anytime.'],
			lead: 'Product questions, OEM orders, partnership proposals — reach out about anything.',
			labelCompany: 'Company',
			labelCeo: 'CEO',
			labelAddress: 'Address',
			labelPhone: 'Phone',
			labelFax: 'Fax',
			labelEmail: 'Email',
			company: 'NINESOCKS',
			ceo: 'Choi Jun-gyu',
			address: '106 Hanseong-gil, Soheul-eup, Pocheon-si, Gyeonggi-do, Korea',
			mapLink: 'View on map →'
		},
		footer: {
			labelCompany: 'COMPANY',
			labelInquiry: 'INQUIRY',
			company: 'NINESOCKS',
			address: '106 Hanseong-gil, Soheul-eup, Pocheon-si, Gyeonggi-do, Korea',
			inquiryBusiness: 'Business',
			inquiryAdmin: 'Site Admin',
			menuAlt: 'Footer menu'
		}
	}
} as const;
