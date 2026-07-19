<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Category } from '$lib/categories';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();

	let { category }: { category: Category } = $props();
</script>

<section class="hero">
	<div
		class="hero-inner"
		style="--hero-bg: url({category.hero}); --hero-bg-mobile: url({category.heroMobile});"
	>
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="hero-overlay" aria-hidden="true"></div>

		<div class="hero-text">
			<div class="hero-meta">
				<span class="hero-tag">NINESOCKS</span>
				<span class="hero-tag-divider" aria-hidden="true"></span>
				<span class="hero-tag-soft">{category.slug.toUpperCase()}</span>
			</div>

			<h1 class="hero-title">{i18n.pick(category.name)}</h1>
			<p class="hero-tagline">{i18n.pick(category.tagline)}</p>
			<p class="hero-desc">{i18n.pick(category.description[0])}</p>
		</div>
	</div>
</section>

<section class="catalog">
	<header class="catalog-header">
		<div class="catalog-title">
			<p class="eyebrow">LINEUP</p>
			<h2>{i18n.pick(category.name)} {i18n.t.category.lineupWord}</h2>
		</div>
		<p class="catalog-count">
			<span class="count-num">{String(category.items.length).padStart(2, '0')}</span>
			<span class="count-label">{i18n.t.category.items}</span>
		</p>
	</header>

	<ul class="card-grid">
		{#each category.items as item, i (item.slug)}
			<li>
				<a
					class="card"
					href={resolve('/product/[category]/[item]', {
						category: category.slug,
						item: item.slug
					})}
				>
					<div class="card-image">
						<img src={item.images[0]} alt={i18n.pick(item.name)} loading="lazy" />
						<span class="card-index" aria-hidden="true">
							{String(i + 1).padStart(2, '0')}
						</span>
					</div>
					<div class="card-body">
						<div class="card-text">
							<p class="card-cat">{category.slug.toUpperCase()}</p>
							<h3 class="card-name">{i18n.pick(item.name)}</h3>
						</div>
						<span class="card-cta">
							<span>VIEW</span>
							<span class="arrow" aria-hidden="true">→</span>
						</span>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	/* ───────── 공통 eyebrow (main / about / contact 와 동일) ───────── */
	.eyebrow {
		display: block;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.22em;
		color: #a6845a;
	}

	/* ───────── HERO (main hero 와 동일한 라운드 이미지 + 그라데이션) ───────── */
	.hero {
		max-width: 70%;
		margin: 2.5rem auto 0;
	}

	.hero-inner {
		position: relative;
		aspect-ratio: 16 / 9;
		min-height: 360px;
		border-radius: 1.25rem;
		overflow: hidden;
		isolation: isolate;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		background-image: var(--hero-bg);
		background-size: cover;
		background-position: center;
		z-index: -2;
		animation: kenburns 14s ease-out forwards;
	}

	@keyframes kenburns {
		from {
			transform: scale(1.06);
		}
		to {
			transform: scale(1);
		}
	}

	/* 하단을 어둡게 덮어 텍스트 가독성 확보 (main hero-overlay 동일 톤) */
	.hero-overlay {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.75) 0%,
			rgba(0, 0, 0, 0.35) 32%,
			rgba(0, 0, 0, 0) 62%
		);
	}

	.hero-text {
		position: absolute;
		left: 0;
		bottom: 0;
		max-width: 70%;
		padding: 2.5rem 3rem;
		color: #fff;
	}

	.hero-meta {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.hero-tag {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.28em;
		color: #d8b888;
	}

	.hero-tag-divider {
		width: 28px;
		height: 1px;
		background: rgba(255, 255, 255, 0.5);
	}

	.hero-tag-soft {
		font-size: 0.75rem;
		letter-spacing: 0.24em;
		color: rgba(255, 255, 255, 0.75);
	}

	.hero-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		line-height: 1.15;
	}

	.hero-tagline {
		margin-top: 0.85rem;
		font-size: clamp(1rem, 1.5vw, 1.2rem);
		color: rgba(255, 255, 255, 0.9);
	}

	.hero-desc {
		max-width: 38rem;
		margin-top: 0.6rem;
		font-size: 0.98rem;
		line-height: 1.8;
		color: rgba(255, 255, 255, 0.78);
	}

	/* ───────── CATALOG ───────── */
	.catalog {
		max-width: 70%;
		margin: 5rem auto 7rem;
	}

	.catalog-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
		padding-bottom: 1.25rem;
		border-bottom: 1px solid #1a1a1a;
		margin-bottom: 3rem;
	}

	.catalog-title {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.catalog-header h2 {
		font-size: clamp(1.5rem, 2.6vw, 2rem);
		font-weight: 700;
		line-height: 1.2;
	}

	.catalog-count {
		display: inline-flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	.count-num {
		font-size: 1.5rem;
		font-weight: 700;
		color: #1a1a1a;
	}

	.count-label {
		font-size: 0.72rem;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: #999;
		font-weight: 600;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3.5rem 2.25rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		color: inherit;
	}

	.card-image {
		position: relative;
		aspect-ratio: 1 / 1;
		border-radius: 1rem;
		overflow: hidden;
		background: #f0ece6;
		transition: transform 0.45s cubic-bezier(0.2, 0.6, 0.2, 1);
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s cubic-bezier(0.2, 0.6, 0.2, 1);
	}

	.card:hover .card-image {
		transform: translateY(-6px);
	}

	.card:hover .card-image img {
		transform: scale(1.04);
	}

	.card-index {
		position: absolute;
		top: 0.85rem;
		left: 0.85rem;
		padding: 0.25rem 0.55rem;
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		font-weight: 600;
		color: #1a1a1a;
		background: #fff;
		border-radius: 999px;
	}

	.card-body {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
	}

	.card-text {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.card-cat {
		font-size: 0.68rem;
		letter-spacing: 0.24em;
		font-weight: 700;
		text-transform: uppercase;
		color: #a6845a;
	}

	.card-name {
		font-size: 1.1rem;
		font-weight: 700;
		color: #1a1a1a;
	}

	.card-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding-bottom: 3px;
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		font-weight: 600;
		text-transform: uppercase;
		color: #1a1a1a;
		border-bottom: 1px solid #1a1a1a;
		transition:
			gap 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease;
	}

	.card:hover .card-cta {
		gap: 0.8rem;
		color: #a6845a;
		border-color: #a6845a;
	}

	/* ───────── 반응형 ───────── */
	@media (max-width: 768px) {
		.hero,
		.catalog {
			max-width: 85%;
		}

		/* 모바일: main hero와 동일하게 1:1 라인업 이미지로 전환 (가로 넘침 방지) */
		.hero-inner {
			aspect-ratio: 1 / 1;
			min-height: 0;
		}

		.hero-bg {
			background-image: var(--hero-bg-mobile);
		}

		.hero-text {
			max-width: 100%;
			padding: 1.75rem;
		}

		.card-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 2.5rem 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.card-grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}
</style>
