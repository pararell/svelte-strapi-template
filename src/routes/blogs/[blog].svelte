<script context="module">

	export const load = async ({ page }) => {
		const response = await get(`blogs?slug=${page.params.blog}`);

		if (response && response.length) {

    return {
        props: {
          blog: response[0]
        },
        maxage: 0
      };
    }

    return {
      props: {
        blog: null
      }
    };
  };
</script>

<script>
	import { get } from '$lib/api';
  import marked from 'marked';
	export let blog;
</script>

<svelte:head>
	<title>{blog?.Title}</title>
</svelte:head>

<div class="container">
  {#if blog}
	<h1 class="text-center text-4xl mt-8 pb-4">{blog.Title}</h1>

	<div class="content">
		{@html marked(blog.Content)}
	</div>

	<span class="date">{new Date(blog.created_at).toLocaleDateString()}</span>

{/if}

<div id="disqus_thread" />
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
