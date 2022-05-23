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

	import Amount from './Amount.svelte';
	import Swap from './Swap.svelte';

	export let wallet = '';

	export let status: TxStatus = 'send';
	export let blockHash: string = '';
	export let deployHash: string = '';
	export let date: Date;

	export let swapData: SwapData | null = null;

	export let amount = 0.0;
	export let price = 0.0;
	export let cryptoUnit = 'CSPR';

	export let index: number = 0;
	export let clicked: boolean = false;

	const dispatch = createEventDispatcher();

	function select(): void {
		dispatch('select', {
			id: index,
		});
	}
</script>

<div class="history-card {$$props.class}" transition:slide|local>
	<div
		class="container {clicked ? 'clicked' : ' '} hover:cursor-pointer"
		class:clicked
		on:click={select}
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
						{window.moment(date).format('MMMM DD, YYYY h:mm:ss a')}
					</span>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="text-right">
				{#if status == 'swap' && swapData}
					<Swap {swapData} {clicked} />
				{:else if status == 'send'}
					<Amount type="negative" {amount} {price} {cryptoUnit} {clicked} />
				{:else if status == 'receive'}
					<Amount type="positive" {amount} {price} {cryptoUnit} {clicked} />
				{:else if status == 'stake'}
					<Amount type="negative" {amount} {price} {cryptoUnit} {clicked} />
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.history-card) {
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
		@apply text-sm md:text-xl font-bold dark:text-white capitalize;
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
