<script>
	export let items = {};
</script>

<select>
	{#each Object.keys(items) as item}
		<option value={item}>{items[item]}</option>
	{/each}
</select>

<style lang="postcss">
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	select {
		@apply dark:bg-dark-grey;
		@apply text-light-grey dark:text-white font-display font-bold;
	}
</style>
