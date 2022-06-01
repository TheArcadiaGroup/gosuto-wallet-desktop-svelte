<!-- 
	@component 
	Description:
	> Container for a single history Object data in the history pages.
	
	@author MikeBrandon
	@see historyPage
-->
<script lang="ts">
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import Amount from './Amount.svelte';
	import Swap from './Swap.svelte';
	import SuccessIcon from '$icons/SuccessIcon.svelte';
	import ErrorIcon from '$icons/ErrorIcon.svelte';

	export let historyObject: IHistory;
	export let selectedHistoryItem: IHistory | null = null;
</script>

<div class="history-card-item {$$props.class}" transition:slide|local on:click>
	<div
		class="container hover:cursor-pointer"
		class:selected={selectedHistoryItem?.deployHash === historyObject.deployHash}
	>
		<div class="left">
			<div class="leftcontent">
				<div>
					<span class="tx-type">
						{historyObject.transactionType}
						<span
							class="tx-status block ml-2"
							title={historyObject.error ? historyObject.error : ''}
						>
							{#if historyObject.error}
								<ErrorIcon fill="rgb(230, 51, 42)" />
							{:else}
								<SuccessIcon fill="rgb(49, 222, 145)" />
							{/if}
						</span>
					</span>
					{#if !$page.params.address}
						<span
							class="wallet {selectedHistoryItem?.deployHash === historyObject.deployHash
								? 'text-white'
								: 'text-light-grey'}"
						>
							{historyObject.walletName}
						</span>
					{/if}
				</div>
				<div>
					<span class="dateAndime">
						{window.moment(historyObject.transactionDate).format('MMMM DD, YYYY h:mm:ss a')}
					</span>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="text-right">
				{#if historyObject.transactionType == 'swap' && historyObject.swap}
					<Swap
						swapData={historyObject.swap}
						clicked={selectedHistoryItem?.deployHash === historyObject.deployHash}
					/>
				{:else}
					<Amount
						type={historyObject.transactionType === 'stake' ||
						historyObject.transactionType === 'send'
							? 'negative'
							: 'positive'}
						amount={historyObject.amount}
						cryptoUnit={'CSPR'}
						clicked={selectedHistoryItem?.deployHash === historyObject.deployHash}
					/>
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.history-card-item) {
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
	:local(.tx-type) {
		@apply text-sm md:text-xl font-bold dark:text-white capitalize flex items-center;
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
	:local(.selected) {
		@apply bg-light-purple dark:bg-light-purple text-white transition duration-300;
	}
</style>
