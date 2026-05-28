<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>ABOUT | yangmal.kr — NINESOCKS</title>
</svelte:head>

<section class="hero">
	<div class="hero-inner">
		<p class="eyebrow">ABOUT NINESOCKS</p>
		<h1>
			<span class="line">기능성 양말의</span>
			<span class="line">미래를 만듭니다.</span>
		</h1>
		<p class="lead">
			나인양말은 기능성 양말을 중심으로 제품을 개발하며,
			양말의 미래를 위해 끊임없이 노력하고 있습니다.
			소비자의 입장에서 최고의 품질을 구현하는 것,
			그것이 나인양말이 일하는 방식입니다.
		</p>
	</div>
</section>

<section class="story">
	<div class="story-grid">
		<div class="story-left">
			<p class="eyebrow">OUR STORY</p>
			<h2>20년의 노하우,<br />그리고 기능성.</h2>
		</div>
		<div class="story-right">
			<p>
				2001년부터 양말 산업에 몸담아 온 노하우를 바탕으로 2019년 나인양말을 창업했습니다.
				남들이 하지 않던 당뇨양말을 비롯해 한방·황토·머드 양말 등 기능성 제품을
				BYC, 미국 Dr. Leonard's, 스페인 Vibra confort 등 국내외 주요 브랜드에
				납품하며 기능성 양말 분야를 선도해 왔습니다.
			</p>
		</div>
	</div>
</section>

<section class="values">
	<div class="values-inner">
		<header class="values-header">
			<p class="eyebrow">OUR PRINCIPLES</p>
			<h2>우리가 양말을 만드는 방식</h2>
		</header>

		<ul class="values-grid">
			<li>
				<span class="num">01</span>
				<h3>기능성에 집중합니다</h3>
				<p>
					<strong>한방·황토·머드·죽탄</strong> 등 천연 소재와 <strong>나노실버·원적외선</strong>
					섬유를 활용해, 단순히 신는 양말이 아닌 <strong>발의 건강을 지키는 양말</strong>을
					만듭니다.
				</p>
			</li>
			<li>
				<span class="num">02</span>
				<h3>검증된 기술력으로 만듭니다</h3>
				<p>
					항균·소취 효과를 가진 무독성 섬유 조성물 <strong>특허(제10-0887285호)</strong>와
					<strong>20년간 축적된 노하우</strong>를 바탕으로, 한 켤레의 품질을 일관되게
					유지합니다.
				</p>
			</li>
			<li>
				<span class="num">03</span>
				<h3>세계가 인정한 품질입니다</h3>
				<p>
					<strong>미국·캐나다·스페인</strong> 등 글로벌 시장에 기능성 양말을 수출하고,
					<strong>BYC 최우수 협력업체</strong>로 선정되며 국내외에서 품질을 인정받아 왔습니다.
				</p>
			</li>
		</ul>
	</div>
</section>

<section class="contact-cta">
	<div class="contact-cta-inner">
		<p class="eyebrow on-dark">GET IN TOUCH</p>
		<h2>함께 만들어 갈 협업을 기다립니다.</h2>
		<p class="cta-text">OEM·도매·협업 등 사업 관련 문의는 언제든 환영합니다.</p>
		<a class="cta-btn" href={resolve('/contact')}>
			<span>사업 문의하기</span>
			<span class="arrow" aria-hidden="true">→</span>
		</a>
	</div>
</section>

<style>
	/* ───────── 공통: 골드 라벨 (main 페이지 lineup-eyebrow 와 동일) ───────── */
	.eyebrow {
		display: block;
		margin-bottom: 1rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.22em;
		color: #a6845a;
	}

	/* ───────── HERO ───────── */
	.hero {
		max-width: 70%;
		margin: 6rem auto;
		text-align: center;
	}

	.hero h1 {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		line-height: 1.25;
	}

	.hero h1 .line {
		display: block;
	}

	.hero .lead {
		max-width: 44rem;
		margin: 1.75rem auto 0;
		font-size: clamp(1rem, 1.6vw, 1.2rem);
		line-height: 1.9;
		color: #555;
	}

	/* ───────── OUR STORY (좌: 제목 / 우: 본문) ───────── */
	.story {
		max-width: 70%;
		margin: 6rem auto;
	}

	.story-grid {
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		gap: 3.5rem;
		align-items: start;
		padding-top: 3.5rem;
		border-top: 1px solid #eee;
	}

	.story-left h2 {
		font-size: clamp(1.6rem, 3vw, 2.25rem);
		font-weight: 700;
		line-height: 1.3;
	}

	.story-right p {
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		line-height: 1.9;
		color: #555;
	}

	/* ───────── OUR PRINCIPLES (3열 카드) ───────── */
	.values {
		max-width: 70%;
		margin: 7rem auto;
	}

	.values-header {
		margin-bottom: 3.5rem;
		text-align: center;
	}

	.values-header h2 {
		font-size: clamp(1.6rem, 3.2vw, 2.4rem);
		font-weight: 700;
		line-height: 1.2;
	}

	.values-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2.5rem;
	}

	.values-grid li {
		padding-top: 1.75rem;
		border-top: 2px solid #1a1a1a;
	}

	.values-grid .num {
		display: block;
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: #a6845a;
	}

	.values-grid h3 {
		margin-top: 1rem;
		font-size: clamp(1.15rem, 1.8vw, 1.4rem);
		font-weight: 700;
		line-height: 1.4;
	}

	.values-grid p {
		margin-top: 1rem;
		font-size: 0.98rem;
		line-height: 1.8;
		color: #555;
	}

	.values-grid strong {
		font-weight: 700;
		color: #1a1a1a;
	}

	/* ───────── GET IN TOUCH (다크 풀블리드 + main hero-cta 스타일 버튼) ───────── */
	.contact-cta {
		background: #1a1a1a;
		color: #fff;
	}

	.contact-cta-inner {
		max-width: 70%;
		margin: 0 auto;
		padding: 6rem 0;
		text-align: center;
	}

	.eyebrow.on-dark {
		color: #c9a978;
	}

	.contact-cta h2 {
		font-size: clamp(1.75rem, 3.5vw, 2.75rem);
		font-weight: 700;
		line-height: 1.25;
	}

	.cta-text {
		margin-top: 1rem;
		font-size: clamp(0.95rem, 1.4vw, 1.1rem);
		color: rgba(255, 255, 255, 0.7);
	}

	.cta-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		margin-top: 2rem;
		padding: 0.85rem 1.8rem;
		border-radius: 999px;
		background: #fff;
		color: #1a1a1a;
		font-size: 0.95rem;
		font-weight: 600;
		transition:
			background-color 0.15s ease,
			transform 0.15s ease;
	}

	.cta-btn:hover {
		background: rgba(255, 255, 255, 0.85);
		transform: translateY(-1px);
	}

	.cta-btn .arrow {
		transition: transform 0.15s ease;
	}

	.cta-btn:hover .arrow {
		transform: translateX(3px);
	}

	/* ───────── 반응형 ───────── */
	@media (max-width: 768px) {
		.hero,
		.story,
		.values,
		.contact-cta-inner {
			max-width: 85%;
		}

		.story-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.values-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
