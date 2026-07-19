<script lang="ts">
	import CategoryPage from '$lib/components/CategoryPage.svelte';
	import { useI18n } from '$lib/i18n/context.svelte';
	import type { PageProps } from './$types';

	const i18n = useI18n();

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{i18n.pick(data.category.name)} | yangmal.kr</title>
</svelte:head>

<CategoryPage category={data.category} />
