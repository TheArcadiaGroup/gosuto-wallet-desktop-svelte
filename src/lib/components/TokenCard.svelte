<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import { getTokenValue } from '$utils/token.util';

	import ProfitUpIcon from '$icons/ProfitUpIcon.svelte';
	import ProfitDownIcon from '$icons/ProfitDownIcon.svelte';
	import { selectedWallet } from '$stores/user/wallets';
	import { tokenLoaders } from '$stores/dataLoaders';
	import { user } from '$stores/user';

	/**
	 * The index of this card. Used when dispatching selectToken event to parent
	 */
	export let cardId: number;

	export let selected = false;

	export let token: IToken | null = null;
	export let tokenName = 'Casper'; // defaults
	export let tokenTicker = 'CSPR'; // defaults
	export let tokenAmountHeld = 0;
	export let contractAddress = '';
	let tokenPriceInUsd = 0;
	let percentageChange = 0;
	let positive = percentageChange > 0;

	/**
	 * Code of the real currency shown inside this component
	 */
	export let currencyUnit = $user?.currency.toUpperCase() || 'USD';

	onMount(async () => {
		// @ts-ignore
		const tokenInfo = await getTokenValue(contractAddress.trim() || tokenTicker);
		tokenPriceInUsd = tokenInfo.price[$user?.currency || 'usd'];
		percentageChange = tokenInfo.price_change;
	});

	const dispatch = createEventDispatcher();

	function select(): void {
		if (token) {
			token.tokenPriceUSD = tokenPriceInUsd;
		}
		dispatch('selectToken', token);
	}
</script>

<div on:click={select} class="token-card {selected ? 'selected' : ''}">
	<div class="token-card-left-col">
		<p class="token-card-title">{tokenName} ({tokenTicker})</p>
		<p class="token-card-text-sm {positive ? 'text-light-green' : 'text-light-red'}">
			{#if !$tokenLoaders[tokenTicker]}
				{tokenTicker.toLowerCase() === 'cspr'
					? $selectedWallet?.availableBalance ?? tokenAmountHeld
					: tokenAmountHeld}
			{:else}
				<span class="skeleton-loader" />
			{/if}
			{tokenTicker}
		</p>
		<p class="token-card-text-xs {positive ? 'text-light-green' : 'text-light-red'}">
			{#if !$tokenLoaders[tokenTicker]}
				{(
					(tokenTicker.toLowerCase() === 'cspr'
						? $selectedWallet?.availableBalance ?? tokenAmountHeld
						: tokenAmountHeld) * tokenPriceInUsd
				).toFixed(4)}
			{:else}
				<span class="skeleton-loader" />
			{/if}
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
			{percentageChange}%
		</p>
		<p class="token-card-text-xs {positive ? 'text-light-green' : 'text-light-red'}">
			{tokenPriceInUsd}
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
		@apply lg:text-base uppercase;
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
