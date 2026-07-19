<script lang="ts">
	import { resolve } from '$app/paths';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
</script>

<svelte:head>
	<title>ABOUT | yangmal.kr — NINESOCKS</title>
</svelte:head>

<section class="hero">
	<div class="hero-inner">
		<p class="eyebrow">ABOUT NINESOCKS</p>
		<h1>
			{#each i18n.t.about.heroTitle as line (line)}
				<span class="line">{line}</span>
			{/each}
		</h1>
		<p class="lead">
			{i18n.t.about.lead}
		</p>
	</div>
</section>

<section class="story">
	<div class="story-grid">
		<div class="story-left">
			<p class="eyebrow">OUR STORY</p>
			<h2>
				{#each i18n.t.about.storyTitle as line, i (line)}
					{#if i > 0}<br />{/if}{line}
				{/each}
			</h2>
		</div>
		<div class="story-right">
			<p>
				{i18n.t.about.storyText}
			</p>
		</div>
	</div>
</section>

<section class="values">
	<div class="values-inner">
		<header class="values-header">
			<p class="eyebrow">OUR PRINCIPLES</p>
			<h2>{i18n.t.about.principlesHeading}</h2>
		</header>

		<ul class="values-grid">
			{#each i18n.t.about.principles as principle, i (i)}
				<li>
					<span class="num">{String(i + 1).padStart(2, '0')}</span>
					<h3>{principle.title}</h3>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<p>{@html principle.descHtml}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="contact-cta">
	<div class="contact-cta-inner">
		<p class="eyebrow on-dark">GET IN TOUCH</p>
		<h2>{i18n.t.about.ctaTitle}</h2>
		<p class="cta-text">{i18n.t.about.ctaText}</p>
		<a class="cta-btn" href={resolve('/contact')}>
			<span>{i18n.t.about.ctaBtn}</span>
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

	.values-grid :global(strong) {
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
