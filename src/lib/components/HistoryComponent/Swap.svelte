<script lang="ts">
	import Amount from './Amount.svelte';

	export let SwapData: SwapData = {
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
			amount={SwapData.fromAmount}
			price={SwapData.fromPrice}
			cryptoUnit={SwapData.fromCryptoUnit}
			currencyUnit={SwapData.fromPriceUnit}
			{smaller}
			{clicked}
		/>
	</div>
	<div class="my-auto">
		<img src="images/svg/swap.svg" alt="swapIcon" />
	</div>
	<div class="text-right">
		<Amount
			amount={SwapData.toAmount}
			price={SwapData.toPrice}
			cryptoUnit={SwapData.toCryptoUnit}
			currencyUnit={SwapData.toPriceUnit}
			{smaller}
			{clicked}
		/>
	</div>
</div>

<style lang="postcss">
	.my-auto {
		@apply w-4;
	}
</style>
