<script>
	export let active = false;
	export let reverse = false;
</script>

<a class="nav-item" href={$$props.href || '/'} class:reverse class:active><slot /></a>

<style lang="postcss" global>
	:local(.nav-item) {
		@apply grid place-items-center;
		@apply w-12 h-12 4xl:w-24 4xl:h-24 cursor-pointer;
		@apply text-light-grey dark:text-white;
	}

	:local(.nav-item.reverse) {
		@apply text-white dark:text-dark-grey;
	}

	:local(.nav-item.active) {
		@apply bg-light-purple;

		box-shadow: 0px 4px 12px rgba(114, 93, 255, 0.5);
		border-radius: 15px;
	}
</style>
