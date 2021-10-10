<script context="module">
	import { get } from '$lib/api';

	export const load = async ({ page }) => {
    const responsePages = await get(`pages`);
		const responseCategories = await get(`categories`);
		const responseConfig = await get(`config`);

		if (responsePages && responseConfig && responseCategories) {
      pages.next(responsePages)
			config.next(responseConfig)
			categories.next(responseCategories)

			return {
				props: {
					allPages: responsePages,
					allCategories: responseCategories
				},
				maxage: 0
			};
		}

		return {
			error: new Error()
		};
	};
</script>

<script>
	import { onMount } from 'svelte';
  import { Loading } from 'attractions';
  import { autoLogin, config, user, logout, pages, categories } from '$lib/store';
	import "../app.scss";
  import Header from '../lib/components/Header.svelte';
  export let loaded = false;
	export let sidebarOpen = false;
  export let allPages = [];
	export let allCategories = [];

	onMount(() => {
		loaded = autoLogin();
	})

	const togleSidebar = () => {
		sidebarOpen = !sidebarOpen;
	}
</script>

{#if !loaded}
<div class="loader">
	<Loading>
</Loading></div>
{/if}

{#if loaded}
<Header 
	sidebarOpen="{sidebarOpen}" 
	user="{$user}" 
	pages="{allPages}" 
	categories="{allCategories}"
	on:logout="{logout}"
	on:togglesidebar="{togleSidebar}"
	/>
	<main class:fixed="{sidebarOpen}">
		<slot></slot>
  </main>

	<footer></footer>
{/if}

<style lang="scss">

	.fixed {
		position: fixed;
		min-width: 100%;
	}

</style>

