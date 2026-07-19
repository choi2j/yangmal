<script lang="ts">
	import { resolve } from '$app/paths';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();

	let productOpen = $state(false);

	const categorySlugs = ['hiking', 'student', 'men', 'women'] as const;

	function closeOnLeave(node: HTMLElement) {
		const close = () => (productOpen = false);
		node.addEventListener('mouseleave', close);
		return { destroy: () => node.removeEventListener('mouseleave', close) };
	}
</script>

<header class="header" use:closeOnLeave>
	<div class="header-inner">
		<div class="header-content">
			<div class="header-left">
				<a class="logo" href={resolve('/')}>
					<span class="logo-name">yangmal</span><span class="logo-tld">.kr</span>
				</a>

				<div class="lang-switch" role="group" aria-label="Language">
					<button
						type="button"
						class:active={i18n.lang === 'en'}
						aria-pressed={i18n.lang === 'en'}
						onclick={() => i18n.set('en')}>EN</button
					>
					<span class="lang-sep" aria-hidden="true">|</span>
					<button
						type="button"
						class:active={i18n.lang === 'ko'}
						aria-pressed={i18n.lang === 'ko'}
						onclick={() => i18n.set('ko')}>KR</button
					>
				</div>
			</div>

			<nav class="nav-main">
				<ul>
					<li><a href={resolve('/about')}>ABOUT</a></li>
					<li>
						<button
							type="button"
							class="nav-product"
							aria-haspopup="true"
							aria-expanded={productOpen}
							onmouseenter={() => (productOpen = true)}
							onclick={() => (productOpen = !productOpen)}
						>
							PRODUCT
						</button>
					</li>
					<li><a href={resolve('/contact')}>CONTACT</a></li>
				</ul>
			</nav>
		</div>
	</div>

	<div class="dropdown" class:is-open={productOpen}>
		<div class="dropdown-content">
			<ul>
				{#each categorySlugs as slug (slug)}
					<li>
						<a href={resolve('/product/[category]', { category: slug })}>
							{i18n.t.nav.categories[slug]}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</header>

<style>
	/* 로고 + 언어 전환을 좌측 그룹으로 묶어, 토글이 로고 우측에 오도록 한다 */
	.header-left {
		display: flex;
		align-items: center;
		gap: 1.1rem;
	}

	.lang-switch {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.06em;
	}

	.lang-switch button {
		color: #bbb;
		transition: color 0.15s ease;
	}

	.lang-switch button:hover {
		color: #666;
	}

	.lang-switch button.active {
		color: #000;
		font-weight: 700;
	}

	.lang-sep {
		color: #ddd;
	}

	@media (max-width: 768px) {
		.header-left {
			gap: 0.75rem;
		}

		.lang-switch {
			font-size: 0.72rem;
			gap: 0.3rem;
		}
	}
</style>
