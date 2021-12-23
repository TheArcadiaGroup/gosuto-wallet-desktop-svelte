<script lang="ts">
	import NegativeAmount from './NegativeAmount.svelte';
	import PositiveAmount from './PositiveAmount.svelte';

	export let SwapData = {
		fromAmount: 0.0,
		toAmount: 0.0,
		fromPrice: 0.0,
		toPrice: 0.0,
		fromCryptoUnit: '',
		fromPriceUnit: '',
		toCryptoUnit: '',
		toPriceUnit: '',
	};
	export let background: String;
</script>

<div class="inline-flex space-x-4 ">
	<div class="text-right">
		<NegativeAmount
			{background}
			amount={SwapData.fromAmount}
			price={SwapData.fromPrice}
			cryptoUnit={SwapData.fromCryptoUnit}
			currencyUnit={SwapData.fromPriceUnit}
		/>
	</div>
	<div class="my-auto">
		{#if background == 'white'}
			<img src="images/svg/swap.svg" alt="swapIcon" />
		{:else}
			<img src="images/svg/swapWhite.svg" alt="swapWhiteIcon" />
		{/if}
	</div>
	<div class="text-right">
		<PositiveAmount
			{background}
			amount={SwapData.toAmount}
			price={SwapData.toPrice}
			cryptoUnit={SwapData.toCryptoUnit}
			currencyUnit={SwapData.toPriceUnit}
		/>
	</div>
</div>
