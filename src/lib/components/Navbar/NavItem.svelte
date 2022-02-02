<!-- 
	@component

	A component encasing every Navbar item to ease styling
 -->
<script lang="ts">
	/** A variable representing a NavIcon object to help with setting a Navbar icon as active */
	export let navItem: NavIcon;
	/** A variable representing a boolean value to indicate reverse colouring for dark and light themes */
	export let reverse = false;
</script>

<div class="nav-item" class:reverse class:active={navItem.active} on:click>
	<slot />
</div>

<style lang="postcss" global>
	.nav-item {
		@apply grid place-items-center;
		@apply min-w-[3.5rem] min-h-[3.5rem] w-14 h-14 4xl:w-24 4xl:h-24 cursor-pointer;
		@apply text-light-grey dark:text-white;
		@apply transition-all;
	}

	.nav-item.reverse {
		@apply text-white dark:text-dark-grey;
	}

	.nav-item.active {
		@apply bg-light-purple;
		@apply text-white;
		@apply rounded-2xl shadow-[0_4px_12px_rgba(114,93,255,0.5)];
	}

	.nav-item.active.reverse {
		@apply bg-light-purple;
		@apply text-dark-grey;
		@apply rounded-2xl shadow-[0_4px_12px_rgba(114,93,255,0.5)];
	}
</style>
