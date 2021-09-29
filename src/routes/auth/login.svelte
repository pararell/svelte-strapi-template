<script context="module">
	import { get } from '$lib/api';

	export const load = async ({ fetch, page }) => {
		const resForm = await get('forms?slug=login');

		if (resForm) {
			return {
				props: {
					loginForm: Object.entries(resForm[0].fields)
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
	export let loginForm;
	import Form from '$lib/components/Form.svelte';
	import { Loading } from 'attractions';
	import { errors, loading, login } from '$lib/store';
	import { filter, take, withLatestFrom } from 'rxjs';
	import { goto } from '$app/navigation';

	async function submitForm(event) {
		const data = {
			...event.detail
		};
		login(data);

		loading
			.pipe(
				filter((loading) => !loading),
				withLatestFrom(errors),
				take(1)
			)
			.subscribe(([_loading, error]) => {
				if (!error) {
					goto('/');
				}
			});
	}
</script>

<section>
	<div class="container">
    <div class="center-content">
			<h2 class="text-center text-3xl">Login</h2>
      {#if loginForm && !$loading}
			<Form form={loginForm} on:submitForm={submitForm} />
      {/if}
      {#if $loading}
        <Loading />
      {/if}
      {#if $errors}
        <span class="warning">
          {$errors}
        </span>
      {/if}
    </div>
	</div>
</section>

<style lang="scss">
  .center-content {
    margin: 100px auto;
    max-width: 500px;
  }
</style>
