<script lang="ts">
	import Swap from '$icons/Swap.svelte';
	import Amount from './Amount.svelte';

	export let swapData: SwapData = {
		fromAmount: 0.0,
		toAmount: 0.0,
		fromPrice: 0.0,
		toPrice: 0.0,
		fromCryptoUnit: '',
		fromPriceUnit: '',
		toCryptoUnit: '',
		toPriceUnit: '',
	};
	export let smaller: boolean = false;
	export let clicked: boolean = false;
</script>

<div class="inline-flex space-x-2 md:space-x-4 ">
	<div class="text-right">
		<Amount
			type="negative"
			amount={swapData.fromAmount}
			cryptoUnit={swapData.fromCryptoUnit}
			{smaller}
			{clicked}
		/>
	</div>
	<div class="my-auto">
		<Swap />
	</div>
	<div class="text-right">
		<Amount amount={swapData.toAmount} cryptoUnit={swapData.toCryptoUnit} {smaller} {clicked} />
	</div>
</div>

<style lang="postcss">
	.my-auto {
		@apply w-4;
	}
</style>
