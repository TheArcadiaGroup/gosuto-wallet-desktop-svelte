<script lang="ts">
	import ChevronDownIcon from '$icons/ChevronDownIcon.svelte';
	export let rangeOptions: string[] = ['day', 'week', 'month'];
	export let selectedRange: string = 'day';
	let dropDown: boolean = false;
</script>

<div class="dropdown-wrapper">
	<!-- <div> -->
	<button
		on:click={() => {
			dropDown = !dropDown;
		}}
		type="button"
		class="dropdown-button capitalize"
		id="dropdown-button"
		aria-expanded="true"
		aria-haspopup="true"
	>
		1 {selectedRange}
		<div class="dropdown-icon">
			<ChevronDownIcon />
		</div>
	</button>
	<div
		class:hidden={!dropDown}
		class="dropdown-menu"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="menu-button"
		tabindex="-1"
	>
		<div class="dropdown-menu-item">
			{#each rangeOptions as rangeOption}
				<button
					on:click={() => {
						selectedRange = rangeOption;
						dropDown = false;
					}}
					class="dropdown-menu-item-button capitalize"
					role="menuitem"
					tabindex="-1"
				>
					1 {rangeOption}
				</button>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss" global>
	.dropdown-wrapper {
		@apply relative inline-block text-left;
	}
	.dropdown-button {
		@apply inline-flex items-center w-full bg-transparent;
		@apply text-xs md:text-sm 2xl:text-[1vw] text-light-grey dark:text-white leading-6 font-medium;
		@apply pl-4 md:pl-[52px] 2xl:pl-[2.5vw] pr-2.5 md:pr-4 2xl:pr-[1vw] py-2.5 md:py-4 2xl:py-[1vw];
		@apply border border-black border-opacity-10 dark:border-white dark:border-opacity-30 rounded-full;
	}
	.dropdown-icon {
		@apply -mr-1 ml-2 md:ml-7 h-4 2xl:h-[1vw] w-4 2xl:w-[1vw];
	}
	.dropdown-menu {
		@apply origin-top-right absolute right-0 mt-1 w-32 2xl:w-[8vw] z-10 rounded-md shadow-lg bg-white dark:bg-dark-grey ring-1 ring-black ring-opacity-5 focus:outline-none;
	}
	.dropdown-menu-item {
		@apply py-1;
	}
	.dropdown-menu-item-button {
		@apply w-full text-xs md:text-sm 2xl:text-[1vw] text-light-grey dark:text-white leading-6 2xl:leading-[1.5vw] font-medium block px-4 py-2 hover:bg-slate-100 hover:dark:bg-gray-700;
	}
</style>
