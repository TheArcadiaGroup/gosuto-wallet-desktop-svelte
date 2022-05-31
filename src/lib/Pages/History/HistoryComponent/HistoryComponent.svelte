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
	import { page } from '$app/stores';
	import Amount from './Amount.svelte';
	import Swap from './Swap.svelte';
	import SuccessIcon from '$icons/SuccessIcon.svelte';
	import ErrorIcon from '$icons/ErrorIcon.svelte';

	export let wallet = '';

	export let txType: TxType = 'send';
	export let error: null | string = null;
	export let date: Date;

	export let swapData: SwapData | null = null;

	export let amount = 0.0;
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
					<span class="tx-type">
						{txType}
						<span class="tx-status block ml-2" title={error ? error : ''}>
							{#if error}
								<ErrorIcon fill="rgb(230, 51, 42)" />
							{:else}
								<SuccessIcon fill="rgb(49, 222, 145)" />
							{/if}
						</span>
					</span>
					{#if !$page.params.address}
						<span class="wallet {clicked ? 'text-white' : 'text-light-grey'}">{wallet}</span>
					{/if}
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
				{#if txType == 'swap' && swapData}
					<Swap {swapData} {clicked} />
				{:else}
					<Amount
						type={txType === 'stake' || txType === 'send' ? 'negative' : 'positive'}
						{amount}
						{cryptoUnit}
						{clicked}
					/>
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
	:local(.clicked) {
		@apply bg-light-purple dark:bg-light-purple text-white transition duration-300;
	}
</style>
