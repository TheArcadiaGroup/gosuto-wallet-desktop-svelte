<script lang="ts">
	import { onMount } from 'svelte';

	import Navbar from '$lib/Components/Navbar/Navbar.svelte';
	import ProfileNavigation from '$lib/Pages/Profile/ProfileNavigation.svelte';

	import Swap from '$lib/Pages/Profile/Swap/index.svelte';

	import TextSidebar from '$lib/Pages/Profile/TextSidebar.svelte';
	import SwapCurrency from '$lib/Pages/Profile/Swap/Forms/SwapCurrency.svelte';
	import CreateToken from '$lib/Pages/Profile/CreateToken/CreateToken.svelte';

	let tokens: IToken[] = [];

	/**
	 * This is the currently selected index of TokenCards.
	 * -1 = none
	 * -2 = create token
	 */
	let selected = -1;

	function selectToken(e: { detail: { id: number } }): void {
		selected = e.detail.id;
	}

	onMount(async () => {
		// not an error, this makes my IDE shut up
		// @ts-ignore
		tokens = await (await fetch('/api/tokens/1')).json();
	});

	// dev
	const user = {
		name: 'Jake Waterson',
		ppurl: 'https://miro.medium.com/fit/c/262/262/2*-cdwKPXyVI0ejgxpWkKBeA.jpeg',
		wallets: [
			{
				name: 'Wallet 1',
				available: 5000,
				staked: 2500,
				unclaimed: 375,
			},
			{
				name: 'Wallet 1',
				available: 5000,
				staked: 2500,
				unclaimed: 375,
			},
		],
	};
</script>

<div class="swap-page-container">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<ProfileNavigation {user} />
	</div>
	<div class="global-grid-mid">
		<Swap on:selectToken={selectToken} bind:tokens bind:selected />
	</div>
	<div class="global-grid-right swap-sidebar">
		{#if selected === -2}
			<CreateToken on:selectToken={selectToken} />
		{:else if selected === -1}
			<TextSidebar>Select currency you want to swap</TextSidebar>
		{:else}
			<SwapCurrency />
		{/if}
	</div>
</div>

<style lang="postcss" global>
	.swap-page-container {
		@apply flex flex-row;
	}

	.swap-sidebar {
		@apply h-full w-full;
		@apply lg:h-screen;
	}
</style>
