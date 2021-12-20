<script>
	export let active = false;
</script>

<div class="nav-item" class:active><slot /></div>

<style lang="postcss">
	:global(div.nav-item svg) {
		@apply h-full;
	}

	div.nav-item {
		@apply flex flex-col items-center;
		@apply w-12 h-12;
		@apply fill-grey dark:fill-white;
	}

	div.nav-item.active {
		@apply bg-light-purple;

		/* [✔️] TODO: There is a better way of achieving this. Might be an issue of specificity */
		/* Using this might cause issues when we finally try changing the dark/light toggles */
		@apply fill-white;

		box-shadow: 0px 4px 12px rgba(114, 93, 255, 0.5);
		border-radius: 15px;
	}
</style>
