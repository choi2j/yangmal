<script lang="ts">
	import { resolve } from '$app/paths';

	import hikingHero from '$lib/assets/hiking_hero.png';
	import studentHero from '$lib/assets/student_hero.png';
	import menHero from '$lib/assets/men_hero.png';
	import womenHero from '$lib/assets/women_hero.png';

	import hikingLineup from '$lib/assets/hiking_lineup.png';
	import studentLineup from '$lib/assets/student_lineup.png';
	import menLineup from '$lib/assets/men_lineup.png';
	import womenLineup from '$lib/assets/women_lineup.png';

	type Slide = {
		title: string;
		description: string;
		slug: string;
		image: string;
	};

	const slides: Slide[] = [
		{
			title: '발끝까지 기능을 신다',
			description: '오래 걸어도 편안한 쿠셔닝과 통기성의 등산 양말',
			slug: 'hiking',
			image: hikingHero
		},
		{
			title: '매일이 편한 데일리 삭스',
			description: '질리지 않는 베이직, 학생을 위한 가성비 라인',
			slug: 'student',
			image: studentHero
		},
		{
			title: '단정함은 디테일에서',
			description: '깔끔한 핏과 뛰어난 내구성의 남성 비즈니스 양말',
			slug: 'men',
			image: menHero
		},
		{
			title: '코디의 마침표',
			description: '다양한 컬러와 패턴으로 완성하는 여성 패션 양말',
			slug: 'women',
			image: womenHero
		}
	];

	const n = slides.length;
	// 무한 순환을 위해 앞뒤에 클론 배치: [마지막, ...원본, 첫번째]
	const display: Slide[] = [slides[n - 1], ...slides, slides[0]];
	const dotIndexes = [...slides.keys()];

	type Lineup = {
		name: string;
		slug: string;
		description: string;
		image: string;
	};

	const lineup: Lineup[] = [
		{
			name: '등산양말',
			slug: 'hiking',
			description:
				'험한 산길에서도 발을 보호하는 두툼한 쿠셔닝과 땀을 빠르게 배출하는 통기성 설계. 장시간 산행에도 물집 걱정 없이 편안합니다.',
			image: hikingLineup
		},
		{
			name: '학생양말',
			slug: 'student',
			description:
				'매일 신어도 부담 없는 가성비 베이직 라인. 질리지 않는 컬러와 튼튼한 내구성으로 활동량 많은 학생에게 딱 맞습니다.',
			image: studentLineup
		},
		{
			name: '남성양말',
			slug: 'men',
			description:
				'슈트에도 캐주얼에도 어울리는 단정한 핏. 발목을 편안하게 잡아주는 밴드와 오래가는 마감으로 비즈니스 룩을 완성합니다.',
			image: menLineup
		},
		{
			name: '여성양말',
			slug: 'women',
			description:
				'다양한 컬러와 패턴으로 코디의 포인트를 더하는 패션 라인. 부드러운 촉감과 산뜻한 착용감으로 하루 종일 가볍습니다.',
			image: womenLineup
		}
	];

	let index = $state(1); // 첫 원본 슬라이드에서 시작
	let animate = $state(true);
	let trackEl: HTMLElement;

	// 클론을 제외한 실제 슬라이드 위치 (하단 점 인디케이터용)
	let realIndex = $derived((index - 1 + n) % n);
	let timer: ReturnType<typeof setInterval> | undefined;
	// 전환이 끝나기 전 추가 이동을 막아 index가 클론 범위(0~n+1)를 벗어나지 않게 한다
	let moving = false;

	function step(dir: number) {
		if (moving) return;
		moving = true;
		index += dir;
	}

	function handleTransitionEnd(e: TransitionEvent) {
		if (e.target !== trackEl || e.propertyName !== 'transform') return;
		if (index === 0 || index === n + 1) {
			// 클론 위치 도달 → 애니메이션 없이 대응되는 원본 위치로 스냅 후 잠금 해제
			animate = false;
			index = index === 0 ? n : 1;
			requestAnimationFrame(() =>
				requestAnimationFrame(() => {
					animate = true;
					moving = false;
				})
			);
		} else {
			moving = false;
		}
	}

	function startAuto() {
		stopAuto();
		timer = setInterval(() => step(1), 5000);
	}
	function stopAuto() {
		if (timer) clearInterval(timer);
	}

	function onPrev() {
		step(-1);
		startAuto();
	}
	function onNext() {
		step(1);
		startAuto();
	}

	// 자동 순환 + 마우스 오버 시 일시정지 (a11y 경고 없이 처리)
	function autoplay(node: HTMLElement) {
		startAuto();
		node.addEventListener('mouseenter', stopAuto);
		node.addEventListener('mouseleave', startAuto);
		return {
			destroy() {
				stopAuto();
				node.removeEventListener('mouseenter', stopAuto);
				node.removeEventListener('mouseleave', startAuto);
			}
		};
	}
</script>

<section class="hero">
	<div class="hero-viewport" use:autoplay>
		<div
			class="hero-track"
			class:no-anim={!animate}
			bind:this={trackEl}
			style="transform: translateX(-{index * 100}%);"
			ontransitionend={handleTransitionEnd}
		>
			{#each display as slide, i (i)}
				<article class="hero-slide" style="--bg: url({slide.image});">
					<div class="hero-overlay"></div>
					<div class="hero-text">
						<h2 class="hero-title">{slide.title}</h2>
						<p class="hero-desc">{slide.description}</p>
						<a
							class="hero-cta"
							href={resolve('/product/[category]', { category: slide.slug })}
						>
							제품 보러가기
						</a>
					</div>
				</article>
			{/each}
		</div>

		<div class="hero-nav">
			<div class="hero-arrows">
				<button class="hero-btn" type="button" aria-label="이전 슬라이드" onclick={onPrev}
					>&#10094;</button
				>
				<button class="hero-btn" type="button" aria-label="다음 슬라이드" onclick={onNext}
					>&#10095;</button
				>
			</div>

			<div class="hero-dots" aria-hidden="true">
				{#each dotIndexes as i (i)}
					<span class="hero-dot" class:active={i === realIndex}></span>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="intro">
	<p class="intro-text">
		yangmal.kr은 <strong>NINESOCKS</strong>가 만든 기능성 양말을 판매하는 온라인 쇼핑몰입니다.<br />
		일상부터 활동까지, 발이 닿는 모든 순간을 더 편안하게 만들어 드립니다.
	</p>
	<a class="intro-btn" href={resolve('/about')}>
		<span>ABOUT</span>
		<span class="intro-btn-sep" aria-hidden="true"></span>
		<span>더 알아보기</span>
	</a>
</section>

<section class="lineup-head">
	<span class="lineup-eyebrow">LINEUP</span>
	<h2 class="lineup-title">제품 라인업</h2>
	<p class="lineup-subtitle">
		등산부터 데일리까지, 상황과 취향에 맞춰 고른 네 가지 양말 라인을 만나보세요.
	</p>
</section>

<section class="lineup">
	{#each lineup as item, i (item.name)}
		{#if i > 0}
			<hr class="lineup-divider" />
		{/if}
		<article class="lineup-item" class:reverse={i % 2 === 1}>
			<div class="lineup-image" style="background-image: url({item.image});"></div>
			<div class="lineup-body">
				<h3 class="lineup-name">{item.name}</h3>
				<p class="lineup-desc">{item.description}</p>
				<a class="lineup-link" href={resolve('/product/[category]', { category: item.slug })}>
					제품 보러가기
				</a>
			</div>
		</article>
	{/each}
</section>

<section class="store-cta">
	<div class="store-cta-inner">
		<p class="store-eyebrow">NAVER SMARTSTORE</p>
		<h2 class="store-title">
			네이버 스마트스토어에서<br />
			NINESOCKS를 만나보세요.
		</h2>
		<p class="store-text">
			모든 상품의 구매, 결제, 배송은 네이버 스마트스토어를 통해 안전하고 빠르게 진행됩니다.
			후기와 Q&amp;A도 스토어에서 확인하실 수 있습니다.
		</p>
		<a
			class="store-btn"
			href="https://smartstore.naver.com/yangmal_socks"
			target="_blank"
			rel="noopener noreferrer"
		>
			<span class="store-mark" aria-hidden="true">N</span>
			<span>스마트스토어 바로가기</span>
			<span class="store-arrow" aria-hidden="true">→</span>
		</a>
	</div>
</section>

<style>
	.hero {
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 70%;
		margin: 2.5rem auto;
	}

	.hero-viewport {
		position: relative;
		flex: 1;
		min-width: 0;
		aspect-ratio: 16 / 9;
		border-radius: 1.25rem;
		overflow: hidden;
	}

	.hero-track {
		display: flex;
		width: 100%;
		height: 100%;
		transition: transform 0.45s ease;
	}

	.hero-track.no-anim {
		transition: none;
	}

	.hero-slide {
		position: relative;
		flex: 0 0 100%;
		height: 100%;
		background-image: var(--bg);
		background-size: cover;
		background-position: center;
	}

	/* 하단을 어둡게 덮는 그라데이션 오버레이 → 텍스트 가독성 확보 */
	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.75) 0%,
			rgba(0, 0, 0, 0.35) 28%,
			rgba(0, 0, 0, 0) 58%
		);
	}

	/* 좌측 하단 텍스트 */
	.hero-text {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 2;
		max-width: 60%;
		padding: 2.5rem 3rem;
		color: #fff;
	}

	.hero-title {
		font-size: clamp(1.75rem, 4vw, 3rem);
		font-weight: 700;
		line-height: 1.2;
	}

	.hero-desc {
		margin-top: 0.75rem;
		font-size: clamp(0.9rem, 1.5vw, 1.1rem);
		color: rgba(255, 255, 255, 0.85);
	}

	/* 슬라이드 → 카테고리 페이지 이동 버튼 */
	.hero-cta {
		display: inline-block;
		margin-top: 1.25rem;
		padding: 0.6rem 1.3rem;
		border-radius: 999px;
		background: #fff;
		color: #1a1a1a;
		font-size: 0.9rem;
		font-weight: 600;
		transition:
			background-color 0.15s ease,
			transform 0.15s ease;
	}

	.hero-cta:hover {
		background: rgba(255, 255, 255, 0.85);
		transform: translateY(-1px);
	}

	/* 우측 하단: 화살표 + 인디케이터 묶음 */
	.hero-nav {
		position: absolute;
		right: 1.5rem;
		bottom: 1.5rem;
		z-index: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
	}

	/* 인디케이터 위, 두 화살표를 붙여서 배치 */
	.hero-arrows {
		display: flex;
		gap: 0.25rem;
	}

	/* 좌우 이동 버튼 (배경 없이 이미지 위에 표시) */
	.hero-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		color: rgba(255, 255, 255, 0.8);
		font-size: 1.25rem;
		line-height: 1;
		user-select: none;
		transition:
			color 0.15s ease,
			transform 0.15s ease;
	}

	.hero-btn:hover {
		color: #fff;
		transform: scale(1.12);
	}

	/* 위치 인디케이터 */
	.hero-dots {
		display: flex;
		gap: 0.5rem;
	}

	.hero-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.4);
		transition: background-color 0.2s ease;
	}

	.hero-dot.active {
		background: #fff;
	}

	/* ───────── 사이트 소개 ───────── */
	.intro {
		max-width: 70%;
		margin: 5rem auto;
		text-align: center;
	}

	.intro-text {
		font-size: clamp(1.05rem, 1.8vw, 1.4rem);
		line-height: 1.8;
		color: #333;
	}

	.intro-text strong {
		font-weight: 700;
	}

	.intro-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		margin-top: 1.75rem;
		padding: 0.7rem 1.6rem;
		border: 1px solid #1a1a1a;
		border-radius: 999px;
		font-size: 0.9rem;
		font-weight: 600;
		color: #1a1a1a;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	/* ABOUT / 더 알아보기 사이 짧고 희미한 수직 구분선 */
	.intro-btn-sep {
		width: 1px;
		height: 0.85em;
		background: currentColor;
		opacity: 0.35;
	}

	.intro-btn:hover {
		background: #1a1a1a;
		color: #fff;
	}

	/* ───────── 라인업 섹션 ───────── */
	.lineup {
		display: flex;
		flex-direction: column;
		gap: 4.5rem;
		max-width: 70%;
		margin: 3rem auto 5rem;
	}

	/* 섹션 대표 텍스트 (배경 박스 없이 깔끔한 타이포 헤더) */
	.lineup-head {
		max-width: 70%;
		margin: 5rem auto;
		text-align: center;
	}

	/* 제목 위 작은 라벨 */
	.lineup-eyebrow {
		display: block;
		margin-bottom: 0.85rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.22em;
		color: #a6845a;
	}

	.lineup-title {
		font-size: clamp(1.75rem, 3.5vw, 2.5rem);
		font-weight: 700;
		line-height: 1.2;
	}

	.lineup-subtitle {
		margin-top: 0.75rem;
		font-size: clamp(0.95rem, 1.4vw, 1.1rem);
		line-height: 1.7;
		color: #777;
	}

	.lineup-item {
		display: flex;
		align-items: center;
		gap: 3.5rem;
	}

	/* 짝수: 이미지|텍스트 / 홀수: 텍스트|이미지 */
	.lineup-item.reverse {
		flex-direction: row-reverse;
	}

	/* 교차 배치 시 텍스트를 이미지 반대쪽 바깥 끝단으로 정렬해 좌우 대칭을 맞춤 */
	.lineup-item:not(.reverse) .lineup-body {
		text-align: right;
	}

	.lineup-image {
		flex: 0 0 35%;
		aspect-ratio: 1 / 1;
		border-radius: 1.25rem;
		background-color: #f0ece6;
		background-size: cover;
		background-position: center;
	}

	.lineup-body {
		flex: 1;
		min-width: 0;
	}

	.lineup-name {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 700;
		line-height: 1.2;
	}

	.lineup-desc {
		margin-top: 1rem;
		font-size: clamp(0.95rem, 1.4vw, 1.1rem);
		line-height: 1.7;
		color: #555;
	}

	/* 라인업 → 카테고리 페이지 이동 버튼 */
	.lineup-link {
		display: inline-block;
		margin-top: 1.5rem;
		padding: 0.6rem 1.4rem;
		border: 1px solid #1a1a1a;
		border-radius: 999px;
		font-size: 0.9rem;
		font-weight: 600;
		color: #1a1a1a;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.lineup-link:hover {
		background: #1a1a1a;
		color: #fff;
	}

	/* 컴포넌트 사이 짧은 회색 구분선 */
	.lineup-divider {
		align-self: center;
		width: 64px;
		border: 0;
		border-top: 1px solid #ddd;
	}

	@media (max-width: 640px) {
		.lineup-item,
		.lineup-item.reverse {
			flex-direction: column;
			gap: 1.5rem;
		}

		.lineup-image {
			flex: none;
			width: 100%;
		}
	}

	/* ───────── 네이버 스마트스토어 CTA (다크 풀블리드) ───────── */
	.store-cta {
		background: #1a1a1a;
		color: #fff;
	}

	.store-cta-inner {
		max-width: 70%;
		margin: 0 auto;
		padding: 6rem 0;
		text-align: center;
	}

	.store-eyebrow {
		display: block;
		margin-bottom: 1rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.22em;
		color: #c9a978;
	}

	.store-title {
		font-size: clamp(1.75rem, 3.5vw, 2.75rem);
		font-weight: 700;
		line-height: 1.3;
	}

	.store-text {
		max-width: 40rem;
		margin: 1.25rem auto 0;
		font-size: clamp(0.95rem, 1.4vw, 1.1rem);
		line-height: 1.8;
		color: rgba(255, 255, 255, 0.7);
	}

	.store-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		margin-top: 2.25rem;
		padding: 0.9rem 1.8rem;
		border-radius: 999px;
		background: #fff;
		color: #1a1a1a;
		font-size: 0.95rem;
		font-weight: 600;
		transition:
			background-color 0.15s ease,
			transform 0.15s ease;
	}

	.store-btn:hover {
		background: rgba(255, 255, 255, 0.88);
		transform: translateY(-1px);
	}

	.store-mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 0.35rem;
		background: #03c75a;
		color: #fff;
		font-size: 0.85rem;
		font-weight: 800;
	}

	.store-arrow {
		transition: transform 0.15s ease;
	}

	.store-btn:hover .store-arrow {
		transform: translateX(3px);
	}

	@media (max-width: 768px) {
		.store-cta-inner {
			max-width: 85%;
			padding: 4.5rem 0;
		}
	}
</style>
