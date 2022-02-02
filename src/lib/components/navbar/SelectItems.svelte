<!-- 
	@component
	
	A select component to create options with an each loop
 -->
<script>
	/** Representing the select options */
	export let items = {};
</script>

<select class={$$props.class}>
	{#each Object.keys(items) as item}
		<option class="navbar-selectOptions" value={item}>{items[item]}</option>
	{/each}
</select>

<style lang="postcss" global>
	:local(select) {
		@apply bg-white dark:bg-dark-background md:dark:bg-dark-grey;
		@apply text-light-grey dark:text-white font-display font-bold 4xl:text-4xl;
		@apply text-center;
		@apply 4xl:w-40;
		@apply border-0 ring-0;
	}

	.navbar-selectOptions {
		@apply 4xl:text-sm;
	}
</style>
