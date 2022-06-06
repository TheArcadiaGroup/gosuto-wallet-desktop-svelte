<script lang="ts">
	import { user } from '$stores/user';

	export let price: number;
	export let percentageChange: number;
</script>

<div class="price-wrapper">
	<h3 class="price ">${price.toFixed(5)} ${$user?.currency.toUpperCase() || 'USD'}</h3>
	<span
		class="percentage-change {percentageChange > 0
			? 'text-light-green'
			: 'text-light-orangeShadeOne'}"
	>
		{#if percentageChange >= 0}
			+
		{/if}
		{percentageChange}%
	</span>
</div>

<style lang="postcss" global>
	:local(.price-wrapper) {
		@apply flex flex-row gap-x-2.5 2xl:gap-x-[0.625vw] items-baseline font-bold text-center leading-7 2xl:leading-[2vw];
	}
	:local(.price) {
		@apply text-sm md:text-base 2xl:text-[1.25vw] text-light-grey dark:text-white;
	}
	:local(.percentage-change) {
		@apply text-xs md:text-sm 2xl:text-[1vw];
	}
</style>
