<script lang="ts">
	import Amount from './HistoryComponent/Amount.svelte';

	import Swap from './HistoryComponent/Swap.svelte';

	export let background: 'purple' | 'white' = 'white';

	export let status: 'Received' | 'Sent' | 'Stake' | 'Swap' = 'Sent';

	export let dateAndTime = 'Apr 01, 2021 07:15:20 am (CST)';

	export let SwapData: SwapData;

	export let amount = 0.0;
	export let price = 0.0;
	export let cryptoUnit = 'USDT';
	export let currencyUnit = 'USD';
</script>

<div
	class="container {background == 'purple'
		? 'bg-purple-500'
		: 'dark:bg-dark-blue '} hover:cursor-pointer"
>
	<div class="left">
		<div class="leftcontent">
			<div>
				<span
					class="status {background == 'purple'
						? 'text-white'
						: 'text-dark-grey dark:text-white'}"
				>
					{status}
				</span>
				<span class="wallet">Wallet</span>
			</div>
			<div>
				<span
					class="dateAndTime {background == 'purple'
						? 'text-white'
						: 'text-light-grey dark:text-white'}"
				>
					{dateAndTime}
				</span>
			</div>
		</div>
	</div>
	<div class="right">
		<div class="text-right">
			{#if status == 'Swap'}
				<Swap {background} {SwapData} />
			{:else if status == 'Sent'}
				<Amount type="negative" {background} {amount} {price} {cryptoUnit} {currencyUnit} />
			{:else if status == 'Received'}
				<Amount type="positive" {background} {amount} {price} {cryptoUnit} {currencyUnit} />
			{:else if status == 'Stake'}
				<Amount type="negative" {background} {amount} {price} {cryptoUnit} {currencyUnit} />
			{/if}
		</div>
	</div>
</div>

<style>
	.container {
		@apply rounded-3xl flex justify-between m-1;
	}
	.left {
		@apply p-3 mx-3 my-1;
	}
	.right {
		@apply p-3 mx-3 my-1;
	}
	.leftcontent {
		@apply text-left;
	}
	.status {
		@apply text-xl font-bold;
	}
	.wallet {
		@apply text-xs text-light-grey font-bold;
	}
	.dateAndime {
		@apply text-base;
	}
</style>
