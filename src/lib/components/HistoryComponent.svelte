<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	import Amount from './HistoryComponent/Amount.svelte';

	import Swap from './HistoryComponent/Swap.svelte';

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
</script>

<div class="main {$$props.class}" transition:slide>
	<div
		class="container {clicked ? 'bg-purple-500' : 'dark:bg-dark-blue '} hover:cursor-pointer"
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

<style lang="postcss">
	.main {
		@apply py-2;
	}
	.container {
		@apply rounded-3xl flex justify-between m-1;
	}
	.left {
		@apply md:p-3 mx-2 md:mx-3 my-1;
	}
	.right {
		@apply md:p-3 mx-2 md:mx-3 my-1;
	}
	.leftcontent {
		@apply text-left;
	}
	.status {
		@apply text-sm md:text-xl font-bold;
	}
	.wallet {
		@apply text-xs md:font-bold;
	}
	.dateAndime {
		@apply text-xs md:text-base text-light-gray;
	}
	.top-border {
		@apply border-t border-black dark:border-white border-opacity-10;
	}
	.clicked {
		@apply bg-light-purple text-white transition duration-300;
	}
</style>
