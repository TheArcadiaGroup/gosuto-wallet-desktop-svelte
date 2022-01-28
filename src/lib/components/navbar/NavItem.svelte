<script lang="ts">
	export let navItem: NavIcon;
	export let reverse = false;
</script>

<div class="nav-item" class:reverse class:active={navItem.active} on:click>
	<slot />
</div>

<style lang="postcss" global>
	:local(.nav-item) {
		@apply grid place-items-center;
		@apply min-w-[3.5rem] min-h-[3.5rem] w-14 h-14 4xl:w-24 4xl:h-24 cursor-pointer;
		@apply text-light-grey dark:text-white;
		@apply transition-all;
	}

	:local(.nav-item.reverse) {
		@apply text-white dark:text-dark-grey;
	}

	:local(.nav-item.active) {
		@apply bg-light-purple;
		@apply text-white;
		@apply rounded-2xl shadow-[0_4px_12px_rgba(114,93,255,0.5)];
	}

	:local(.nav-item.active.reverse) {
		@apply bg-light-purple;
		@apply text-dark-grey;
		@apply rounded-2xl shadow-[0_4px_12px_rgba(114,93,255,0.5)];
	}
</style>
