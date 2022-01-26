<script lang="ts">
	import Bookmark from '$icons/Bookmark.svelte';
	import PaperAirplane from '$icons/PaperAirplane.svelte';
	import Stake from '$icons/Stake.svelte';
	import Swap from '$icons/Swap.svelte';
	import Wallet from '$icons/Wallet.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function click(menu_item: 'history' | 'send' | 'stake' | 'settings' | 'swap') {
		dispatch('click', { menu_item });
	}
</script>

<div class="no-scrollbar main">
	<div class="menu-item" on:click={() => click('history')}>
		<div class="icon">
			<Bookmark />
		</div>
		<div class="label">History</div>
	</div>
	<div class="menu-item" on:click={() => click('send')}>
		<div class="icon">
			<PaperAirplane />
		</div>
		<div class="label">Send</div>
	</div>
	<div class="menu-item" on:click={() => click('stake')}>
		<div class="icon">
			<Stake />
		</div>
		<div class="label">Stake</div>
	</div>
	<div class="menu-item" on:click={() => click('settings')}>
		<div class="icon">
			<Wallet />
		</div>
		<div class="label">Wallet Settings</div>
	</div>
	<div class="menu-item" on:click={() => click('swap')}>
		<div class="icon">
			<Swap />
		</div>
		<div class="label">Swap</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply py-3 px-6 md:px-0 md:py-0 w-full flex flex-row overflow-x-auto md:flex-col items-stretch gap-2;
	}

	:local(.menu-item) {
		@apply rounded-lg hover:bg-light-purple hover:shadow-md transition-all px-4 py-3 text-xs text-light-grey hover:text-white dark:text-white cursor-pointer flex flex-row items-center gap-2 shadow-design md:shadow-none md:hover:shadow;
		outline: none;
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
