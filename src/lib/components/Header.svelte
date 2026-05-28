<script lang="ts">
	import { resolve } from '$app/paths';

	let productOpen = $state(false);

	const categories = [
		{ label: '등산양말', slug: 'hiking' },
		{ label: '학생양말', slug: 'student' },
		{ label: '남성양말', slug: 'men' },
		{ label: '여성양말', slug: 'women' }
	];

	function closeOnLeave(node: HTMLElement) {
		const close = () => (productOpen = false);
		node.addEventListener('mouseleave', close);
		return { destroy: () => node.removeEventListener('mouseleave', close) };
	}
</script>

<header class="header" use:closeOnLeave>
	<div class="header-inner">
		<div class="header-content">
			<a class="logo" href={resolve('/')}>
				<span class="logo-name">yangmal</span><span class="logo-tld">.kr</span>
			</a>

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
				{#each categories as category (category.slug)}
					<li>
						<a href={resolve('/product/[category]', { category: category.slug })}>
							{category.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</header>
