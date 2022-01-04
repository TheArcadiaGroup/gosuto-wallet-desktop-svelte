<script lang="ts">
	export let price: number = 26.234;
	export let percentageChange: number = 2.5;
</script>

<div class="flex flex-row gap-x-2.5 items-baseline font-bold text-center  leading-7">
	<h3 class="text-sm sm:text-base text-[#4F4F4F] dark:text-white">${price} USD</h3>
	<span
		class=" text-[10px] sm:text-sm {percentageChange > 0 ? 'text-[#70CF98]' : 'text-[#FFCB66]'}"
	>
		{#if percentageChange >= 0}
			+
		{/if}
		{percentageChange}%
	</span>
</div>
