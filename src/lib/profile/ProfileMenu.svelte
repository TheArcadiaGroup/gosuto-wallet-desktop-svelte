<!-- @component 
	Describtion:
	> Component with menu for the first column of /profile routes.
	
	Events:
	- `click` = Dispatched when a menu item is clicked. Dispatches the menu item name via event details.
-->
<script lang="ts">
	import Bookmark from '$icons/Bookmark.svelte';
	import PaperAirplane from '$icons/PaperAirplane.svelte';
	import Stake from '$icons/Stake.svelte';
	import Swap from '$icons/Swap.svelte';
	import Wallet from '$icons/Wallet.svelte';

	import { page } from '$app/stores';
	$: currentSubroute = $page.path.split('/')[2] || ''; // variable that determines what subroute the user is currently on and highlightes the coresponding menu element

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/**Handler for clicking a menu item. Dispatches the menu item name via event details.*/
	function click(menu_item: string) {
		dispatch('click', { menu_item });
	}

	const menuItems = [
		{ name: 'history', label: 'History', icon: Bookmark },
		{ name: 'send', label: 'Send', icon: PaperAirplane },
		{ name: 'stakes', label: 'Stakes', icon: Stake },
		{ name: 'settings', label: 'Wallet Settings', icon: Wallet },
		{ name: 'swap', label: 'Swap', icon: Swap },
	];
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
		@apply py-3 px-6 md:px-0 md:py-0 w-full flex flex-row overflow-x-auto md:flex-col items-stretch gap-2;
	}

	:local(.menu-item) {
		@apply rounded-lg hover:bg-light-purple hover:shadow-md transition-all px-4 py-3 text-xs text-light-grey hover:text-white dark:text-white cursor-pointer flex flex-row items-center gap-2 shadow-design md:shadow-none md:hover:shadow;
		outline: none;
	}

	:local(.currently-open) {
		@apply bg-light-purple;
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
