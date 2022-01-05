<script lang="ts">
	export const price: number = 26.234;
	export const percentageChange: number = 2.5;
</script>

<div class="price-wrapper">
	<h3 class="price ">${price} USD</h3>
	<span class="percentage-change {percentageChange > 0 ? 'text-[#70CF98]' : 'text-[#FFCB66]'}">
		{#if percentageChange >= 0}
			+
		{/if}
		{percentageChange}%
	</span>
</div>

<style>
	.price-wrapper {
		@apply flex flex-row gap-x-2.5 items-baseline font-bold text-center leading-7;
	}
	.price {
		@apply text-sm sm:text-base text-light-grey dark:text-white;
	}
	.percentage-change {
		@apply text-[10px] sm:text-sm;
	}
</style>
