<script context="module">
	export const load = async ({ page }) => {
		const responsePages = await get(`pages`);
		const responseCategories = await get(`categories`);
		const responseConfig = await get(`config`);

		if (responsePages && responseConfig && responseCategories) {
			pages.next(responsePages);
			config.next(responseConfig);
			categories.next(responseCategories);

			return {
				props: {
					allPages: responsePages,
					allCategories: responseCategories
				}
			};
		}

		return {
			error: new Error()
		};
	};
</script>

<script>
	import '../app.css';
	import { get } from '$lib/api';
	import { onMount } from 'svelte';
	import { autoLogin, config, user, logout, pages, categories } from '$lib/store';
	import Header from '$lib/components/Header.svelte';

	export let loaded = false;
	export let sidebarOpen = false;
	export let allPages = [];
	export let allCategories = [];
	$: primaryColor = '--primary-color:' + (config.value?.primaryColor || '#fff');

	onMount(() => {
		loaded = autoLogin();
	});

	const togleSidebar = () => {
		sidebarOpen = !sidebarOpen;
	};
</script>

<div style={primaryColor} class="font-sans">
	<Header
		{sidebarOpen}
		user={$user}
		pages={allPages}
		categories={allCategories}
		on:logout={logout}
		on:togglesidebar={togleSidebar}
	/>

	<main class:fixed={sidebarOpen} on:click={() => (sidebarOpen = false)}>
		<slot />
	</main>

	<footer />
</div>

<style>
	.fixed {
		position: fixed;
		min-width: 100%;
	}
</style>
