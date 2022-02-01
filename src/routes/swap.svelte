<!--
@component
The wallet swap route, this is where the layout is, the currently selected token index and list of tokens is.
@author marekvospel
-->
<script lang="ts">
	import Swap from '$lib/Home/Swap/index.svelte';
	import SelectCurrency from '$lib/Home/Swap/Forms/SelectCurrency.svelte';
	import SwapCurrency from '$lib/Home/Swap/Forms/SwapCurrency.svelte';
	import ConfirmSelectMobile from '$lib/Home/Swap/Forms/ConfirmSelectMobile.svelte';
	import GridLayout from '$lib/Common/GridLayout.svelte';

	/**
	 * This is an array of tokens, which will be shown in the main column of the app's grid. Values inside this array will be passed on to TokenCard components inside Swap component
	 * @see Swap
	 */
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

	/**
	 * This is the currently selected index of TokenCards.
	 * @type {number}
	 * @see Swap
	 */
	let selected = -1;

	/**
	 * A function changing the selected index value of this component.
	 * @param e selectToken event with the selected TokenCard index
	 */
	function selectToken(e: { detail: { id: number } }): void {
		selected = e.detail.id;
	}
</script>

<GridLayout>
	<div slot="mid">
		<Swap on:selectToken={selectToken} bind:tokens bind:selected />
	</div>
	<div class="sidebar" slot="last">
		{#if selected === -1}
			<!--<ConfirmSelectMobile />-->
			<SelectCurrency />
		{:else}
			<SwapCurrency />
		{/if}
	</div>
</GridLayout>

<style lang="postcss" global>
	:local(.wallet-swap-page) {
		@apply min-h-screen flex flex-col md:flex-row;
		@apply dark:bg-dark-background;
	}

	:local(.sidebar) {
		@apply h-full w-full;
		@apply md:right-0 md:h-screen;
	}
</style>
