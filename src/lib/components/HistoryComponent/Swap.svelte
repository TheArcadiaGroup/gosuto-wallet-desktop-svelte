<script lang="ts">
	import Amount from './Amount.svelte';

	export let SwapData: SwapData;
	export let background: String;
</script>

<div class="inline-flex space-x-4 ">
	<div class="text-right">
		<Amount
			type="negative"
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
		<Amount
			{background}
			amount={SwapData.toAmount}
			price={SwapData.toPrice}
			cryptoUnit={SwapData.toCryptoUnit}
			currencyUnit={SwapData.toPriceUnit}
		/>
	</div>
</div>
