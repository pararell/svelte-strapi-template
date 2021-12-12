<script context="module">
	import { get } from '$lib/api';

	export const load = async ({ page }) => {
		const response = await get(`contents?filters[slug]=home&populate=*`);

		if (response && response.data) {
			const result = response.data[0]?.attributes;

			return {
				props: {
					content: result?.content
				}
			};
		}

		return {
			props: {
				content: 'Something went wrong',
			}
		};
	};
</script>

<script>
	import { pages } from '$lib/store';
  export let content = null;
	$: title = pages.value?.find(p => p.attributes?.slug === 'home')?.metaTitle || 'Home';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="w-full">
	{#if content}
		{@html content}
	{/if}
</div>
