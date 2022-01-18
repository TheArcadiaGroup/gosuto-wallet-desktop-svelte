<script lang="ts">
	export let optionsArray: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
	export let value: any = null;
</script>

<div class="select">
	<select id="standard-select" bind:value>
		{#each optionsArray as optionString, i}
			<option value={i}>{optionString}</option>
		{/each}
	</select>
</div>

<style lang="postcss">
	select {
		@apply border-0 bg-transparent p-3 m-0 w-full z-10 text-sm;
	}

	.select {
		@apply min-w-max w-[30%] md:w-[20%] cursor-pointer bg-transparent rounded-3xl;
		@apply border border-light-lighterGray;
	}
</style>
