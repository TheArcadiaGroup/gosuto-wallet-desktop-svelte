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
		dispatch('select', {
			id: cardId,
		});
	}
</script>

<div on:click={select} class="token-card {selected ? 'selected' : ''} dark:bg-dark-blue">
	<div class="gap-1">
		<p class="text-xs font-bold text-light-grey mb-0.5 md:text-base dark:text-white">
			{cryptoName} ({cryptoUnit})
		</p>
		<p class="text-sm font-bold {positive ? 'text-light-green' : 'text-light-red'} md:text-2xl">
			{cryptoAmount}
			{cryptoUnit}
		</p>
		<p class="text-xs font-bold {positive ? 'text-light-green' : 'text-light-red'} md:text-base">
			{currencySymbol}{currencyAmount}
			{currencyUnit}
		</p>
	</div>
	<div class="ml-auto text-right">
		<p
			class="flex flex-row items-center justify-end gap-1 text-sm font-bold {positive
				? 'text-light-green'
				: 'text-light-red'} md:gap-2 md:text-base"
		>
			{#if positive}
				<ProfitUpIcon />
			{:else}
				<ProfitDownIcon />
			{/if}
			+15%
		</p>
		<p class="text-xs font-bold {positive ? 'text-light-green' : 'text-light-red'} md:text-sm">
			897,000 CSPR
		</p>
		<p class="text-xs font-bold text-light-gray md:text-sm">(24h)</p>
	</div>
</div>

<style lang="postcss">
	.token-card {
		@apply px-3 py-2 flex flex-row rounded-2xl border border-[#F3F3F31A] cursor-pointer select-none
				md:p-5 md:rounded-[1.375rem];
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.token-card.selected {
		@apply border border-light-purple;
		box-shadow: 0 4px 12px rgba(114, 93, 255, 0.3);
	}
</style>
