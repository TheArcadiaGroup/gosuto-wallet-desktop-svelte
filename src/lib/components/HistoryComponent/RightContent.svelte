<script lang="ts">
	import NegativeAmount from './NegativeAmount.svelte';
	import PositiveAmount from './PositiveAmount.svelte';
	import Swap from './Swap.svelte';

	export let background: any;
	export let status: 'Received' | 'Sent' | 'Stake' | 'Swap' = 'Swap';
	export let amount: any;

	export let price: any;
	export let currencyUnit: any;
	export let cryptoUnit: any;
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
