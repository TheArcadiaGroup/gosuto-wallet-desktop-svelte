<script lang="ts">
	import NegativeAmount from './NegativeAmount.svelte';
	import PositiveAmount from './PositiveAmount.svelte';
	import Swap from './Swap.svelte';

	export let background: String;
	export let status: 'Received' | 'Sent' | 'Stake' | 'Swap' = 'Swap';
	export let amount: number;

	export let price: number;
	export let currencyUnit: string;
	export let cryptoUnit: string;
</script>

<div class="text-right">
	{#if status == 'Swap'}
		<Swap {background} />
	{:else if status == 'Sent'}
		<NegativeAmount {background} {amount} {price} {currencyUnit} {cryptoUnit} />
	{:else if status == 'Received'}
		<PositiveAmount {background} {amount} />
	{/if}
</div>
