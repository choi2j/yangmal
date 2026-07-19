<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { formatPrice } from '$lib/categories';
	import { useI18n } from '$lib/i18n/context.svelte';
	import type { PageProps } from './$types';

	const i18n = useI18n();

	let { data }: PageProps = $props();
	const category = $derived(data.category);
	const item = $derived(data.item);

	let activeImage = $state(0);
	const tabs = [
		{ id: 'detail', label: () => i18n.t.product.tabDetail },
		{ id: 'review', label: () => i18n.t.product.tabReview },
		{ id: 'qna', label: () => i18n.t.product.tabQna }
	] as const;

	let activeTab = $state<(typeof tabs)[number]['id']>('detail');

	// 사이트 헤더가 sticky(top:0)라 탭 내비를 그 아래에 붙이고, 스크롤 보정에도 사용
	let headerHeight = $state(0);

	const hasPrice = $derived(item.price !== null && item.salePrice !== null);
	const discountPct = $derived(
		item.price !== null && item.salePrice !== null
			? (item.discountRate ?? Math.round(((item.price - item.salePrice) / item.price) * 100))
			: 0
	);

	function scrollToSection(id: string) {
		const el = document.getElementById(`section-${id}`);
		if (!el) return;
		const nav = document.querySelector('.tab-nav') as HTMLElement | null;
		const offset = headerHeight + (nav?.offsetHeight ?? 56) + 8;
		const top = el.getBoundingClientRect().top + window.scrollY - offset;
		window.scrollTo({ top, behavior: 'smooth' });
	}

	function handleTabClick(id: (typeof tabs)[number]['id']) {
		activeTab = id;
		scrollToSection(id);
	}

	onMount(() => {
		const header = document.querySelector('.header') as HTMLElement | null;
		headerHeight = header?.offsetHeight ?? 0;

		const sectionEls = tabs
			.map((t) => document.getElementById(`section-${t.id}`))
			.filter((el): el is HTMLElement => el !== null);

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) {
					const id = visible[0].target.id.replace('section-', '') as typeof activeTab;
					activeTab = id;
				}
			},
			{ rootMargin: '-30% 0px -60% 0px', threshold: [0.1, 0.5, 0.9] }
		);

		sectionEls.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>{i18n.pick(item.name)} | {i18n.pick(category.name)} | yangmal.kr</title>
</svelte:head>

<nav class="crumb" aria-label="breadcrumb">
	<div class="crumb-inner">
		<a href={resolve('/')}>{i18n.t.product.home}</a>
		<span class="crumb-sep" aria-hidden="true">/</span>
		<a href={resolve('/product/[category]', { category: category.slug })}
			>{i18n.pick(category.name)}</a
		>
		<span class="crumb-sep" aria-hidden="true">/</span>
		<span class="crumb-current">{i18n.pick(item.name)}</span>
	</div>
</nav>

<section class="top">
	<div class="top-inner">
		<div class="gallery">
			<ul class="thumbs" aria-label={i18n.t.product.thumbsLabel}>
				{#each item.images as image, i (i)}
					<li>
						<button
							type="button"
							class="thumb"
							class:active={i === activeImage}
							aria-label={i18n.t.product.imageAlt(i + 1)}
							onclick={() => (activeImage = i)}
						>
							<img src={image} alt="" class:cover={i < 2} />
						</button>
					</li>
				{/each}
			</ul>

			<div class="main-image">
				<img
					src={item.images[activeImage]}
					alt={i18n.pick(item.name)}
					class:cover={activeImage < 2}
				/>
			</div>
		</div>

		<aside class="info">
			<p class="info-cat">
				<a href={resolve('/product/[category]', { category: category.slug })}>
					{category.slug.toUpperCase()} / {i18n.pick(category.name)}
				</a>
			</p>

			<h1 class="info-title">{i18n.pick(item.name)}</h1>
			<p class="info-tagline">{i18n.pick(category.tagline)}</p>

			<dl class="prices">
				{#if hasPrice}
					<div class="price-row">
						<dt>{i18n.t.product.listPrice}</dt>
						<dd class="strike">{formatPrice(item.price as number, i18n.lang)}</dd>
					</div>
					<div class="price-row sale">
						<dt>{i18n.t.product.salePrice}</dt>
						<dd class="accent">
							<span class="amount">{formatPrice(item.salePrice as number, i18n.lang)}</span>
							{#if discountPct > 0}
								<span class="badge">−{discountPct}%</span>
							{/if}
						</dd>
					</div>
				{:else}
					<div class="price-row">
						<dt>{i18n.t.product.listPrice}</dt>
						<dd>{i18n.t.product.tbd}</dd>
					</div>
				{/if}

				{#if item.shippingFee != null}
					<div class="price-row">
						<dt>{i18n.t.product.shipping}</dt>
						<dd>{formatPrice(item.shippingFee, i18n.lang)}</dd>
					</div>
				{/if}
			</dl>

			{#if category.slug === 'hiking'}
				<!-- 외부 스마트스토어 링크라 resolve() 대상이 아님 -->
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a class="buy-btn" href={item.smartStoreUrl} target="_blank" rel="noopener noreferrer">
					<span class="buy-mark" aria-hidden="true">N</span>
					<span class="buy-label">{i18n.t.product.buy}</span>
					<span class="buy-arrow" aria-hidden="true">→</span>
				</a>

				<p class="buy-note">{i18n.t.product.buyNote}</p>
			{:else}
				<button class="buy-btn" type="button" disabled>
					<span class="buy-label">{i18n.t.product.comingSoon}</span>
				</button>

				<p class="buy-note">{i18n.t.product.comingSoonNote}</p>
			{/if}
		</aside>
	</div>
</section>

<nav class="tab-nav" aria-label={i18n.t.product.tabNavLabel} style="top: {headerHeight}px;">
	<div class="tab-nav-inner">
		{#each tabs as tab (tab.id)}
			<button
				type="button"
				class="tab"
				class:active={activeTab === tab.id}
				onclick={() => handleTabClick(tab.id)}
			>
				{tab.label()}
			</button>
		{/each}
	</div>
</nav>

<section id="section-detail" class="long-section">
	<div class="section-inner">
		<header class="section-header">
			<p class="eyebrow">DETAIL</p>
			<h2>{i18n.t.product.tabDetail}</h2>
		</header>
		{#if item.detailImages.length > 0}
			<div class="detail-images">
				{#each item.detailImages as image, i (i)}
					<img
						src={image}
						alt={i18n.t.product.detailAlt(i18n.pick(item.name), i + 1)}
						loading="lazy"
					/>
				{/each}
			</div>
		{:else}
			<div class="section-empty">
				<p>{i18n.t.product.detailEmpty}</p>
			</div>
		{/if}
	</div>
</section>

<section id="section-review" class="long-section alt">
	<div class="section-inner">
		<header class="section-header">
			<p class="eyebrow">REVIEW</p>
			<h2>{i18n.t.product.tabReview}</h2>
		</header>
		<div class="section-empty">
			<p>{i18n.t.product.reviewEmpty}</p>
		</div>
	</div>
</section>

<section id="section-qna" class="long-section">
	<div class="section-inner">
		<header class="section-header">
			<p class="eyebrow">Q &amp; A</p>
			<h2>{i18n.t.product.tabQna}</h2>
		</header>
		<div class="section-empty">
			<p>{i18n.t.product.qnaEmpty}</p>
		</div>
	</div>
</section>

<style>
	/* ───────── 공통 eyebrow (main / about / category 와 동일) ───────── */
	.eyebrow {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.22em;
		color: #a6845a;
	}

	/* ───────── Breadcrumb ───────── */
	.crumb {
		border-bottom: 1px solid #eee;
	}

	.crumb-inner {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		max-width: 70%;
		margin: 0 auto;
		padding: 1rem 0;
		font-size: 0.72rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #999;
		font-weight: 600;
	}

	.crumb a {
		color: #777;
		transition: color 0.2s ease;
	}

	.crumb a:hover {
		color: #a6845a;
	}

	.crumb-sep {
		color: #ccc;
	}

	.crumb-current {
		color: #1a1a1a;
		font-weight: 700;
	}

	/* ───────── Top: Gallery + Info ───────── */
	.top-inner {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: 4rem;
		align-items: start;
		max-width: 70%;
		margin: 0 auto;
		padding: 3.5rem 0 5rem;
	}

	.gallery {
		display: grid;
		grid-template-columns: 88px 1fr;
		gap: 1.25rem;
		align-items: start;
	}

	.thumbs {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.thumb {
		position: relative;
		display: block;
		width: 88px;
		height: 88px;
		padding: 0;
		overflow: hidden;
		border-radius: 0.5rem;
		border: 1px solid #eee;
		cursor: pointer;
		transition: border-color 0.2s ease;
	}

	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}

	/* 대표 이미지(1·2번째)는 정사각형을 꽉 채우도록 crop 처리 */
	.thumb img.cover,
	.main-image img.cover {
		object-fit: cover;
	}

	.thumb:hover {
		border-color: #999;
	}

	.thumb.active {
		border-color: #1a1a1a;
	}

	.main-image {
		aspect-ratio: 1 / 1;
		overflow: hidden;
		border-radius: 1rem;
	}

	.main-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding-top: 0.5rem;
	}

	.info-cat a {
		display: inline-block;
		font-size: 0.7rem;
		letter-spacing: 0.22em;
		font-weight: 700;
		text-transform: uppercase;
		color: #a6845a;
		border-bottom: 1px solid transparent;
		padding-bottom: 2px;
		transition: border-color 0.2s ease;
	}

	.info-cat a:hover {
		border-color: #a6845a;
	}

	.info-title {
		font-size: clamp(1.75rem, 3.2vw, 2.5rem);
		font-weight: 700;
		line-height: 1.2;
		color: #1a1a1a;
	}

	.info-tagline {
		font-size: 1rem;
		color: #555;
		line-height: 1.7;
	}

	.prices {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		margin-top: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid #1a1a1a;
	}

	.price-row {
		display: grid;
		grid-template-columns: 5.5rem 1fr;
		align-items: baseline;
		gap: 1rem;
	}

	.price-row dt {
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #999;
		font-weight: 600;
	}

	.price-row dd {
		font-size: 1.0625rem;
		font-weight: 600;
		color: #1a1a1a;
	}

	.price-row dd.strike {
		color: #999;
		font-weight: 500;
		text-decoration: line-through;
	}

	.price-row.sale dd {
		display: inline-flex;
		align-items: baseline;
		gap: 0.85rem;
	}

	.price-row.sale dd .amount {
		font-size: 1.625rem;
		font-weight: 700;
		color: #a6845a;
	}

	.price-row.sale dd .badge {
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		font-weight: 700;
		color: #fff;
		background-color: #a6845a;
		padding: 0.2rem 0.6rem;
		border-radius: 999px;
	}

	.buy-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.85rem;
		margin-top: 1.75rem;
		padding: 1.15rem 1.5rem;
		border-radius: 999px;
		background-color: #1a1a1a;
		color: #fff;
		font-size: 0.92rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		transition:
			background-color 0.25s ease,
			gap 0.25s ease;
	}

	.buy-btn:hover {
		background-color: #a6845a;
		gap: 1.1rem;
	}

	.buy-btn:disabled {
		background-color: #d6d2cc;
		color: #777;
		cursor: not-allowed;
	}

	.buy-btn:disabled:hover {
		background-color: #d6d2cc;
		gap: 0.85rem;
	}

	.buy-mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.625rem;
		height: 1.625rem;
		font-size: 0.85rem;
		font-weight: 800;
		color: #1a1a1a;
		background-color: #fff;
		border-radius: 0.35rem;
		flex-shrink: 0;
	}

	.buy-arrow {
		transition: transform 0.3s ease;
	}

	.buy-btn:hover .buy-arrow {
		transform: translateX(4px);
	}

	.buy-note {
		font-size: 0.8rem;
		color: #999;
		line-height: 1.7;
	}

	/* ───────── Tab nav (헤더 아래 sticky) ───────── */
	.tab-nav {
		position: sticky;
		z-index: 90;
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: saturate(180%) blur(14px);
		-webkit-backdrop-filter: saturate(180%) blur(14px);
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}

	.tab-nav-inner {
		display: flex;
		max-width: 70%;
		margin: 0 auto;
	}

	.tab {
		position: relative;
		flex: 1;
		padding: 1.1rem 0.5rem;
		font-size: 0.82rem;
		letter-spacing: 0.16em;
		font-weight: 600;
		color: #999;
		text-transform: uppercase;
		transition: color 0.25s ease;
	}

	.tab::after {
		content: '';
		position: absolute;
		left: 50%;
		right: 50%;
		bottom: -1px;
		height: 2px;
		background-color: #1a1a1a;
		transition:
			left 0.3s ease,
			right 0.3s ease;
	}

	.tab:hover {
		color: #1a1a1a;
	}

	.tab.active {
		color: #1a1a1a;
	}

	.tab.active::after {
		left: 0;
		right: 0;
	}

	/* ───────── Long sections ───────── */
	.long-section {
		padding: 5.5rem 0;
		scroll-margin-top: 140px;
	}

	.long-section.alt {
		background-color: #f7f5f1;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}

	.section-inner {
		max-width: 70%;
		margin: 0 auto;
	}

	.section-header {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-bottom: 1.25rem;
		margin-bottom: 3rem;
		border-bottom: 1px solid #1a1a1a;
	}

	.section-header h2 {
		font-size: clamp(1.5rem, 2.6vw, 2rem);
		font-weight: 700;
		line-height: 1.2;
		color: #1a1a1a;
	}

	.section-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 280px;
		border: 1px dashed #ddd;
		border-radius: 1rem;
		color: #bbb;
		font-size: 0.95rem;
		letter-spacing: 0.02em;
	}

	.detail-images {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.detail-images img {
		width: 50%;
		height: auto;
		display: block;
		border-radius: 1rem;
	}

	/* ───────── 반응형 ───────── */
	@media (max-width: 960px) {
		.crumb-inner,
		.top-inner,
		.tab-nav-inner,
		.section-inner {
			max-width: 85%;
		}

		.top-inner {
			grid-template-columns: 1fr;
			gap: 2.5rem;
			padding: 2.5rem 0 3.5rem;
		}

		.gallery {
			grid-template-columns: 72px 1fr;
			gap: 0.85rem;
		}

		.thumb {
			width: 72px;
			height: 72px;
		}

		.long-section {
			padding: 4rem 0;
		}

		.section-header {
			margin-bottom: 2rem;
		}
	}

	@media (max-width: 640px) {
		.gallery {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}

		.thumbs {
			flex-direction: row;
			overflow-x: auto;
			padding-bottom: 0.25rem;
			order: 2;
		}

		.thumb {
			flex: 0 0 64px;
			width: 64px;
			height: 64px;
		}

		.main-image {
			order: 1;
		}

		.tab {
			font-size: 0.72rem;
			letter-spacing: 0.12em;
			padding: 1rem 0.25rem;
		}

		.price-row {
			grid-template-columns: 4.5rem 1fr;
			gap: 0.75rem;
		}

		.price-row.sale dd .amount {
			font-size: 1.375rem;
		}

		.buy-btn {
			padding: 1.05rem 1rem;
			font-size: 0.85rem;
		}

		.detail-images img {
			width: 85%;
		}
	}
</style>
