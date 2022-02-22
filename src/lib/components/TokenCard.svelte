<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import { getTokenValue } from '$utils/token.util.ts';

	import ProfitUpIcon from '$icons/ProfitUpIcon.svelte';
	import ProfitDownIcon from '$icons/ProfitDownIcon.svelte';

	/**
	 * The index of this card. Used when dispatching selectToken event to parent
	 */
	export let cardId: number;

	export let selected = false;

	/**
	 * Whether the token is rising (true, green values will be shown), or declining (false, red values will be shown)
	 */
	export let positive = true;

	export let tokenName = 'Tether';
	export let tokenTicker = 'USDT';
	export let tokenAmountHeld = 2000;
	export let contractAddress = 'abc';

	/**
	 * Code of the real currency shown inside this component
	 */
	export let currencyUnit = 'USD';
	/**
	 * Symbol of the real currency shown inside this component
	 */
	export let currencySymbol = '$';
	/**
	 * Amount of the real currency shown inside this component
	 */
	export let tokenAmountHeldUSD = 175;

	let usdValue = 0;

	onMount(() => {
		// @ts-ignore
		const result = fetch(`/api/tokens/value/${encodeURIComponent(contractAddress)}`);
	});

	const dispatch = createEventDispatcher();

	function select(): void {
		dispatch('selectToken', {
			id: cardId,
		});
	}
</script>

<div on:click={select} class="token-card {selected ? 'selected' : ''}">
	<div class="token-card-left-col">
		<p class="token-card-title">{tokenName} ({tokenTicker})</p>
		<p class="token-card-text-sm {positive ? 'text-light-green' : 'text-light-red'}">
			{tokenAmountHeld}
			{tokenTicker}
		</p>
		<p class="token-card-text-xs {positive ? 'text-light-green' : 'text-light-red'}">
			{currencySymbol}{tokenAmountHeldUSD}
			{currencyUnit}
		</p>
	</div>
	<div class="token-card-right-col">
		<p
			class="token-card-text-sm token-card-text-flex {positive
				? 'text-light-green'
				: 'text-light-red'}"
		>
			{#if positive}
				<ProfitUpIcon />
			{:else}
				<ProfitDownIcon />
			{/if}
			+15%
		</p>
		<p class="token-card-text-xs {positive ? 'text-light-green' : 'text-light-red'}">
			{currencySymbol}{getTokenValue(contractAddress)}
			{currencyUnit}
		</p>
		<p class="token-card-text-xs text-light-gray">(24h)</p>
	</div>
</div>

<style lang="postcss" global>
	.token-card {
		@apply flex flex-row;
		@apply px-3 py-2;
		@apply rounded-2xl border border-light-transparentGrey10 cursor-pointer select-none;
		@apply lg:p-5 lg:rounded-[1.375rem];
		@apply dark:bg-dark-blue;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.token-card.selected {
		@apply border border-light-purple;
		box-shadow: 0 4px 12px rgba(114, 93, 255, 0.3);
	}

	.token-card-left-col {
		@apply flex flex-col;
		@apply gap-0.5;
		@apply lg:gap-1;
	}

	.token-card-right-col {
		@apply ml-auto text-right;
	}

	.token-card-title {
		@apply text-xs font-bold;
		@apply text-light-grey;
		@apply mb-0.5;
		@apply lg:text-base;
		@apply dark:text-white;
	}

	.token-card-text-xs {
		@apply text-xs font-bold;
		@apply lg:text-base;
	}

	.token-card-text-sm {
		@apply text-sm font-bold;
		@apply lg:text-2xl;
	}

	.token-card-text-flex {
		@apply inline-flex flex-row items-center justify-end;
		@apply gap-1;
		@apply lg:gap-2;
	}
</style>
