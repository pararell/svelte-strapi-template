<script context="module">
	import { get } from '$lib/api';

	export const load = async ({ page }) => {
		const response = await get(`contents?slug=home`);

		if (response && response.length) {
			const result = response[0];

			return {
				props: {
					content: result.content,
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
  export let content = null;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="w-full">
	{#if content}
		{@html content}
	{/if}
</div>
