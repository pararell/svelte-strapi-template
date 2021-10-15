<script>
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { DropdownShell, Dropdown, Accordion, AccordionSection } from 'attractions';
	import { ChevronDownIcon, XIcon } from 'svelte-feather-icons';
	import { fly} from "svelte/transition";
	import { sineIn } from "svelte/easing";
	import { API_URL } from '../constants';
	export let user;
	export let sidebarOpen = false;
	export let pages = [];
	export let categories = [];
	$: home = pages.find((p) => p.slug === 'home') || { title: 'home' };
	$: pagesInMenu = pages
		.filter((p) => p.slug !== 'home' && !p.categories.length)
		.sort((a, b) => a.position - b.position);

	const dispatch = createEventDispatcher();

	const handleLogout = () => {
		dispatch('logout');
	};

	const togleSidebar = () => {
		dispatch('togglesidebar');
	};
</script>

<nav class="nav">
	<div class="container">
		<div class="nav-content">
			{#if home?.image && home.image.length}
				<a class="nav-link nav-logo font-semibold" href="/">
					<img class="nav-logo-img" src={API_URL + home.image[0].url} alt={home.title} />
				</a>
			{:else}
				<a class="nav-link nav-logo font-semibold" href="/">{home.title}</a>
			{/if}
			<ul class="nav-list">
				{#if pages.length}
					{#each pagesInMenu as dPage}
						<li class="nav-li mr-4 desktop" class:active={$page.path === '/' + dPage.url}>
							<a class="nav-link" href="/{dPage.url}">{dPage.title}</a>
						</li>
					{/each}
				{/if}
				{#if !user}
					<li class="nav-li mr-4" class:active={$page.path === '/auth/register'}>
						<a class="nav-link" href="/auth/register">Register</a>
					</li>
					<li class="nav-li mr-4" class:active={$page.path === '/auth/login'}>
						<a class="nav-link" href="/auth/login">Login</a>
					</li>
				{/if}
				{#if user}
					<li class="nav-li"><a class="nav-link" href="/" on:click={handleLogout}>Logout</a></li>
				{/if}
				{#if pages.length}
					<li class="nav-li mobile">
						<DropdownShell let:toggle>
							<button
								class="nav-link mr-4  ml-4 cursor-pointer flex items-center mt-0.5"
								on:click={toggle}
							>
								Menu <ChevronDownIcon size="1x" class="ml dropdown-chevron" />
							</button>
							<Dropdown right>
								<ul class="px-4 py-2">
									{#each pagesInMenu as dPage}
										<li class="nav-li mr-4" class:active={$page.path === '/' + dPage.url}>
											<a class="nav-link" href="/{dPage.url}">{dPage.title}</a>
										</li>
									{/each}
								</ul>
							</Dropdown>
						</DropdownShell>
					</li>
				{/if}
				<li class="px-4 max-h-6">
					<button on:click={togleSidebar}>
						<svg
							fill="#000000"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24px"
							height="24px"
							><path
								d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"
							/></svg
						>
					</button>
				</li>
			</ul>
		</div>
	</div>
</nav>
{#if sidebarOpen}
	<div class="flex flex-col sidebar" transition:fly={{x: 300, duration: 300, opacity: 1, easing: sineIn}}>
		<div class="sidebar-header">
			<button class="text-2xl" on:click={togleSidebar}>
				<XIcon size="1x" class="text-gray-400" />
			</button>
		</div>

		<div class="sidebar-content">
			{#if categories.length}
				<Accordion let:closeOtherPanels>
					{#each categories as category}
						<div class="mb-4">
							<AccordionSection on:panel-open={closeOtherPanels} let:toggle>
								<div slot="handle">
									{#if category.pages.length}
										<button
											class="nav-link mx-auto cursor-pointer flex items-center mt-0.5"
											on:click={toggle}
										>
											<h3 class="text-2xl">{category.Title}</h3>
											<ChevronDownIcon size="2x" class="ml accordion-chevron" />
										</button>
									{/if}
								</div>
								{#if category.pages.length}
									<div class="px-4 py-1">
										{#each category.pages as cPage}
											<li class="nav-li flex items-center my-1" class:active={$page.path === '/' + cPage.url}>
												<a
													class="sidebar-link text-base mx-auto"
													on:click={togleSidebar}
													href="/{cPage.url}">{cPage.title}</a
												>
											</li>
										{/each}
									</div>
								{/if}
							</AccordionSection>
						</div>
					{/each}
				</Accordion>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.nav {
		background: var(--primary-color);
		display: flex;
		align-items: center;
		height: 50px;
		box-shadow: -1px 1px 1px 0px #0000001a;
		width: 100%;

		&-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		&-list {
			display: flex;
			align-items: center;
		}

		&-li {
			list-style: none;

			&.active {
				.nav-link,
				.sidebar-link {
					font-weight: bold;
				}
			}
		}

		&-link {
			text-decoration: none;
			color: #000;
			font-size: 0.875rem;
			line-height: 1.25rem;
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

	.sidebar {
		background: var(--primary-color);
		max-height: 100%;
		height: calc(100vh - 51px);
		min-width: 300px;
		position: fixed;
		top: 50px;
		right: 0;
		z-index: 1;
		box-shadow: -2px 1px 1px rgba(0, 0, 0, 0.1);
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		overflow-y: auto;

		&-header {
			padding: 15px 15px 0 15px;
			cursor: pointer;
		}

		&-content {
			padding: 15px;
		}
	}
</style>
