<script>
	export let items = {};
</script>

<select>
	{#each Object.keys(items) as item}
		<option value={item}>{items[item]}</option>
	{/each}
</select>

<style lang="postcss" global>
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	:local(select) {
		@apply dark:bg-dark-gosutoDark;
		@apply text-light-grey dark:text-white font-display font-bold;
		@apply border-0;
	}
</style>
