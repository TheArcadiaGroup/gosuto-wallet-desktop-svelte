<!-- @component 
	Describtion:
	> Component with menu for the first column of /profile routes.
	
	Props:
	- `menuItems` = An array of object ({ name: string, label: string, icon: SvelteComponent}) that is displayed in the menu.

	Events:
	- `click` = Dispatched when a menu item is clicked. Dispatches the menu item name via event details.
-->
<script lang="ts">
	import { page } from '$app/stores';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/**Handler for clicking a menu item. Dispatches the menu item name via event details.*/
	function click(menu_item: string) {
		dispatch('click', { menu_item });
	}

	export let menuItems: {
		name: string;
		label: string;
		icon: any;
	}[];

	$: currentSubroute = $page.path.split('/')[$page.path.split('/').length - 1] || '';
</script>

<div class="no-scrollbar main">
	{#each menuItems as item}
		<div
			class="menu-item {currentSubroute === item.name && 'currently-open'}"
			on:click={() => click(item.name || 'unknown')}
		>
			<div class="icon">
				<svelte:component this={item.icon} />
			</div>
			<div class="label">{item.label || 'unknown'}</div>
		</div>
	{/each}
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply pb-3 px-6 md:px-0 md:py-0 w-full flex flex-row overflow-x-auto md:flex-col items-stretch gap-2;
	}

	:local(.menu-item) {
		@apply rounded-lg hover:bg-light-purple hover:shadow-md transition-all px-4 py-3 text-xs text-light-grey hover:text-white dark:text-white cursor-pointer flex flex-row items-center gap-2 shadow-design md:shadow-none md:hover:shadow;
		outline: none;
	}

	:local(.currently-open) {
		@apply bg-light-purple text-white;
	}

	:local(.menu-item):focus {
		outline: none;
	}

	:local(.no-scrollbar) {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	:local(.no-scrollbar)::-webkit-scrollbar {
		display: none;
	}

	:local(.icon) {
		@apply w-4;
	}

	:local(.label) {
		@apply whitespace-nowrap;
	}
</style>
