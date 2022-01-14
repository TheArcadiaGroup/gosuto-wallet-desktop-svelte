<script lang="ts">
	export let rangeOptions: string[] = ['1 Day', '1 Week', '1 Month'];
	export let selectedRange: string = rangeOptions[0];
</script>

<div class="select-wrapper">
	<select name="range" id="range" bind:value={selectedRange}>
		{#each rangeOptions as range}
			<option value={range}>{range}</option>
		{/each}
	</select>
</div>

<style lang="postcss" global>
	:local(.select-wrapper) {
		@apply relative flex items-center  border 2xl:border-2 border-black border-opacity-10 dark:border-white dark:border-opacity-40;
		@apply md:h-9 2xl:h-[2.5vw] 2xl:px-[1vw] rounded-full;
	}
	.select-wrapper > select {
		@apply bg-transparent border-0 focus:ring-0;
		@apply w-full h-full;
		@apply text-xs 2xl:text-[1vw] text-opacity-40 text-black dark:text-white leading-6 2xl:leading-[1.5vw];
	}
</style>
