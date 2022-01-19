<script lang="ts">
	import { shortenAddress } from '$utils/index';
	import Amount from '$lib/components/HistoryComponent/Amount.svelte';
	import Swap from '$lib/components/HistoryComponent/Swap.svelte';

	export let wallet = 'Wallet 1';

	export let status:
		| 'Received'
		| 'Sent'
		| 'Stake'
		| 'Swap'
		| 'Initial Stake Unlocked'
		| 'Unstake'
		| 'Claimed Reward' = 'Sent';

	export let dateAndTime: string = 'Apr 01, 2021 07:15:20 am (CST)';
	export let stakedOn: string = '01 Dec 2021';

	export let SwapData: SwapData;

	export let amount: number = 0;
	export let price: number = 0;
	export let cryptoUnit: string = 'USDT';
	export let currencyUnit: string = 'USD';

	export let toAccount: string = '0x9f98e01d2gj92ngn2g7gn24ed7';
	export let fromAccount: string = '0x9f98e01d2gj92ngn2g7gn24ed7';

	export let transactionHash: string = '0x9f98e01d2gj92ngn2g7gn24ed7';
	export let blockExplorerURL: string = '0x9f98e01d2gj92ngn2g7gn24ed7';
</script>

<div class="main">
	<div class="header">
		<h4>
			{status}
		</h4>
		<h5>
			{wallet}
		</h5>
	</div>
	<div class="top-details">
		{#if (status == 'Received') | (status == 'Sent')}
			<div class="address-holder">
				<p class="to-from">To</p>
				<p class="address">
					{shortenAddress(toAccount)}
				</p>
			</div>
		{/if}
		{#if (status == 'Initial Stake Unlocked') | (status == 'Unstake') | (status == 'Claimed Reward')}
			<div class="address-holder">
				<p class="to-from">Staked On</p>
				<p class="address">
					{stakedOn}
				</p>
			</div>
		{/if}
		<div class="address-holder">
			<p class="to-from">From</p>
			<p class="address">
				{shortenAddress(fromAccount)}
			</p>
		</div>
		<div class="address-holder date">
			<p class="to-from">Transaction Date</p>
			<p class="address">
				{dateAndTime}
			</p>
		</div>
	</div>
	<div class="amount-holder">
		<p class="to-from">Amount</p>
		{#if status == 'Swap'}
			<Swap {SwapData} smaller={true} />
		{:else}
			<div class="amount">
				<Amount
					type={(status == 'Sent') | (status == 'Stake') ? 'negative' : 'positive'}
					{amount}
					{price}
					{cryptoUnit}
					{currencyUnit}
					clicked={false}
					smaller={true}
				/>
			</div>
		{/if}
	</div>
	<div class="bottom-holder">
		<div class="address-holder">
			<p class="to-from">Transaction Fee</p>
			<p class="address">2.5%</p>
		</div>
		<div class="address-holder date">
			<p class="to-from">Transaction Hash</p>
			<p class="address">
				{shortenAddress(transactionHash)}
			</p>
		</div>
	</div>
	<a href={blockExplorerURL}>View on block explorer</a>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply pt-6 px-8 mb-4 md:mb-0 w-full;
		@apply border border-black dark:border-white dark:md:border-0 border-opacity-10 dark:border-opacity-40 rounded-3xl;
		@apply bg-white dark:bg-dark-background flex flex-col dark:md:bg-dark-grey;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
	}

	:local(h4) {
		@apply font-bold text-xl dark:text-white;
	}

	:local(h5) {
		@apply font-bold text-sm text-light-purple;
	}

	:local(.header) {
		@apply mb-5 md:mb-4 2xl:mb-8 text-center;
	}

	:local(.top-details) {
		@apply w-[70%];
	}

	:local(.bottom-holder) {
		@apply w-[60%];
	}

	:local(.address-holder) {
		@apply text-sm flex w-full justify-between mb-4;
	}

	:local(.to-from) {
		@apply font-semibold text-sm dark:text-white dark:opacity-60;
	}

	:local(.address) {
		@apply text-light-gray dark:text-white;
	}

	:local(.date) {
		@apply flex-col;
	}

	:local(.amount-holder) {
		@apply flex justify-between items-center py-4 mb-5;
		@apply border-t border-b border-opacity-20 dark:border-opacity-30 border-black dark:border-white;
	}

	:local(.amount) {
		@apply text-right;
	}

	:local(a) {
		@apply self-center mb-2 text-sm text-light-orange md:text-light-urlColor;
	}
</style>
