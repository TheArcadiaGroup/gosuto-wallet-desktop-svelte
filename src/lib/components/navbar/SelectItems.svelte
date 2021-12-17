<script>
	export let items = {};
</script>

<select>
	{#each Object.keys(items) as item}
		<option value={item}>{items[item]}</option>
	{/each}
</select>

<style lang="postcss">
	select {
		@apply text-light-grey font-display font-bold;

		appearance: none;
		cursor: pointer;
	}
</style>
