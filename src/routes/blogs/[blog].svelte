<script context="module">

	export const load = async ({ page }) => {
		const response = await get(`blogs?filters[slug]=${page.params.blog}`);

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
  import { marked } from 'marked';
	import Comments from '$lib/components/Comments.svelte';
	export let blog;
	export let page;
</script>

<svelte:head>
	<title>{blog?.Title}</title>
</svelte:head>

<div class="container max-w-6xl">
  {#if blog}

	<div class="content">
		{@html marked(blog.Content)}
	</div>

	<span class="date">{new Date(blog.Created).toLocaleDateString()}</span>

	<Comments host="{page.host}" slug="{page.params.blog}" />

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
