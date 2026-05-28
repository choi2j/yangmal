<script lang="ts">
	import CategoryPage from '$lib/components/CategoryPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.category.name} | yangmal.kr</title>
</svelte:head>

<CategoryPage category={data.category} />
