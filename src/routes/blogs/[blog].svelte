<script context="module">

	export const load = async ({ page }) => {
		const response = await get(`blogs?slug=${page.params.blog}`);

		if (response && response.length) {

    return {
        props: {
          blog: response[0],
					page
        },
        maxage: 0
      };
    }

    return {
      props: {
        blog: null,
				page
      }
    };
  };
</script>

<script>
	import { get } from '$lib/api';
  import marked from 'marked';
	import { setDisqus, resetDisqus } from '$lib/utils';
	import { config, disqusLoaded } from '$lib/store';
	import { filter, map, mergeMap, take } from 'rxjs';
	import { onMount } from 'svelte';
	export let blog;
	export let page;

	onMount(() => {
		config
			.pipe(
				mergeMap((config) =>
					disqusLoaded.pipe(
						filter((disqusLoaded) => !disqusLoaded),
						map(() => config)
					)
				),
				filter((config) => config && config.disqusSrc),
				take(1)
			)
			.subscribe((config) => {
				setDisqus(config)
					.pipe(take(1))
					.subscribe(() => {
						disqusLoaded.next(true);
					});
			});

		disqusLoaded.pipe(filter(Boolean), take(1)).subscribe(() => {
			resetDisqus(page);
		});
	});

</script>

<svelte:head>
	<title>{blog?.Title}</title>
</svelte:head>

<div class="container max-w-6xl">
  {#if blog}
	<h1 class="text-center text-4xl mt-8 pb-4">{blog.Title}</h1>

	<div class="content">
		{@html marked(blog.Content)}
	</div>

	<span class="date">{new Date(blog.created_at).toLocaleDateString()}</span>

	<div id="disqus_thread" />
{/if}


</div>

<style>
	.content {
		margin: 2rem 0 4rem 0;
	}

	.content :global(h2) {
		font-size: 1.6rem;
		font-weight: 600;
		color: #000;
	}

	.content :global(p) {
		font-size: 1.2rem;
		text-align: justify;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5rem 0;
		font-size: 1.2rem;
	}

	.date {
		text-align: right;
		margin-right: 0;
		margin-left: auto;
		display: block;
		color: var(--secondary-color);
	}
</style>
