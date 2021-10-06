<script context="module">
	import { get } from '$lib/api';

	export const load = async ({ page }) => {
    const pathPage = page.path.split('/')[1];
		const response = await get(`contents?slug=` + (pathPage + '-' + page.params.subpage));

		if (response && response.length) {
			const result = response[0];

			return {
				props: {
					content: result.content,
					form: result.form ? Object.entries(result.form.fields) : null,
          formAction: result.form ? result.form.action : null,
					pageSlug: page.params.subpage,
					empty: '',
          success: false
				},
				maxage: 0
			};
		}

		return {
			props: {
				empty: 'This page is empty',
				pageSlug: page.params.subpage,
				form: null,
        success: false
			}
		};
	};
</script>

<script>
	import { pages } from '$lib/store';
	import Form from '$lib/components/Form.svelte';
  import { errors, loading, formSubmit } from '$lib/store';
  import { filter, take, withLatestFrom } from 'rxjs';
  import { Loading } from 'attractions';

	export let content = null;
	export let form = null;
  export let formAction = '';
	export let pageSlug = null;
	export let empty = null;
  export let success = false;
  export let formLoading = false;
	$: title = pages.value?.find(p => p.slug === pageSlug)?.title || pageSlug;

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
		{@html content}
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
