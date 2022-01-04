<script lang="ts">
	export let price: number = 26.234;
	export let percentageChange: number = 2.5;
</script>

<div class="flex flex-row gap-x-2.5 items-baseline font-bold text-center leading-7">
	<h3 class="text-sm text-[#4F4F4F]">${price} USD</h3>
	<span class="text-[#70CF98] text-[10px]">
		{#if percentageChange >= 0}
			+
		{:else}
			-
		{/if}
		{percentageChange}%
	</span>
</div>
