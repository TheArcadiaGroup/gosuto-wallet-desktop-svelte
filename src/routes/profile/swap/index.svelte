<!--
@component
The wallet swap route, this is where the layout is, the currently selected token index and list of tokens is.
@author marekvospel
-->
<script lang="ts">
	import Navbar from '$components/Navbar/Navbar.svelte'
	import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte'

	import Swap from '$lib/Profile/Swap/index.svelte';

	import SelectCurrency from '$lib/Profile/Swap/Forms/SelectCurrency.svelte';
	import SwapCurrency from '$lib/Profile/Swap/Forms/SwapCurrency.svelte';
	import ConfirmSelectMobile from '$lib/Profile/Swap/Forms/ConfirmSelectMobile.svelte';

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

<div class="swap-page-container">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<ProfileNavigation />
	</div>
	<div class="global-grid-mid">
		<Swap on:selectToken={selectToken} bind:tokens bind:selected />
	</div>
	<div class="global-grid-right swap-sidebar" >
		{#if selected === -1}
			<!--<ConfirmSelectMobile />-->
			<SelectCurrency />
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
