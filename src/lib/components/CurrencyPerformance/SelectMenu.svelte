<script lang="ts">
	import ChevronDownIcon from '$icons/ChevronDownIcon.svelte';

	export let rangeOptions: string[] = ['1 Day', '1 Week', '1 Month'];
	export let selectedRange: string = rangeOptions[0];
	let dropDown: boolean = false;
</script>

<div class="dropdown-wrapper">
	<div>
		<button
			on:click={() => {
				dropDown = !dropDown;
			}}
			type="button"
			class="dropdown-button"
			id="dropdown-button"
			aria-expanded="true"
			aria-haspopup="true"
		>
			{selectedRange}
			<div class="dropdown-icon">
				<ChevronDownIcon />
			</div>
		</button>
	</div>

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
					class="dropdown-menu-item-button"
					role="menuitem"
					tabindex="-1"
				>
					{rangeOption}
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.dropdown-wrapper {
		@apply relative inline-block text-left;
	}
	.dropdown-button {
		@apply inline-flex items-center justify-center w-full text-[10px] sm:text-[13px] text-light-grey dark:text-white leading-6 font-medium border border-black border-opacity-10 dark:border-white dark:border-opacity-30 rounded-3xl pl-4 sm:pl-[52px] pr-[9px] sm:pr-4 py-[9px] bg-transparent;
	}
	.dropdown-icon {
		@apply -mr-1 ml-2 sm:ml-7 h-4 w-4;
	}
	.dropdown-menu {
		@apply origin-top-right absolute right-0 mt-1 w-32 z-10 rounded-md shadow-lg bg-white dark:bg-dark-grey ring-1 ring-black ring-opacity-5 focus:outline-none;
	}
	.dropdown-menu-item {
		@apply py-1;
	}
	.dropdown-menu-item-button {
		@apply w-full text-[10px] text-light-grey dark:text-white leading-6 font-medium block px-4 py-2 text-sm hover:bg-slate-100 hover:dark:bg-gray-700;
	}
</style>
