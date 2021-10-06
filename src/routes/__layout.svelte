<script context="module">
	import { get } from '$lib/api';

	export const load = async ({ fetch, page }) => {
    const responsePages = await get(`pages`);
		const responseConfig = await get(`config`);

		if (responsePages && responseConfig) {
      pages.next(responsePages)
			config.next(responseConfig)

			return {
				props: {
					allPages: responsePages
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
  import { autoLogin, config, user, logout, pages } from '$lib/store';
	import "../app.scss";
  import Header from '../lib/components/Header.svelte';
  export let loaded = false;
  export let allPages = [];

	onMount(() => {
		loaded = autoLogin();
	})
</script>

{#if !loaded}
<div class="loader">
	<Loading>
</Loading></div>
{/if}

{#if loaded}
<Header user="{$user}" pages="{allPages}" on:logout="{logout}"/>
	<main>
		<slot></slot>
  </main>

	<footer></footer>
{/if}

