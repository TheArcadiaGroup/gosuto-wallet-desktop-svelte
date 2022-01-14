<script lang="ts">
	import Swap from '$lib/Home/Swap/index.svelte';
	import SelectCurrency from '$lib/Home/Swap/Forms/SelectCurrency.svelte';
	import SwapCurrency from '$lib/Home/Swap/Forms/SwapCurrency.svelte';
	import ConfirmSelectMobile from '$lib/Home/Swap/Forms/ConfirmSelectMobile.svelte';

	let tokens = [
		{
			cryptoUnit: 'CSPR',
			cryptoName: 'Casper',
			positive: false,
		},
		{},
		{},
		{
			positive: false,
		},
		{
			cryptoName: 'Test',
			cryptoUnit: 'TST',
		},
	];

	let selected = -1

	function selectToken(e: { detail: { id: number } }): void {
		selected = e.detail.id;
	}

	function deselectToken(): void {
		selected = -1
	}

</script>

<div class="wallet-swap-page">
	<div class="main-view">
		<Swap on:select={selectToken} bind:tokens={tokens} bind:selected={selected} />
	</div>
	<div class="sidebar-placeholder"></div>
	<div class="sidebar">
		{#if selected === -1}
			<!--<ConfirmSelectMobile />-->
			<SelectCurrency />
		{:else}
			<SwapCurrency on:deselect={deselectToken} />
		{/if}
	</div>
</div>

<style lang="postcss">
	.wallet-swap-page {
		@apply min-h-screen flex flex-col md:flex-row;
		@apply dark:bg-dark-background;
	}

	.main-view {
		@apply md:w-3/4;
	}

	.sidebar-placeholder {
		@apply md:w-1/4;
	}

	.sidebar {
		@apply mt-auto;
		@apply md:fixed md:right-0 md:h-screen md:w-1/4;
	}
</style>