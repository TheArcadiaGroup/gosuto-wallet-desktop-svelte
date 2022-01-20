<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ProfitUpIcon from '$icons/ProfitUpIcon.svelte';
	import ProfitDownIcon from '$icons/ProfitDownIcon.svelte';

	export let cardId: number;

	export let cryptoName = 'Tether';
	export let cryptoUnit = 'USDT';
	export let cryptoAmount = 2000;
	export let currencyUnit = 'USD';
	export let currencySymbol = '$';
	export let currencyAmount = 175;

	export let selected = false;
	export let positive = true;

	const dispatch = createEventDispatcher();

	function select(): void {
		dispatch('selectToken', {
			id: cardId,
		});
	}
</script>

<div on:click={select} class="token-card {selected ? 'selected' : ''}">
	<div class="gap-1">
		<p class="card-title">{cryptoName} ({cryptoUnit})</p>
		<p class="card-text-sm {positive ? 'text-light-green' : 'text-light-red'}">{cryptoAmount} {cryptoUnit}</p>
		<p class="card-text-xs {positive ? 'text-light-green' : 'text-light-red'}">{currencySymbol}{currencyAmount} {currencyUnit}</p>
	</div>
	<div class="ml-auto text-right">
		<p class="card-text-sm card-text-flex {positive ? 'text-light-green' : 'text-light-red'}">
			{#if positive}
				<ProfitUpIcon />
			{:else}
				<ProfitDownIcon />
			{/if}
			+15%
		</p>
		<p class="card-text-xs {positive ? 'text-light-green' : 'text-light-red'}">897,000 CSPR</p>
		<p class="card-text-xs text-light-gray">(24h)</p>
	</div>
</div>

<style lang="postcss" global>
	:local(.token-card) {
		@apply px-3 py-2 flex flex-row rounded-2xl border border-light-transparentGrey10 cursor-pointer select-none;
		@apply md:p-5 md:rounded-[1.375rem];
		@apply dark:bg-dark-blue;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	:local(.token-card.selected) {
		@apply border border-light-purple;
		box-shadow: 0 4px 12px rgba(114, 93, 255, 0.3);
	}

	:local(.card-title) {
		@apply text-xs font-bold mb-0.5 md:text-base;
		@apply text-light-grey dark:text-white;
	}

	:local(.card-text-xs) {
		@apply text-xs font-bold md:text-base;
	}

	:local(.card-text-sm) {
		@apply text-sm font-bold md:text-2xl;
	}

	:local(.card-text-flex) {
		@apply inline-flex flex-row items-center justify-end gap-1 md:gap-2;
	}
</style>