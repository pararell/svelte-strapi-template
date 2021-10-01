<script>
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	export let user;
	export let pages = [];

	const dispatch = createEventDispatcher();
	const handleLogout = () => {
		dispatch('logout');
	};
</script>

<nav class="nav">
	<div class="container">
		<div class="nav-content">
			<a class="nav-link nav-logo font-semibold" href="/">Template</a>
			<ul class="nav-list">
				{#if !user}
					<li class="nav-li mr-4" class:active={$page.path === '/auth/register'}>
						<a class="nav-link" href="/auth/register">Register</a>
					</li>
					<li class="nav-li mr-4" class:active={$page.path === '/auth/login'}>
						<a class="nav-link" href="/auth/login">Login</a>
					</li>
				{/if}
				{#if pages.length}
					{#each pages as dPage}
						<li class="nav-li mr-4" class:active={$page.path === '/' + dPage.url}>
							<a class="nav-link" href=/{dPage.url}>{dPage.title}</a>
						</li>
					{/each}
				{/if}
				{#if user}
					<li class="nav-li"><a class="nav-link" href="/" on:click={handleLogout}>Logout</a></li>
				{/if}
			</ul>
		</div>
	</div>
</nav>

<style lang="scss">
	.nav {
		display: flex;
		align-items: center;
		height: 50px;
    box-shadow: 0 1px 2px 0 rgba(40, 42, 49, 0.16);;
		width: 100%;

		&-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		&-list {
			display: flex;
		}

		&-li {
			list-style: none;

			&.active {
				.nav-link {
					font-weight: bold;
				}
			}
		}

		&-link {
			text-decoration: none;
			color: #000;
      font-size: 0.875rem;
		}

    &-logo {
      font-size: 1.2rem;
    }
	}
</style>
