<!-- 
	@component 
	Description:
	> Container for a single history Object data in the history pages.
	
	@author MikeBrandon
	@see historyPage
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	import { clickOutside } from '$utils/clickOutside';

	import Amount from './Amount.svelte';
	import Swap from './Swap.svelte';

	export let wallet = 'Wallet 1';

	export let status: 'Received' | 'Sent' | 'Stake' | 'Swap' = 'Sent';

	export let dateAndTime = 'Apr 01, 2021 07:15:20 am (CST)';

	export let SwapData: SwapData;

	export let amount = 0.0;
	export let price = 0.0;
	export let cryptoUnit = 'USDT';
	export let currencyUnit = 'USD';

	export let index: number = 0;
	export let clicked: boolean = false;

	const dispatch = createEventDispatcher();

	function select(): void {
		dispatch('select', {
			id: index,
		});
	}

	function handleClickOutside(event: any) {
		clicked = false;
		dispatch('deselect');
	}
</script>

<div class="main {$$props.class}" transition:slide>
	<div
		class="container {clicked ? 'clicked' : ' '} hover:cursor-pointer"
		class:clicked
		on:click={select}
		use:clickOutside
		on:click_outside={handleClickOutside}
	>
		<div class="left">
			<div class="leftcontent">
				<div>
					<span class="status">
						{status}
					</span>
					<span class="wallet {clicked ? 'text-white' : 'text-light-grey'}">{wallet}</span>
				</div>
				<div>
					<span class="dateAndime">
						{dateAndTime}
					</span>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="text-right">
				{#if status == 'Swap'}
					<Swap {SwapData} {clicked} />
				{:else if status == 'Sent'}
					<Amount type="negative" {amount} {price} {cryptoUnit} {currencyUnit} {clicked} />
				{:else if status == 'Received'}
					<Amount type="positive" {amount} {price} {cryptoUnit} {currencyUnit} {clicked} />
				{:else if status == 'Stake'}
					<Amount type="negative" {amount} {price} {cryptoUnit} {currencyUnit} {clicked} />
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply py-2;
	}
	:local(.container) {
		@apply rounded-3xl flex justify-between m-1;
		@apply dark:bg-dark-blue dark:md:bg-transparent;
	}
	:local(.left) {
		@apply pl-2 py-2 md:p-3 mx-2 md:mx-3 my-1;
	}
	:local(.right) {
		@apply pr-2 py-2 md:p-3 mx-2 md:mx-3 my-1;
	}
	:local(.leftcontent) {
		@apply text-left;
	}
	:local(.status) {
		@apply text-sm md:text-xl font-bold dark:text-white;
	}
	:local(.wallet) {
		@apply text-xs md:font-bold dark:text-dark-textGray;
	}
	:local(.dateAndime) {
		@apply text-xs md:text-base text-light-gray dark:text-white;
	}
	:local(.top-border) {
		@apply border-t border-black border-opacity-10 dark:border-opacity-10;
	}
	:local(.clicked) {
		@apply bg-light-purple dark:bg-light-purple text-white transition duration-300;
	}
</style>
