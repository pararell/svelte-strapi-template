<script context="module">
	import { get } from '$lib/api';

	export const load = async ({ page }) => {
		const response = await get(`contents?filters[slug]=` + page.params.page + '&populate=*');

		if (response && response.data) {
			const result = response.data[0]?.attributes || {};

			return {
				props: {
					content: result.content,
					form: result.form ? Object.entries(result.form?.data?.attributes.fields) : null,
					jsonSettings: result.json,
          formAction: result.form ? result.form?.data?.attributes.action : null,
					pageSlug: page.params.page,
					pageHost: page.host,
					empty: '',
          success: false
				}
			};
		}

		return {
			props: {
				empty: 'This page is empty',
				pageSlug: page.params.page,
				pageHost: page.host,
				content: null,
				form: null,
				jsonSettings: null,
        success: false
			}
		};
	};
</script>

<script>
	import { pages } from '$lib/store';
	import Form from '$lib/components/Form.svelte';
	import Comments from '$lib/components/Comments.svelte';
  import { errors, loading, formSubmit } from '$lib/store';
  import { filter, take, withLatestFrom } from 'rxjs';
  import { Loading } from 'attractions';
	import { marked } from 'marked';

	export let content = null;
	export let form = null;
	export let jsonSettings = null;
  export let formAction = '';
	export let pageSlug = null;
	export let pageHost = null;
	export let empty = null;
  export let success = false;
  export let formLoading = false;
	$: title = pages.value?.find(p => p.attributes?.slug === pageSlug)?.attributes?.metaTitle || pageSlug;

	async function submitForm(event) {
		const data = {
			...event.detail
		};

    if (!formAction) {
      return;
    }
    
    formLoading = true;

    formSubmit(formAction, data)

    loading
			.pipe(
				filter((loading) => !loading),
				withLatestFrom(errors),
				take(1)
			)
			.subscribe(([_loading, error]) => {
        formLoading = false;
				if (!error) {
          success = true;
				}
			});
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="w-full">
	{#if content}
	<div class="content">
		{@html marked(content)}
	</div>
	{/if}
	{#if jsonSettings?.withComments}
	<div class="container">
		<Comments host="{pageHost}" slug="{pageSlug}" />
	</div>
	{/if}
  {#if formLoading}
    <Loading />
  {/if}
	{#if form && !formLoading}
		<div class="container">
			<div class="center-content">
				<Form {form} on:submitForm={submitForm} />
			</div>
    {#if success}
    <span class="text-green-500 text-center">
      Sended successfully
    </span>
    {/if}
    {#if $errors}
    <span class="text-red-500 text-center">
      Error, try again
    </span>
    {/if}
  </div>
	{/if}
	{#if empty}
		<div class="m-auto w-full">
			<div class="container flex items-center justify-center">
				<span class="text-center m-auto py-8 text-2xl">
					{empty}
				</span>
			</div>
		</div>
	{/if}
</div>

<style>
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
</style>
