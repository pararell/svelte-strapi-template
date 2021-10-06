<script>
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { DropdownShell, Dropdown } from 'attractions';
	import { API_URL } from '../constants';
	export let user;
	export let pages = [];
	$: home = pages.find(p => p.slug === 'home') || {title: 'home'}

	const dispatch = createEventDispatcher();
	const handleLogout = () => {
		dispatch('logout');
	};
</script>

<nav class="nav">
	<div class="container">
		<div class="nav-content">
			{#if home?.image && home.image.length}
			<a class="nav-link nav-logo font-semibold" href="/">
				<img class="nav-logo-img" src="{ API_URL + home.image[0].url}" alt="{home.title}">
			</a>
			{:else}
			<a class="nav-link nav-logo font-semibold" href="/">{home.title}</a>
			{/if}
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
					{#each pages.filter(p => p.slug !== 'home') as dPage}
						<li class="nav-li mr-4 desktop" class:active={$page.path === '/' + dPage.url}>
							<a class="nav-link" href="/{dPage.url}">{dPage.title}</a>
						</li>
					{/each}
				{/if}
				{#if user}
					<li class="nav-li"><a class="nav-link" href="/" on:click={handleLogout}>Logout</a></li>
				{/if}
				{#if pages.length}
					<li class="nav-li mobile">
						<DropdownShell let:toggle>
							<a href="{'#'}"
								class="nav-link mr-4  ml-4 cursor-pointer flex items-center mt-0.5"
								on:click={toggle}
							>
								<span>Menu</span> <span class="-mt-1 ml-1 flex">⌄</span>
							</a>
							<Dropdown right>
								<div class="px-4 py-2">
									{#each pages.filter(p => p.slug !== 'home') as dPage}
										<li class="nav-li mr-4" class:active={$page.path === '/' + dPage.url}>
											<a class="nav-link" href="/{dPage.url}">{dPage.title}</a>
										</li>
									{/each}
								</div>
							</Dropdown>
						</DropdownShell>
					</li>
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
		box-shadow: 0 1px 2px 0 rgba(40, 42, 49, 0.16);
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

			&-img {
				max-height: 40px;
				max-width: 100%;
			}
		}
	}

	.desktop {
		display: none;
	}

	.mobile {
		display: block;
	}

	@screen md {
		.desktop {
			display: block;
		}

		.mobile {
			display: none;
		}
	}
</style>
