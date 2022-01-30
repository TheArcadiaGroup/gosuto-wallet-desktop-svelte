<!--
@component
The Token card / button component used to select which token to select inside wallet swap.
@author marekvospel
@see Swap
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ProfitUpIcon from '$icons/ProfitUpIcon.svelte';
	import ProfitDownIcon from '$icons/ProfitDownIcon.svelte';

	/**
	 * The index of this card. Used when dispatching selectToken event to parent
	 * @type {number}
	 * @see Swap
	 */
	export let cardId: number;

	/**
	 * Whether the selected outline is shown on this component.
	 * @type {boolean}
	 */
	export let selected = false;

	/**
	 * Whether the token is rising (true, green values will be shown), or declining (false, red values will be shown)
	 * @type {boolean}
	 */
	export let positive = true;


	/**
	 * Name of the token shown inside this component
	 * @type {string}
	 */
	export let cryptoName = 'Tether';
	/**
	 * Code of the token shown inside this component
	 * @type {string}
	 */
	export let cryptoUnit = 'USDT';
	/**
	 * Amount of the token shown inside this component
	 * @type {number}
	 */
	export let cryptoAmount = 2000;

	/**
	 * Code of the real currency shown inside this component
	 * @type {string}
	 */
	export let currencyUnit = 'USD';
	/**
	 * Symbol of the real currency shown inside this component
	 * @type {string}
	 */
	export let currencySymbol = '$';
	/**
	 * Amount of the real currency shown inside this component
	 * @type {number}
	 */
	export let currencyAmount = 175;

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
		<p class="card-text-sm {positive ? 'text-light-green' : 'text-light-red'}">
			{cryptoAmount}
			{cryptoUnit}
		</p>
		<p class="card-text-xs {positive ? 'text-light-green' : 'text-light-red'}">
			{currencySymbol}{currencyAmount}
			{currencyUnit}
		</p>
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
