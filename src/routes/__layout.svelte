<script context="module">
	import { get } from '$lib/api';

	export const load = async ({ fetch, page }) => {
    const response = await get(`pages`);

		if (response) {
      pages.next(response)
			return {
				props: {
					allPages: response
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
  import { autoLogin, user, logout, pages } from '$lib/store';
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

