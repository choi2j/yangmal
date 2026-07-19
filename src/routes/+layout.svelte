<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { initI18n } from '$lib/i18n/context.svelte';

	import '$lib/styles/app.css';

	let { children, data } = $props();

	// 서버(hooks)에서 결정한 언어로 i18n 컨텍스트 초기화 → 하위 모든 컴포넌트가 공유한다.
	initI18n(data.lang);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />

{@render children()}

<Footer />
